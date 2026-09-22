import { SectionHeading } from "./SectionHeading";

export function MomentSection({ moments, onBrowse }) {
  return (
    <section>
      <SectionHeading
        eyebrow="Why This Works"
        title="A Better Structure For Going Live"
        copy="The launch should feel focused, not overloaded. These are the decisions that make the store easier for both you and the customer."
      />

      <div className="row g-4 mb-5">
        {moments.map((moment) => (
          <div className="col-md-4" key={moment.id}>
            <div className="cosmic-card h-100 p-4">
              <h3 className="serif h4">{moment.title}</h3>
              <p className="text-secondary mb-4">{moment.copy}</p>
              <button className="btn btn-outline-light rounded-pill px-4" onClick={onBrowse}>
                Explore Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
