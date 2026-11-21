import { Handshake, ListChecks, MapPin } from "lucide-react";
import Link from "next/link";
import { ConsultationCallout, InteriorPage } from "@/components/interior-page";
import styles from "@/components/interior-page.module.css";
import { pageMetadata } from "@/lib/site";

const title = "Conheça a CapitalCred";
const description = "Saiba como a CapitalCred, em Goiânia, orienta servidores públicos, aposentados e pensionistas durante a solicitação de crédito consignado.";

export const metadata = pageMetadata({ title, description, path: "/sobre" });

export default function AboutPage() {
  return (
    <InteriorPage
      title={title}
      intro="Atendimento em Goiânia para quem quer entender as opções de crédito consignado e tomar uma decisão com clareza."
      category="Sobre nós"
      path="/sobre"
    >
      <div className={styles.prose}>
        <section>
          <h2>Orientação em cada etapa</h2>
          <p>A CapitalCred atende <Link href="/credito-servidor-publico">servidores públicos</Link> e <Link href="/credito-aposentados-pensionistas">aposentados e pensionistas do INSS</Link>. A conversa começa pelo seu perfil e pelas dúvidas sobre a modalidade.</p>
          <p>Quando houver uma proposta, você poderá consultar as condições apresentadas, fazer perguntas e decidir se quer seguir com a contratação.</p>
        </section>
      </div>
      <div className={styles.infoGrid}>
        <article className={styles.infoCard}>
          <Handshake size={24} aria-hidden="true" />
          <h2>Atendimento personalizado</h2>
          <p>Começamos pelo que você deseja entender e pelas condições aplicáveis ao seu perfil.</p>
        </article>
        <article className={styles.infoCard}>
          <ListChecks size={24} aria-hidden="true" />
          <h2>Condições claras</h2>
          <p>Saiba quais informações revisar sobre parcelas, prazo e custo total antes de decidir.</p>
        </article>
        <article className={styles.infoCard}>
          <MapPin size={24} aria-hidden="true" />
          <h2>Equipe em Goiânia</h2>
          <p>Fale com nossa equipe pelos canais de contato da CapitalCred.</p>
          <Link href="/contato">Ver canais de atendimento</Link>
        </article>
      </div>
      <ConsultationCallout />
    </InteriorPage>
  );
}
