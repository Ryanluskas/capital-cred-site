import { Mail, MapPin, Phone } from "lucide-react";
import { SiteNavigation } from "@/components/site-navigation";
import { site } from "@/lib/site";

export const navigation = [
  { label: "Início", href: "/#topo" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Sobre nós", href: "/#sobre" },
  { label: "Dúvidas frequentes", href: "/#duvidas" },
  { label: "Contato", href: "/#contato" },
];

export function Brand() {
  return (
    <a className="brand" href="/#topo" aria-label="CapitalCred — início">
      <span className="brand-mark" aria-hidden="true"><i /><i /></span>
      <span>Capital<span className="brand-accent">Cred</span></span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <SiteNavigation items={navigation}>
      <Brand />
    </SiteNavigation>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>Crédito consignado com atendimento especializado em Goiânia.</p>
          </div>
          <nav aria-label="Links institucionais">
            <h2>CapitalCred</h2>
            <a href="/sobre">Sobre nós</a>
            <a href="/credito-consignado-goiania">Crédito consignado</a>
            <a href="/#duvidas">Dúvidas frequentes</a>
          </nav>
          <div>
            <h2>Atendimento</h2>
            <a href={site.phoneHref}><Phone size={16} aria-hidden="true" />{site.phoneLabel}</a>
            <a href={`mailto:${site.email}`}><Mail size={16} aria-hidden="true" />{site.email}</a>
            <span><MapPin size={16} aria-hidden="true" />{site.city}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CapitalCred · CNPJ {site.cnpj}</span>
          <a href="/politica-de-privacidade">Política de privacidade</a>
        </div>
      </div>
    </footer>
  );
}
