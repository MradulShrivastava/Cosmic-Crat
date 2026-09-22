import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "../lib/formatters";

export function ProductDetail({ product, selectedVariant, onVariantChange, onBack, onOrder }) {
  const [activeImageId, setActiveImageId] = useState(product.images[0]?.id ?? null);
  const activeVariant = useMemo(
    () => product.variants.find((variant) => variant.name === selectedVariant) ?? product.variants[0],
    [product, selectedVariant]
  );
  const activeImage = product.images.find((image) => image.id === activeImageId) ?? product.images[0];
  const canOrder = product.stockStatus !== "Out of Stock";

  useEffect(() => {
    setActiveImageId(product.images[0]?.id ?? null);
  }, [product]);

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
            Back To Shop
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

          <div className="cosmic-subcard p-3 mb-4">
            <label className="form-label text-secondary">Choose Version</label>
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

          <div className="price-banner mb-4">
            <span>Selected price</span>
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

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button className="btn cosmic-gold-btn rounded-pill px-4" onClick={() => onOrder(product, activeVariant.name)} disabled={!canOrder}>
              {canOrder ? "Reserve This Box" : "Out Of Stock"}
            </button>
            <button className="btn btn-outline-light rounded-pill px-4">Talk To Support</button>
          </div>
        </div>
      </div>
    </section>
  );
}
