import { SectionHeading } from "./SectionHeading";

export function RakhiLaunchSection({ onShop }) {
  return (
    <section className="rakhi-launch-section">
      <SectionHeading
        eyebrow="Rakhi Special"
        title="Rakhi Cosmic Box"
        copy="A festive gift box designed for sibling love, warm wishes, and a beautiful unboxing moment."
      />

      <div className="row g-4 align-items-stretch">
        <div className="col-lg-7">
          <article className="cosmic-card rakhi-story-card p-4 p-lg-5 h-100">
            <div className="rakhi-ribbon" />
            <h3 className="serif display-6 mb-3">The perfect Rakhi gift</h3>
            <p className="text-secondary mb-4">
              A graceful festive box with rakhi warmth, sweet details, and elegant cosmic styling that feels special for your brother or sister.
            </p>
            <div className="cosmic-subcard p-4">
              <p className="rakhi-message mb-2">“A little box of love, blessings, and stars for the one who has always been part of your story.”</p>
              <p className="text-secondary mb-0">Starting at ₹399</p>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <button className="btn cosmic-gold-btn rounded-pill px-4" onClick={onShop}>
                Buy Now
              </button>
              <div className="festival-price-tag">₹399 - ₹499</div>
            </div>
          </article>
        </div>

        <div className="col-lg-5">
          <article className="cosmic-card box-design-card p-4 h-100">
            <div className="small text-uppercase text-secondary mb-2">Gift box preview</div>
            <div className="box-mockup">
              <div className="box-lid">
                <span className="box-title serif">Cosmic Rakhi Box</span>
                <span className="box-subtitle">A bond beyond time</span>
                <span className="constellation-mark">✦ · · ✦</span>
              </div>
              <div className="box-base">
                <div className="box-base-copy">
                  <strong>₹399 - ₹499</strong>
                  <span>The perfect Rakhi gift</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="serif h4">Packed with love for Rakhi</h3>
              <p className="text-secondary mb-0 mt-3">
                Elegant cosmic styling, festive warmth, and a beautifully giftable look made for memorable Rakhi moments.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
