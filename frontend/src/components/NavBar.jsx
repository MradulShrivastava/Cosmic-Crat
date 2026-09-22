const navItems = [
  ["home", "Home"],
  ["shop", "Launch Shop"],
  ["zodiac", "Zodiac"],
  ["occasions", "Occasions"],
  ["quiz", "Gift Finder"],
];

export function NavBar({ currentView, onNavigate }) {
  return (
    <nav className="navbar sticky-top cosmic-nav border-bottom border-light border-opacity-10">
      <div className="container py-3 d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <button className="brand-reset d-flex align-items-center gap-3" onClick={() => onNavigate("home")}>
          <span className="brand-mark">✦</span>
          <span className="text-start">
            <span className="d-block fw-semibold">CosmicCrate</span>
            <small>Rakhi Ready Zodiac Gifting</small>
          </span>
        </button>

        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={`btn rounded-pill px-3 ${currentView === id ? "cosmic-gold-btn" : "btn-outline-light"}`}
              onClick={() => onNavigate(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
