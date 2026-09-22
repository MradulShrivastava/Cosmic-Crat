export function HeroSection({ onPrimaryAction, onSecondaryAction }) {
  const metrics = [
    ["₹399", "Starting at"],
    ["₹499", "Premium box"],
    ["Rakhi", "Special gift"],
  ];

  return (
    <section className="row align-items-center hero-section gy-5 mb-5">
      <div className="col-lg-7">
        <span className="eyebrow">Rakhi Special</span>
        <h1 className="display-2 serif mt-4 mb-3 hero-title">A thoughtful Rakhi gift with a cosmic touch.</h1>
        <p className="lead text-secondary hero-copy">Celebrate your bond with a beautifully packed Rakhi box made for sweet surprises and heartfelt moments.</p>
        <div className="d-flex flex-wrap gap-3 mt-4">
          <button className="btn cosmic-gold-btn rounded-pill px-4 py-3" onClick={onPrimaryAction}>Shop Rakhi Box</button>
          <button className="btn btn-outline-light rounded-pill px-4 py-3" onClick={onSecondaryAction}>
            Explore Zodiac Gifts
          </button>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-3 mt-4">
          {metrics.map(([value, label]) => (
            <div className="col" key={label}>
              <div className="metric-card h-100">
                <div className="metric-value">{value}</div>
                <div className="small text-secondary">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-5">
        <div className="hero-box cosmic-card p-4">
          <span className="eyebrow">Made for gifting</span>
          <h2 className="serif mt-3">The perfect Rakhi surprise</h2>
          <p className="text-secondary mb-3 mt-3">Designed to feel warm, premium, and memorable from the moment the box is opened.</p>
          <p className="mb-0 rakhi-note">A bond beyond time, wrapped in stars.</p>
        </div>
      </div>
    </section>
  );
}
