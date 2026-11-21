import Image from "next/image";
import {
  Building2, Calculator, Check, ChevronDown, Landmark, LockKeyhole, Mail,
  MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, UsersRound,
} from "lucide-react";
import { CapitalCredBrandFilm } from "@/components/capitalcred-brand-film";
import { ProcessTimeline } from "@/components/process-timeline";
import { DeferredSimulationForm } from "@/components/deferred-simulation-form";
import { Testimonials } from "@/components/testimonials";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Crédito consignado em Goiânia",
  description: "Solicite uma simulação de crédito consignado com a CapitalCred. Atendimento em Goiânia para servidores públicos, aposentados e pensionistas do INSS.",
  path: "/",
});

const solutions = [
  {
    title: "Servidores públicos",
    description: "Entenda as opções de consignado para o seu vínculo e veja quais condições podem se aplicar à sua folha de pagamento.",
    points: ["Parcelas descontadas em folha", "Orientação sobre margem e convênio"],
    href: "/credito-servidor-publico",
    Icon: Landmark,
  },
  {
    title: "Aposentados e pensionistas",
    description: "Conheça as possibilidades de crédito consignado para quem recebe aposentadoria ou pensão do INSS.",
    points: ["Parcelas descontadas do benefício", "Consulta de elegibilidade pelo seu perfil"],
    href: "/credito-aposentados-pensionistas",
    Icon: UsersRound,
  },
];

const questions = [
  {
    question: "O que é crédito consignado?",
    answer: "É uma modalidade de empréstimo em que as parcelas são descontadas diretamente da folha de pagamento ou do benefício, conforme as regras do vínculo.",
  },
  {
    question: "Quem pode solicitar?",
    answer: "Servidores públicos, aposentados e pensionistas do INSS podem pedir uma consulta. A possibilidade de contratação depende da elegibilidade do vínculo ou benefício, da margem consignável e da análise da instituição responsável.",
  },
  {
    question: "Como funciona a simulação?",
    answer: "Preencha o formulário de solicitação ou inicie uma conversa pelo WhatsApp. A equipe verifica seu perfil e explica as opções disponíveis, incluindo custos e condições quando houver proposta.",
  },
  {
    question: "Existe custo para simular?",
    answer: "A solicitação de simulação é gratuita e sem compromisso. Se houver proposta, confira os custos da contratação antes de decidir.",
  },
  {
    question: "Quais documentos podem ser necessários?",
    answer: "Na etapa de análise, podem ser solicitados um documento de identificação e comprovantes do vínculo ou benefício. A equipe informa o que se aplica ao seu caso e o canal apropriado para envio.",
  },
  {
    question: "Como funciona a análise de crédito?",
    answer: "São avaliados os critérios da modalidade e da instituição responsável, como elegibilidade do vínculo, margem disponível e documentação. Taxas, prazos e liberação dependem da análise.",
  },
  {
    question: "A CapitalCred atende clientes de outras cidades?",
    answer: "O atendimento é realizado a partir de Goiânia. Consulte a equipe pelo WhatsApp para verificar se existe uma opção para sua cidade e seu vínculo.",
  },
  {
    question: "Como entrar em contato?",
    answer: `Fale com a CapitalCred pelo WhatsApp ou telefone ${site.phoneLabel}, ou pelo e-mail ${site.email}.`,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero" id="topo">
        <div className="shell hero-grid">
          <div className="hero-content">
            <p className="hero-eyebrow"><Sparkles size={15} strokeWidth={1.75} aria-hidden="true" /> Soluções financeiras inteligentes</p>
            <h1>Seu próximo passo começa com <span>novas possibilidades.</span></h1>
            <p className="hero-description">Conheça soluções de crédito consignado com atendimento especializado, transparência e condições de acordo com o seu perfil.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#simulacao">Simular meu crédito</a>
              <a className="button button-outline" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={19} aria-hidden="true" /> Falar com um especialista
              </a>
            </div>
            <div className="hero-note"><ShieldCheck size={18} aria-hidden="true" /> Simulação gratuita e sem compromisso</div>
          </div>
          <div className="hero-art">
            <div className="hero-frame">
              <picture>
                <source srcSet="/images/capitalcred-hero-mobile.avif" media="(max-width: 620px)" type="image/avif" />
                <source srcSet="/images/capitalcred-hero.avif" type="image/avif" />
                <source srcSet="/images/capitalcred-hero-mobile.webp" media="(max-width: 620px)" type="image/webp" />
                <Image src="/images/capitalcred-hero.webp" width={1448} height={1086}
                  alt="" unoptimized loading="eager" fetchPriority="high" className="hero-image" />
              </picture>
            </div>
            <div className="hero-caption">
              <span className="hero-caption-icon"><LockKeyhole size={19} aria-hidden="true" /></span>
              <span><strong>Você decide com clareza</strong><small>Conheça as condições antes de contratar</small></span>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-band" id="vantagens">
        <ul className="shell trust-items" aria-label="Informações de atendimento">
          <li><span className="trust-icon"><MessageCircle size={22} aria-hidden="true" /></span><span><strong>Atendimento humano</strong><small>Converse com um especialista</small></span></li>
          <li><span className="trust-icon"><ShieldCheck size={22} aria-hidden="true" /></span><span><strong>Condições explicadas</strong><small>Confira custos e prazos</small></span></li>
          <li><span className="trust-icon"><MapPin size={22} aria-hidden="true" /></span><span><strong>CapitalCred Goiânia</strong><small>Atendimento por telefone e WhatsApp</small></span></li>
        </ul>
      </div>

      <section className="section solutions" id="solucoes" aria-labelledby="solucoes-titulo">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Soluções de crédito</p>
            <h2 id="solucoes-titulo">Crédito consignado para o seu perfil</h2>
            <p>Entenda como a modalidade funciona para o seu vínculo e consulte as opções disponíveis.</p>
          </div>
          <div className="solution-grid">
            {solutions.map(({ title, description, points, href, Icon }) => (
              <article className="solution-card" key={href}>
                <div className="solution-icon"><Icon size={30} strokeWidth={1.55} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {points.map((point) => <li key={point}><Check size={17} aria-hidden="true" />{point}</li>)}
                </ul>
                <a className="button button-light" href={href} aria-label={`Consultar opções para ${title.toLowerCase()}`}>Consultar opções</a>
              </article>
            ))}
          </div>
          <a className="text-link section-link" href="/credito-consignado-goiania">Entenda o crédito consignado em Goiânia</a>
        </div>
      </section>

      <section className="section process" id="como-funciona" aria-labelledby="processo-titulo">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Como funciona</p>
            <h2 id="processo-titulo">Da simulação à proposta</h2>
            <p>Saiba o que acontece em cada etapa e decida com tempo para avaliar as condições.</p>
          </div>
          <ProcessTimeline />
          <p className="process-note"><ShieldCheck size={19} aria-hidden="true" /> A aprovação, as taxas e a liberação dependem da análise e dos critérios da instituição responsável.</p>
        </div>
      </section>

      <section className="section simulation" id="simulacao" aria-labelledby="simulacao-titulo">
        <div className="shell simulation-grid">
          <div className="simulation-copy">
            <p className="eyebrow"><Calculator size={16} aria-hidden="true" /> Solicite uma simulação</p>
            <h2 id="simulacao-titulo">Vamos conversar sobre seu crédito?</h2>
            <p>Conte um pouco sobre o seu perfil. Um especialista pode explicar como funciona o consignado e quais condições se aplicam ao seu caso.</p>
            <ul className="simulation-points">
              <li><Check size={17} aria-hidden="true" /> Gratuita e sem compromisso</li>
              <li><Check size={17} aria-hidden="true" /> Retorno pelo WhatsApp informado</li>
              <li><Check size={17} aria-hidden="true" /> Sem CPF ou documentos nesta etapa</li>
            </ul>
            <a className="simulation-whatsapp" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" /> Prefiro falar pelo WhatsApp</a>
          </div>
          <DeferredSimulationForm whatsappUrl={site.whatsapp} requiresAmount={Boolean(process.env.LEADS_LEGACY_URL?.trim())} />
        </div>
      </section>

      <section className="section about" id="sobre" aria-labelledby="sobre-titulo">
        <div className="shell about-grid">
          <CapitalCredBrandFilm />
          <div>
            <p className="eyebrow"><Building2 size={17} aria-hidden="true" /> Sobre nós</p>
            <h2 id="sobre-titulo">Conheça a CapitalCred</h2>
            <p>Somos uma empresa de soluções de crédito de Goiânia. Ajudamos você a entender o consignado, esclarecer dúvidas sobre a modalidade e avaliar as condições de uma eventual proposta.</p>
            <p>Você pode nos procurar para entender o desconto das parcelas, conversar sobre margem consignável e conferir os custos antes de decidir.</p>
            <a className="button button-light" href="/sobre">Mais sobre a CapitalCred</a>
          </div>
        </div>
      </section>

      <Testimonials entries={[]} />

      <section className="section faq" id="duvidas" aria-labelledby="duvidas-titulo">
        <div className="shell faq-grid">
          <div className="section-heading">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 id="duvidas-titulo">O que você precisa saber</h2>
            <p>Entenda o consignado e saiba o que esperar ao solicitar uma simulação.</p>
          </div>
          <div className="faq-list">
            {questions.map(({ question, answer }) => (
              <details className="faq-item" name="duvidas-capitalcred" key={question}>
                <summary>{question}<ChevronDown size={20} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" id="contato" aria-labelledby="contato-titulo">
        <div className="shell contact-panel">
          <div>
            <p className="eyebrow">Contato</p>
            <h2 id="contato-titulo">Fale com a CapitalCred</h2>
            <p>Converse com a equipe sobre o seu perfil e tire suas dúvidas.</p>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /> Falar pelo WhatsApp</a>
            <a className="text-link" href="/contato">Ver canais de atendimento</a>
          </div>
          <div className="contact-details">
            <a href={site.phoneHref}><Phone size={17} aria-hidden="true" /> {site.phoneLabel}</a>
            <a href={`mailto:${site.email}`}><Mail size={17} aria-hidden="true" /> {site.email}</a>
            <span><MapPin size={17} aria-hidden="true" /> {site.city}</span>
          </div>
        </div>
      </section>
    </>
  );
}
