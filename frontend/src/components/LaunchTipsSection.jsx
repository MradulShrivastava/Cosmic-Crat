import { SectionHeading } from "./SectionHeading";

export function LaunchTipsSection({ tips }) {
  return (
    <section>
      <SectionHeading
        eyebrow="Launch Advice"
        title="How To Keep The First Launch Affordable"
        copy="These choices help you stay inside the 399 to 499 range while still making the product feel gift-worthy."
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
        {tips.map((tip) => (
          <div className="col" key={tip.title}>
            <article className="cosmic-card p-4 h-100">
              <h3 className="serif h5">{tip.title}</h3>
              <p className="text-secondary mb-0">{tip.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
