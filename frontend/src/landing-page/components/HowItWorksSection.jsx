import { howItWorksSteps } from "../data/landingPageData";
import { Icon } from "./Icons";

export function HowItWorksSection() {
  return (
    <section className="section-block">
      <p className="section-kicker section-kicker--center">How It Works</p>
      <h2 className="section-title section-title--center">Gifting, Written in the Stars</h2>

      <div className="steps-grid">
        {howItWorksSteps.map((step, index) => (
          <article key={step.title} className="step-card">
            <div className="step-card__badge">
              <Icon name={step.icon} className="step-card__svg" />
            </div>
            <h3>
              {index + 1}. {step.title}
            </h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
