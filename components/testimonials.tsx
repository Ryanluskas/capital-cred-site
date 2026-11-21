export type ApprovedTestimonial = {
  quote: string;
  displayName: string;
  sourceUrl?: string;
};

export function Testimonials({ entries }: { entries: readonly ApprovedTestimonial[] }) {
  if (entries.length === 0) return null;

  return (
    <section className="section testimonials" aria-labelledby="depoimentos-titulo">
      <div className="shell">
        <h2 id="depoimentos-titulo">Relatos de clientes</h2>
        <div className="solution-grid">
          {entries.map(({ quote, displayName, sourceUrl }) => (
            <figure className="solution-card" key={`${displayName}:${quote}`}>
              <blockquote>{quote}</blockquote>
              <figcaption>
                {displayName}
                {sourceUrl && <> · <a className="text-link" href={sourceUrl}>Ver relato original</a></>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
