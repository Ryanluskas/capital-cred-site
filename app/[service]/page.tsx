import { Landmark, MapPin, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationCallout, InteriorPage } from "@/components/interior-page";
import styles from "@/components/interior-page.module.css";
import { creditServices, pageMetadata } from "@/lib/site";

type ServiceSlug = (typeof creditServices)[number]["slug"];
type ServiceContent = {
  icon: typeof Landmark;
  intro: string;
  sections: { title: string; text: string }[];
  source: { label: string; url: string };
  simulationHref?: string;
};

const serviceContents: Record<ServiceSlug, ServiceContent> = {
  "credito-consignado-goiania": {
    icon: MapPin,
    intro: "Conheça o empréstimo consignado e converse com uma equipe de Goiânia sobre as opções para o seu perfil.",
    sections: [
      {
        title: "Como funciona o empréstimo consignado",
        text: "As parcelas são descontadas diretamente da folha de pagamento ou de um benefício elegível, conforme a autorização e as condições previstas no contrato.",
      },
      {
        title: "Quem pode consultar as opções",
        text: "A CapitalCred atende servidores públicos, aposentados e pensionistas do INSS. O perfil, a margem consignável e as regras do órgão pagador ou benefício ajudam a definir quais opções podem ser analisadas.",
      },
      {
        title: "O que comparar em uma proposta",
        text: "Confira o prazo, o valor da parcela, o total a pagar e o Custo Efetivo Total (CET). O CET reúne juros, tarifas, tributos e outros encargos da operação.",
      },
    ],
    source: {
      label: "Orientações do Banco Central sobre crédito consignado",
      url: "https://www.bcb.gov.br/meubc/faqs/s/emprestimos-consignados",
    },
  },
  "credito-servidor-publico": {
    icon: Landmark,
    intro: "Entenda como seu vínculo e as regras do órgão pagador podem influenciar uma solicitação de consignado.",
    sections: [
      {
        title: "O que verificar no seu vínculo",
        text: "As regras variam conforme o órgão pagador e o vínculo funcional. No atendimento, informe o seu órgão para que a equipe possa orientar quais convênios e critérios se aplicam.",
      },
      {
        title: "Como a margem entra na análise",
        text: "A margem consignável é a parcela da remuneração que pode ser comprometida com descontos autorizados. Contratos em andamento podem reduzir o saldo disponível para uma nova operação.",
      },
      {
        title: "O que ter à mão para a conversa",
        text: "Separe o nome do órgão pagador e, se tiver acesso, consulte a margem no canal oficial do seu órgão. Caso documentos sejam necessários depois, confirme o canal de envio com a equipe.",
      },
    ],
    source: {
      label: "Banco Central · Crédito com desconto em folha",
      url: "https://www.bcb.gov.br/meubc/faqs/p/operacao-de-credito-com-desconto-em-folha",
    },
    simulationHref: "/?perfil=servidor#simulacao",
  },
  "credito-aposentados-pensionistas": {
    icon: UsersRound,
    intro: "Receba orientação sobre crédito consignado para aposentados e pensionistas com benefício elegível do INSS.",
    sections: [
      {
        title: "Desconto diretamente no benefício",
        text: "As parcelas do consignado do INSS são descontadas do benefício. A contratação depende da autorização do titular e das regras aplicáveis ao benefício e à operação.",
      },
      {
        title: "Verifique sua situação no Meu INSS",
        text: "Antes de contratar, consulte os extratos, os descontos em andamento e a situação de bloqueio para empréstimo no Meu INSS. Essa consulta ajuda a entender as informações usadas na análise.",
      },
      {
        title: "Proteja seus dados durante o atendimento",
        text: "Mantenha suas senhas, códigos de verificação e dados de acesso em sigilo. Use os canais oficiais do INSS para consultar seu benefício e autorizar procedimentos quando aplicável.",
      },
    ],
    source: {
      label: "INSS · Direitos e cuidados na contratação do consignado",
      url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/pagamento-de-beneficios/consignacao-em-beneficios-do-inss-seus-direitos-e-medidas-de-seguranca",
    },
    simulationHref: "/?perfil=inss#simulacao",
  },
};

type PageProps = { params: Promise<{ service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return creditServices.map(({ slug }) => ({ service: slug }));
}

async function getService(params: PageProps["params"]) {
  const { service } = await params;
  return creditServices.find(({ slug }) => slug === service);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getService(params);
  if (!service) notFound();

  return pageMetadata({ title: service.title, description: service.description, path: `/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps) {
  const service = await getService(params);
  if (!service) notFound();

  const content = serviceContents[service.slug];
  const relatedServices = creditServices.filter(({ slug }) => slug !== service.slug);

  return (
    <InteriorPage title={service.title} intro={content.intro} category="Soluções financeiras" path={`/${service.slug}`}>
      <div className={styles.prose}>
        {content.sections.map(({ title, text }) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <section>
          <h2>Da simulação à proposta</h2>
          <p>O formulário inicia o atendimento. Análise, aprovação, taxas, prazo e liberação dependem dos critérios aplicáveis. Caso receba uma proposta, revise os dados e os custos antes de decidir.</p>
          <p className={styles.meta}><a href={content.source.url}>{content.source.label}</a></p>
        </section>
      </div>
      <ConsultationCallout href={content.simulationHref} />
      <section className={styles.related}>
        <h2>Conheça outras opções de consignado</h2>
        <div>
          {relatedServices.map(({ slug, title, description }) => {
            const Icon = serviceContents[slug].icon;

            return (
              <article key={slug} className={styles.infoCard}>
                <Icon size={24} aria-hidden="true" />
                <h3><Link href={`/${slug}`}>{title}</Link></h3>
                <p>{description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </InteriorPage>
  );
}
