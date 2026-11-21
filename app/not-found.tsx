import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import styles from "@/components/interior-page.module.css";

export default function NotFound() {
  return (
    <InteriorPage title="Página não encontrada" intro="Use os links abaixo para voltar ao início ou conversar com a CapitalCred.">
      <div className={styles.actions}>
        <Link href="/" className={styles.primary}>Voltar ao início</Link>
        <Link href="/contato" className={styles.secondary}>Ver canais de atendimento</Link>
      </div>
    </InteriorPage>
  );
}
