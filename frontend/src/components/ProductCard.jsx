import { useDispatch } from "react-redux";
import { formatPrice } from "../lib/formatters";
import { addToCart } from "../Store/CartService/actions";

export function ProductCard({ product, onView, onOrder }) {
  const dispatch = useDispatch();
  const startingPrice = product.variants[0]?.price ?? 0;
  const premiumPrice = product.variants[product.variants.length - 1]?.price ?? startingPrice;
  const canOrder = product.stockStatus !== "Out of Stock";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!canOrder) return;
    const defaultVariant = product.variants[0];
    dispatch(
      addToCart({
        productId: product.id,
        variantId: defaultVariant.name,
        productName: product.name,
        variantName: defaultVariant.name,
        quantity: 1,
        unitPrice: defaultVariant.price,
        image: {
          themeColor: product.themeColor,
          accentColor: product.accentColor,
          glyph: product.glyph,
        },
        collection: product.collection,
        zodiacSign: product.zodiacSign,
      })
    );
  };

  return (
    <div className="col">
      <article className="card cosmic-card h-100 border-0 product-card shadow-sm hover:shadow-md transition">
        <div
          className="product-visual rounded-4 d-flex flex-column justify-content-center cursor-pointer"
          onClick={() => onView(product)}
          style={{ background: `linear-gradient(145deg, ${product.themeColor}, ${product.accentColor})` }}
        >
          <span className="product-glyph">{product.glyph}</span>
          <span className="product-visual-title">{product.shortName}</span>
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between gap-3 align-items-start">
            <div>
              <p className="small text-uppercase text-secondary mb-1">{product.collection}</p>
              <h3 className="serif h5 mb-2 cursor-pointer" onClick={() => onView(product)}>
                {product.name}
              </h3>
              <p className="text-secondary small mb-0">{product.summary}</p>
            </div>
            <div className="price-tag">
              {formatPrice(startingPrice)} - {formatPrice(premiumPrice)}
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
            {product.launchBadge ? <span className="chip chip-highlight">{product.launchBadge}</span> : null}
            <span className={`chip stock-chip stock-${product.stockStatus.toLowerCase().replace(/\s+/g, "-")}`}>{product.stockStatus}</span>
          </div>

          <div className="mt-auto pt-4 d-flex gap-2">
            <button className="btn btn-outline-light rounded-pill px-3" onClick={() => onView(product)}>
              View Details
            </button>
            <button
              className="btn cosmic-gold-btn rounded-pill px-3"
              onClick={handleAddToCart}
              disabled={!canOrder}
            >
              {canOrder ? "+ Add to Cart" : "Out Of Stock"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
