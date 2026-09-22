import { valueItems } from "../data/landingPageData";
import { Icon } from "./Icons";

export function ValueStrip() {
  return (
    <section className="value-strip">
      {valueItems.map((item) => (
        <article key={item.title} className="value-card">
          <div className="value-card__icon">
            <Icon name={item.icon} className="value-card__svg" />
          </div>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
