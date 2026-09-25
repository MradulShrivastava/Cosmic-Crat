import { useSelector } from "react-redux";
import { navigationItems } from "../data/landingPageData";
import mahikaBrandHero from "../../assets/mahika-brand-hero.png";
import { Icon } from "./Icons";

export function Header({ onOpenCart }) {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="landing-header">
      <div className="landing-brand">
        <img className="landing-brand__logo" src={mahikaBrandHero} alt="CosmicCrate logo" />
        <div>
          <div className="landing-brand__name">CosmicCrate</div>
          <div className="landing-brand__tag">Gifts Crafted In Skies</div>
        </div>
      </div>

      <nav className="landing-nav" aria-label="Primary">
        {navigationItems.map((item, index) => (
          <a
            key={item.label || item}
            className={`landing-nav__item${index === 0 ? " landing-nav__item--active" : ""}`}
            href={item.href || "#top"}
          >
            {item.label || item}
          </a>
        ))}
      </nav>

      <div className="landing-actions" aria-label="Quick actions">
        <button className="landing-actions__icon" type="button" aria-label="Search">
          <Icon name="search" className="landing-actions__svg" />
        </button>
        <button className="landing-actions__icon" type="button" aria-label="Account">
          <Icon name="user" className="landing-actions__svg" />
        </button>
        <button
          className="landing-actions__icon"
          type="button"
          aria-label={`Cart with ${totalQuantity} items`}
          onClick={onOpenCart}
        >
          <Icon name="bag" className="landing-actions__svg" />
          <span className="landing-actions__badge">{totalQuantity}</span>
        </button>
      </div>
    </header>
  );
}
