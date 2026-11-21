import { InteriorPage } from "@/components/interior-page";
import styles from "@/components/interior-page.module.css";
import { pageMetadata, site } from "@/lib/site";

const title = "Política de privacidade";
const description = "Entenda quais dados a CapitalCred usa para responder sua solicitação de simulação, como são tratados e como exercer seus direitos.";

export const metadata = pageMetadata({ title, description, path: "/politica-de-privacidade" });

export default function PrivacyPage() {
  return (
    <InteriorPage
      title={title}
      intro="Saiba como a CapitalCred usa seus dados no site e como entrar em contato sobre privacidade."
      path="/politica-de-privacidade"
    >
      <div className={styles.prose}>
        <p className={styles.meta}>Versão {site.privacyVersion}</p>
        <section>
          <h2>Quem cuida dos dados</h2>
          <p>A CapitalCred, CNPJ {site.cnpj}, é responsável pelo tratamento de dados pessoais para atender às solicitações feitas neste site. O canal para assuntos de privacidade é <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </section>
        <section>
          <h2>Dados utilizados e finalidades</h2>
          <p>Ao solicitar uma simulação, você informa nome completo, número de WhatsApp, perfil e, quando aplicável, valor desejado. Usamos essas informações, com o consentimento registrado no formulário, para encaminhar o pedido à equipe e retornar por telefone ou WhatsApp.</p>
          <p>Incluímos no encaminhamento a data do envio e a versão da política associada ao consentimento. O site faz verificações técnicas temporárias, como gerar um identificador a partir do endereço IP, para limitar mensagens automatizadas e envios repetidos.</p>
        </section>
        <section>
          <h2>Encaminhamento das informações</h2>
          <p>A solicitação é encaminhada ao sistema de atendimento da CapitalCred. Serviços técnicos de hospedagem e encaminhamento podem processar os dados necessários para executar essa solicitação.</p>
          <p>Ao abrir um link de WhatsApp, você acessa um serviço de terceiros. As informações que você decide enviar no WhatsApp também estão sujeitas aos termos e à política de privacidade do serviço.</p>
        </section>
        <section>
          <h2>Retenção e segurança</h2>
          <p>O site encaminha seus dados para o atendimento. O registro da solicitação pode ser mantido nos sistemas da CapitalCred pelo período necessário para atender ao pedido, comprovar o consentimento e cumprir obrigações legais aplicáveis.</p>
          <p>O formulário inicial pede somente os dados de contato e de perfil descritos nesta política. Mantenha documentos, senhas e códigos de verificação em sigilo e confirme o canal de atendimento antes de encaminhar documentos solicitados em uma etapa posterior.</p>
        </section>
        <section>
          <h2>Cookies e medição</h2>
          <p>Esta versão do site funciona sem ferramentas de publicidade ou analytics e sem cookies de rastreamento próprios.</p>
        </section>
        <section>
          <h2>Seus direitos</h2>
          <p>Você pode pedir confirmação do tratamento, acesso, correção, informações sobre compartilhamento e, nos casos previstos pela LGPD, bloqueio, anonimização, eliminação ou portabilidade dos dados. Você também pode revogar o consentimento e solicitar a interrupção do contato pelo e-mail <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <p className={styles.meta}><a href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares">Direitos dos titulares na ANPD</a></p>
        </section>
      </div>
    </InteriorPage>
  );
}
