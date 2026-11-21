import { Mail, MessageCircle, Phone } from "lucide-react";
import { ConsultationCallout, InteriorPage } from "@/components/interior-page";
import styles from "@/components/interior-page.module.css";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contato em Goiânia",
  description: "Fale com a CapitalCred em Goiânia por WhatsApp, telefone ou e-mail. Tire dúvidas sobre crédito consignado ou solicite uma simulação.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <InteriorPage
      title="Fale com a CapitalCred"
      intro="Converse com nossa equipe em Goiânia sobre crédito consignado, simulação e acompanhamento da sua solicitação."
      category="Contato"
      path="/contato"
    >
      <section className={styles.related}>
        <h2>Canais de atendimento</h2>
        <div>
          <article className={styles.infoCard}>
            <MessageCircle size={26} aria-hidden="true" />
            <h3>WhatsApp</h3>
            <p>Converse com um especialista sobre o seu perfil.</p>
            <a href={site.whatsapp}>Abrir WhatsApp</a>
          </article>
          <article className={styles.infoCard}>
            <Phone size={26} aria-hidden="true" />
            <h3>Telefone</h3>
            <p>Ligue para o número de atendimento da CapitalCred.</p>
            <a href={site.phoneHref}>{site.phoneLabel}</a>
          </article>
          <article className={styles.infoCard}>
            <Mail size={26} aria-hidden="true" />
            <h3>E-mail</h3>
            <p>Envie dúvidas gerais ou pedidos relacionados a dados pessoais.</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </article>
        </div>
      </section>
      <ConsultationCallout />
    </InteriorPage>
  );
}
