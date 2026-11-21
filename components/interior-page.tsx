import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./interior-page.module.css";

export function InteriorPage({
  title,
  intro,
  category,
  path,
  children,
}: {
  title: string;
  intro: string;
  category?: string;
  path?: string;
  children?: ReactNode;
}) {
  const breadcrumbs = [
    { name: "Início", path: "/" },
    { name: title, path },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };

  return (
    <div className={styles.page}>
      {path && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <section className={styles.hero}>
        <div className={styles.shell}>
          <nav aria-label="Caminho da página" className={styles.breadcrumb}>
            <ol>
              <li><Link href="/">Início</Link></li>
              <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{title}</span></li>
            </ol>
          </nav>
          {category && <p className={styles.category}>{category}</p>}
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
        </div>
      </section>
      {children && <div className={`${styles.shell} ${styles.body}`}>{children}</div>}
    </div>
  );
}

export function ConsultationCallout({ href = "/#simulacao" }: { href?: string }) {
  return (
    <section className={styles.callout}>
      <div>
        <h2>Converse com a CapitalCred</h2>
        <p>Envie seu pedido e receba orientação da nossa equipe sobre as opções para o seu perfil.</p>
      </div>
      <div className={styles.actions}>
        <Link href={href} className={styles.primary}>Solicitar simulação</Link>
        <a href={site.whatsapp} className={styles.secondary}>Falar no WhatsApp</a>
      </div>
    </section>
  );
}
