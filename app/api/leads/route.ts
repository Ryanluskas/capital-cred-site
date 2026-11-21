import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

import { leadDestination, sendLead } from "@/lib/lead-delivery";
import { leadSchema } from "@/lib/lead-schema";

export const runtime = "nodejs";

const bodyLimit = 4096;
const minute = 60_000;
const dedupWindow = 10 * minute;
const processSecret = randomBytes(32);
const uuidPattern = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

type RateBucket = { count: number; expires: number };
type LeadAttempt = { fingerprint: string; result: Promise<boolean>; expires: number };

let globalRate: RateBucket = { count: 0, expires: 0 };
const clientRates = new Map<string, RateBucket>();
const submissions = new Map<string, LeadAttempt>();
const recentPayloads = new Map<string, LeadAttempt>();

function digest(value: string) {
  return createHmac("sha256", processSecret).update(value).digest("hex");
}

function forgetExpired<T extends { expires: number }>(entries: Map<string, T>, now: number) {
  for (const [key, entry] of entries) {
    if (entry.expires <= now) entries.delete(key);
  }
}

function rateLimit(request: Request, now: number) {
  if (globalRate.expires <= now) globalRate = { count: 0, expires: now + minute };
  if (globalRate.count >= 120) return globalRate.expires - now;
  globalRate.count++;

  const ipHeader = process.env.LEADS_TRUSTED_IP_HEADER?.trim();
  const ip = ipHeader && /^[a-z0-9-]+$/i.test(ipHeader) ? request.headers.get(ipHeader)?.trim() : null;
  if (!ip || !isIP(ip)) return 0;

  forgetExpired(clientRates, now);
  const key = digest(ip);
  const client = clientRates.get(key) ?? { count: 0, expires: now + dedupWindow };
  if (client.count >= 12) return client.expires - now;

  client.count++;
  clientRates.set(key, client);
  return 0;
}

function sameOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const url = new URL(origin);
    const host = request.headers.get("host") ?? new URL(request.url).host;
    return ["https:", "http:"].includes(url.protocol) && url.host === host.toLowerCase();
  } catch {
    return false;
  }
}

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > bodyLimit) return undefined;
  const reader = request.body?.getReader();
  if (!reader) return null;

  const buffer = new Uint8Array(bodyLimit);
  let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (length + value.byteLength > bodyLimit) {
      await reader.cancel();
      return undefined;
    }
    buffer.set(value, length);
    length += value.byteLength;
  }

  const body: unknown = JSON.parse(new TextDecoder().decode(buffer.subarray(0, length)));
  return body;
}

function respond(body: object, status: number, retryAfter?: number) {
  const headers = new Headers({ "Cache-Control": "no-store" });
  if (retryAfter) headers.set("Retry-After", String(Math.ceil(retryAfter / 1000)));
  return Response.json(body, { status, headers });
}

const offline = { ok: false, error: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." };

export async function POST(request: Request) {
  if (!sameOrigin(request)) return respond({ ok: false, error: "Origem do envio não permitida." }, 403);

  const now = Date.now();
  const retryAfter = rateLimit(request, now);
  if (retryAfter) return respond({ ok: false, error: "Aguarde alguns minutos antes de tentar novamente." }, 429, retryAfter);

  const mediaType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (mediaType !== "application/json") return respond({ ok: false, error: "Formato de envio inválido." }, 415);

  const id = request.headers.get("idempotency-key")?.toLowerCase();
  if (!id || !uuidPattern.test(id)) return respond({ ok: false, error: "Identificador de envio inválido. Recarregue a página." }, 400);

  let body: unknown;
  try {
    body = await readBody(request);
  } catch {
    return respond({ ok: false, error: "Não foi possível ler os dados enviados." }, 400);
  }

  if (body === undefined) return respond({ ok: false, error: "Os dados enviados excedem o tamanho permitido." }, 413);
  if (typeof body === "object" && body !== null && "website" in body && body.website) {
    return respond({ ok: true }, 200);
  }

  const destination = leadDestination(request);
  const parsed = leadSchema(destination?.mode === "legacy").safeParse(body);
  if (!parsed.success) {
    return respond({ ok: false, error: "Confira os campos da solicitação.", fields: parsed.error.flatten().fieldErrors }, 422);
  }

  if (!destination) return respond(offline, 503);

  forgetExpired(submissions, now);
  forgetExpired(recentPayloads, now);
  const lead = parsed.data;
  const fingerprint = digest(JSON.stringify([lead.name.toLowerCase(), lead.phone, lead.profile, lead.amount]));

  const previous = submissions.get(id);
  if (previous && previous.fingerprint !== fingerprint) {
    return respond({ ok: false, error: "Este envio já foi usado. Recarregue a página para tentar novamente." }, 409);
  }

  const attempt = previous ?? recentPayloads.get(fingerprint) ?? {
    fingerprint,
    result: sendLead(destination, lead, id),
    expires: now + dedupWindow,
  };
  submissions.set(id, attempt);
  recentPayloads.set(fingerprint, attempt);

  if (await attempt.result) return respond({ ok: true }, 200);

  if (submissions.get(id) === attempt) submissions.delete(id);
  if (recentPayloads.get(fingerprint) === attempt) recentPayloads.delete(fingerprint);
  return respond(offline, 502);
}
