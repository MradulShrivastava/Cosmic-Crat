import { zodiacItems } from "../data/landingPageData";

export function ZodiacSection() {
  return (
    <section className="section-block section-block--panel">
      <p className="section-kicker section-kicker--center">Shop By Zodiac</p>
      <h2 className="section-title section-title--center">Find Your Cosmic Match</h2>

      <div className="zodiac-grid">
        {zodiacItems.map((item) => (
          <article key={item.name} className="zodiac-card">
            <div className="zodiac-card__icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.dates}</p>
          </article>
        ))}
      </div>

      <div className="section-cta">
        <button className="mahika-button mahika-button--ghost" type="button">
          View All Zodiac Gifts
        </button>
      </div>
    </section>
  );
}
