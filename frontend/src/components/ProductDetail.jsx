import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { formatPrice } from "../lib/formatters";
import { addToCart } from "../Store/CartService/actions";
import { HiMinus, HiPlus, HiSparkles } from "react-icons/hi2";

export function ProductDetail({ product, selectedVariant, onVariantChange, onBack, onOrder, onOpenCart }) {
  const dispatch = useDispatch();
  const [activeImageId, setActiveImageId] = useState(product.images[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");

  const activeVariant = useMemo(
    () => product.variants.find((variant) => variant.name === selectedVariant) ?? product.variants[0],
    [product, selectedVariant]
  );
  const activeImage = product.images.find((image) => image.id === activeImageId) ?? product.images[0];
  const canOrder = product.stockStatus !== "Out of Stock";

  useEffect(() => {
    setActiveImageId(product.images[0]?.id ?? null);
    setQuantity(1);
    setPersonalization("");
  }, [product]);

  const handleAddToCart = () => {
    if (!canOrder) return;
    dispatch(
      addToCart({
        productId: product.id,
        variantId: activeVariant.name,
        productName: product.name,
        variantName: activeVariant.name,
        quantity: quantity,
        unitPrice: activeVariant.price,
        image: {
          themeColor: product.themeColor,
          accentColor: product.accentColor,
          glyph: product.glyph,
        },
        personalization: personalization.trim() || null,
        collection: product.collection,
        zodiacSign: product.zodiacSign,
      })
    );
  };

  return (
    <section className="row g-4">
      <div className="col-lg-6">
        <div className="cosmic-card p-4 h-100">
          <div
            className="gallery-stage rounded-4 d-flex flex-column justify-content-end"
            style={{ background: `linear-gradient(155deg, ${activeImage.themeColor}, rgba(8, 17, 31, 0.96))` }}
          >
            <div className="gallery-stage-copy">
              <span className="product-glyph product-glyph-large">{product.glyph}</span>
              <h2 className="serif mb-2">{activeImage.title}</h2>
              <p className="text-secondary mb-0">{activeImage.caption}</p>
              <span className="gallery-highlight">{activeImage.highlight}</span>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-3 mt-3">
            {product.images.map((image) => (
              <div className="col" key={image.id}>
                <button
                  className={`gallery-thumb w-100 ${image.id === activeImage.id ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveImageId(image.id)}
                  style={{ background: `linear-gradient(145deg, ${image.themeColor}, ${image.accentColor})` }}
                >
                  <strong>{image.title}</strong>
                  <span>{image.caption}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="cosmic-card p-4 h-100">
          <button className="btn btn-outline-light rounded-pill px-4 mb-4" onClick={onBack}>
            ← Back To Shop
          </button>

          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            <p className="small text-uppercase text-secondary mb-0">{product.collection}</p>
            <span className={`chip stock-chip stock-${product.stockStatus.toLowerCase().replace(/\s+/g, "-")}`}>{product.stockStatus}</span>
          </div>

          <h1 className="serif mb-2">{product.name}</h1>
          <p className="text-secondary mb-2">Zodiac Sign: {product.zodiacSign}</p>
          <p className="text-secondary">{product.description}</p>
          <p className="mb-3">{product.audience}</p>
          <p className="text-secondary small mb-4">{product.stockNote}</p>

          <div className="product-meta-grid mb-4">
            <div className="cosmic-subcard p-3">
              <span className="small text-uppercase text-secondary d-block mb-1">Dates</span>
              <strong>{product.dates}</strong>
            </div>
            <div className="cosmic-subcard p-3">
              <span className="small text-uppercase text-secondary d-block mb-1">Price Range</span>
              <strong>
                {formatPrice(product.variants[0]?.price ?? 0)} - {formatPrice(product.variants[product.variants.length - 1]?.price ?? 0)}
              </strong>
            </div>
          </div>

          {/* Variant Selection */}
          <div className="cosmic-subcard p-3 mb-4">
            <label className="form-label text-secondary">Choose Version / Variant</label>
            <div className="row g-3">
              {product.variants.map((variant) => (
                <div className="col-sm-6" key={variant.name}>
                  <button
                    className={`variant-card w-100 text-start ${selectedVariant === variant.name ? "active" : ""}`}
                    onClick={() => onVariantChange(variant.name)}
                    type="button"
                  >
                    <strong>{variant.name}</strong>
                    <span className="text-secondary small">{variant.blurb}</span>
                    <span>{formatPrice(variant.price)}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Controls & Personalization */}
          <div className="cosmic-subcard p-3 mb-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-5">
                <label className="form-label text-secondary d-block mb-1">Quantity</label>
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-light rounded-circle p-1"
                    style={{ width: 36, height: 36 }}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <HiMinus />
                  </button>
                  <span className="fw-bold px-3 text-white fs-5">{quantity}</span>
                  <button
                    type="button"
                    className="btn btn-outline-light rounded-circle p-1"
                    style={{ width: 36, height: 36 }}
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <HiPlus />
                  </button>
                </div>
              </div>

              <div className="col-md-7">
                <label className="form-label text-secondary mb-1">
                  Personalized Message <small className="text-muted">(Optional)</small>
                </label>
                <input
                  type="text"
                  className="form-control cosmic-input"
                  placeholder="e.g. Happy Birthday Sister!"
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="price-banner mb-4">
            <span>Unit price</span>
            <strong>{formatPrice(activeVariant.price)}</strong>
          </div>

          <h3 className="serif h5">Inside The Box</h3>
          <ul className="text-secondary mt-3 detail-list">
            {activeVariant.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="d-flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {!canOrder ? <div className="alert alert-warning mt-4 mb-0">This product is currently out of stock and cannot be ordered right now.</div> : null}

          <div className="d-flex flex-wrap gap-3 mt-4">
            <button
              className="btn cosmic-gold-btn rounded-pill px-4 py-2.5 font-bold"
              onClick={handleAddToCart}
              disabled={!canOrder}
            >
              🛒 Add to Cart ({formatPrice(activeVariant.price * quantity)})
            </button>
            <button
              className="btn btn-outline-light rounded-pill px-4 py-2.5"
              onClick={() => onOrder(product, activeVariant.name)}
              disabled={!canOrder}
            >
              Direct Order / Prebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
