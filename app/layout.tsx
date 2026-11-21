import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { businessSchema, site, siteIndexable } from "@/lib/site";
import "./globals.css";

const geist = localFont({
  src: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "CapitalCred | Crédito consignado em Goiânia", template: "%s | CapitalCred" },
  description: "Conheça o crédito consignado da CapitalCred em Goiânia. Atendimento para servidores públicos, aposentados e pensionistas do INSS.",
  robots: { index: siteIndexable, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  applicationName: "CapitalCred",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = JSON.stringify(businessSchema).replace(/</g, "\\u003c");

  return (
    <html lang="pt-BR" className={geist.variable}>
      <body>
        <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      </body>
    </html>
  );
}
