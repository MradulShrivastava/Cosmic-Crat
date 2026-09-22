import { collectionPoints } from "../data/landingPageData";
import mahikaReference from "../../assets/mahika-reference.png";
import { Icon } from "./Icons";

export function SignatureCollectionSection() {
  return (
    <section className="signature-section">
      <div className="signature-section__visual">
        <img className="signature-section__image" src={mahikaReference} alt="Mahika hamper collection" />
      </div>

      <div className="signature-section__copy">
        <p className="section-kicker">Curated with intention</p>
        <h2 className="section-title">Hampers That Speak Your Stars</h2>
        <p className="signature-section__body">
          From self-care to celebration, our hampers are designed to align with your energy, personality and cosmic vibe.
        </p>

        <ul className="signature-list">
          {collectionPoints.map((point) => (
            <li key={point.label}>
              <Icon name={point.icon} className="signature-list__icon" />
              {point.label}
            </li>
          ))}
        </ul>

        <button className="mahika-button mahika-button--primary" type="button">
          Explore All Hampers
        </button>
      </div>
    </section>
  );
}
