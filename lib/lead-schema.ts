import { z } from "zod";

export const leadProfiles = [
  { id: "servidor", label: "Servidor público", legacy: "Servidor Público" },
  { id: "inss", label: "Aposentado ou pensionista do INSS", legacy: "Aposentado/Pensionista" },
  { id: "outro", label: "Outro perfil", legacy: "Outro" },
] as const;

export function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 12 && digits.startsWith("55") ? digits.slice(2) : digits;
}

export function formatBrazilianPhone(value: string) {
  const number = phoneDigits(value).slice(0, 11);

  if (number.length <= 2) return number.length ? `(${number}` : "";

  const national = number.slice(2);
  const prefixLength = number.length === 11 ? 5 : 4;
  const separator = national.length > prefixLength ? "-" : "";

  return `(${number.slice(0, 2)}) ${national.slice(0, prefixLength)}${separator}${national.slice(prefixLength)}`;
}

function amountInCents(input: string) {
  const cleaned = input.trim().replace(/^R\$\s*/i, "").replace(/^(\d+)\.(\d{1,2})$/, "$1,$2");
  if (!cleaned) return null;
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(cleaned)) return NaN;

  const [reais, cents = ""] = cleaned.replaceAll(".", "").split(",");
  return Number(reais) * 100 + Number(cents.padEnd(2, "0"));
}

export function leadSchema(requiresAmount: boolean) {
  return z.object({
    name: z.string()
      .trim()
      .min(3, "Informe seu nome completo.")
      .max(100, "Use até 100 caracteres para o nome.")
      .regex(/^[\p{L}\p{M}][\p{L}\p{M}'’ .-]*$/u, "Use letras no nome.")
      .refine((name) => name.split(/\s+/).length > 1, "Informe nome e sobrenome.")
      .transform((name) => name.replace(/\s+/g, " ")),
    phone: z.string()
      .trim()
      .max(32, "Informe um WhatsApp com DDD.")
      .regex(/^[+\d()\s-]*$/, "Informe um WhatsApp com DDD.")
      .transform(phoneDigits)
      .refine((number) => /^[1-9]\d(?:9\d{8}|[2-5]\d{7})$/.test(number), "Informe um WhatsApp válido com DDD."),
    profile: z.string()
      .refine((value) => leadProfiles.some((profile) => profile.id === value), "Selecione seu perfil."),
    amount: z.string()
      .max(24, "Informe um valor válido em reais.")
      .transform(amountInCents)
      .refine((amount) => amount === null || (Number.isSafeInteger(amount) && amount > 0), "Informe um valor válido em reais.")
      .refine((amount) => !requiresAmount || amount !== null, "Informe o valor desejado."),
    consent: z.boolean()
      .refine((consent) => consent, "Confirme que podemos entrar em contato sobre a sua solicitação."),
    website: z.string().max(200).optional(),
  });
}

export type LeadFormValues = z.input<ReturnType<typeof leadSchema>>;
export type LeadPayload = z.output<ReturnType<typeof leadSchema>>;
