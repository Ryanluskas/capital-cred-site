import { formatBrazilianPhone, leadProfiles, type LeadPayload } from "@/lib/lead-schema";
import { site } from "@/lib/site";

const loopbackNames = new Set(["localhost", "127.0.0.1", "[::1]"]);
const loopbackHost = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i;

type LeadDestination =
  | { mode: "legacy"; url: URL }
  | { mode: "webhook"; url: URL; token: string };

export function leadDestination(request: Request): LeadDestination | null {
  const legacy = process.env.LEADS_LEGACY_URL?.trim();
  const webhook = process.env.LEADS_WEBHOOK_URL?.trim();
  const token = process.env.LEADS_WEBHOOK_TOKEN?.trim();
  const endpoint = legacy || webhook;

  if (!endpoint || (legacy && webhook)) return null;

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return null;
  }

  const loopback = loopbackNames.has(url.hostname);
  const requestUrl = new URL(request.url);
  const incomingHost = request.headers.get("host") ?? requestUrl.host;
  const localFixture = loopback && process.env.LEADS_ALLOW_LOOPBACK === "true" &&
    loopbackNames.has(requestUrl.hostname) && loopbackHost.test(incomingHost);

  if (url.username || url.password || url.hash || (loopback && !localFixture)) return null;
  if (url.protocol !== "https:" && !(url.protocol === "http:" && localFixture)) return null;

  if (legacy) return { mode: "legacy", url };
  return token ? { mode: "webhook", url, token } : null;
}

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export async function sendLead(destination: LeadDestination, lead: LeadPayload, id: string) {
  const timestamp = new Date().toISOString();
  const headers = new Headers({ Accept: "application/json", "Idempotency-Key": id });
  let body: FormData | string;

  if (destination.mode === "legacy") {
    const form = new FormData();
    const profile = leadProfiles.find((entry) => entry.id === lead.profile);
    if (!profile || lead.amount === null) return false;

    form.set("nome", lead.name);
    form.set("telefone", formatBrazilianPhone(lead.phone));
    form.set("perfil", profile.legacy);
    form.set("valor", reais.format(lead.amount / 100).replace(/\s+/g, " "));
    form.set("website", "");
    form.set("consentimento_contato", "1");
    form.set("consentimento_versao", site.privacyVersion);
    form.set("consentimento_em", timestamp);
    body = form;
  } else {
    headers.set("Authorization", `Bearer ${destination.token}`);
    headers.set("Content-Type", "application/json");
    body = JSON.stringify({
      schemaVersion: 1,
      requestId: id,
      name: lead.name,
      whatsapp: `+55${lead.phone}`,
      profile: lead.profile,
      requestedAmountCents: lead.amount,
      consent: { contact: true, policyVersion: site.privacyVersion, acceptedAt: timestamp },
    });
  }

  try {
    const response = await fetch(destination.url, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return false;
    const acknowledgement: unknown = await response.json();
    return typeof acknowledgement === "object" && acknowledgement !== null &&
      "ok" in acknowledgement && acknowledgement.ok === true;
  } catch {
    return false;
  }
}
