import { trustStats } from "../data/landingPageData";
import { Icon } from "./Icons";

export function TrustBar() {
  return (
    <section className="trust-bar">
      {trustStats.map((item) => (
        <article key={item.label} className="trust-bar__item">
          <Icon name={item.icon} className="trust-bar__icon" />
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </article>
      ))}
    </section>
  );
}
