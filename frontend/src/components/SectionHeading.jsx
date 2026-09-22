export function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading mb-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="serif display-6 mt-3 mb-3">{title}</h2>
      {copy ? <p className="text-secondary mb-0 section-copy">{copy}</p> : null}
    </div>
  );
}
