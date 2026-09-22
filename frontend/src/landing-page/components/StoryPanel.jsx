import { storyGallery } from "../data/landingPageData";
import mahikaReference from "../../assets/mahika-reference.png";
import { Icon } from "./Icons";

export function StoryPanel() {
  return (
    <section className="story-panel">
      <article className="story-quote">
        <div className="story-quote__mark">"</div>
        <p>The hamper was beyond beautiful. It felt so personal and connected. Truly written in the stars.</p>
        <div className="story-quote__rating">★★★★★</div>
        <span>- Neha S.</span>
      </article>

      <div className="story-gallery" aria-label="Mahika moments">
        {storyGallery.map((item) => (
          <article key={item.title} className="story-gallery__item">
            <img
              className={`story-gallery__image story-gallery__image--${item.crop}`}
              src={mahikaReference}
              alt={item.title}
            />
            <span>{item.title}</span>
          </article>
        ))}
      </div>

      <div className="story-panel__arrows" aria-hidden="true">
        <button className="story-panel__arrow" type="button">
          <Icon name="chevron-left" className="story-panel__arrow-icon" />
        </button>
        <button className="story-panel__arrow" type="button">
          <Icon name="chevron-right" className="story-panel__arrow-icon" />
        </button>
      </div>
    </section>
  );
}
