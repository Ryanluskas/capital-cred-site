import type { Metadata } from "next";

const defaultSiteUrl = "https://www.capitalcredgyn.com";
const siteUrl = new URL(process.env.SITE_URL || defaultSiteUrl).origin;

export const site = {
  name: "CapitalCred",
  url: siteUrl,
  city: "Goiânia, GO",
  email: "contato@capitalcredgyn.com",
  phoneLabel: "(62) 99680-8853",
  phoneHref: "tel:+5562996808853",
  whatsapp: "https://wa.me/5562996808853?text=Ol%C3%A1%21%20Quero%20simular%20um%20empr%C3%A9stimo%20consignado.",
  cnpj: "53.093.082/0001-22",
  privacyVersion: "1.0",
} as const;

export const siteIndexable = process.env.SITE_INDEXABLE === "true";

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const canonical = absoluteUrl(path);
  const socialImage = {
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
    alt: "CapitalCred · Crédito consignado em Goiânia",
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: siteIndexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      url: canonical,
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}

export const creditServices = [
  {
    slug: "credito-consignado-goiania",
    name: "Crédito consignado",
    title: "Empréstimo consignado em Goiânia",
    description: "Entenda o empréstimo consignado em Goiânia, conheça os perfis atendidos pela CapitalCred e solicite uma simulação com atendimento especializado.",
  },
  {
    slug: "credito-servidor-publico",
    name: "Servidores públicos",
    title: "Crédito consignado para servidores públicos",
    description: "Entenda como funciona o crédito consignado para servidores públicos, o que verificar no convênio e como solicitar uma simulação em Goiânia.",
  },
  {
    slug: "credito-aposentados-pensionistas",
    name: "Aposentados e pensionistas",
    title: "Crédito consignado para aposentados e pensionistas",
    description: "Conheça as etapas do crédito consignado para aposentados e pensionistas do INSS e solicite orientação da CapitalCred em Goiânia.",
  },
] as const;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#capitalcred"),
  name: site.name,
  alternateName: "Capital Cred",
  url: site.url,
  email: site.email,
  telephone: "+55 62 99680-8853",
  taxID: site.cnpj,
  areaServed: {
    "@type": "City",
    name: "Goiânia",
    containedInPlace: { "@type": "State", name: "Goiás" },
  },
};
