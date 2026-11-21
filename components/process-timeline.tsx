import { ClipboardList, MessageSquareText, FileCheck2 } from "lucide-react";
import { TimelineProgress } from "@/components/timeline-progress";

const steps = [
  {
    title: "Solicite sua simulação",
    description: "Informe seu perfil e o melhor número para a nossa equipe entrar em contato.",
    Icon: ClipboardList,
  },
  {
    title: "Converse com um especialista",
    description: "Tire suas dúvidas e entenda as condições disponíveis para o seu perfil.",
    Icon: MessageSquareText,
  },
  {
    title: "Analise a proposta",
    description: "Confira custos, parcelas e prazos. Se aprovada, decida se quer concluir a contratação.",
    Icon: FileCheck2,
  },
];

export function ProcessTimeline() {
  return (
    <div className="timeline">
      <TimelineProgress />
      <ol className="timeline-list">
        {steps.map(({ title, description, Icon }, index) => (
          <li key={title} className="timeline-step">
            <div className="timeline-point"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></div>
            <p className="step-label">Etapa {String(index + 1).padStart(2, "0")}</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
