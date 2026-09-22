import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../lib/formatters";
import { createOrder, resetOrderState } from "../Store/OrderService/actions";

const initialFormState = {
  fullName: "",
  mobileNumber: "",
  city: "",
  email: "",
  state: "",
  quantity: 1,
  personalizedMessage: "",
  specialInstructions: "",
};

function validateOrderForm(formState) {
  const errors = {};

  if (!formState.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!formState.mobileNumber.trim()) {
    errors.mobileNumber = "Please enter your mobile number.";
  } else if (!/^[6-9]\d{9}$/.test(formState.mobileNumber.trim())) {
    errors.mobileNumber = "Please enter a valid 10-digit mobile number.";
  }

  if (!formState.city.trim()) {
    errors.city = "Please enter your city.";
  }

  if (formState.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (Number(formState.quantity) < 1 || Number.isNaN(Number(formState.quantity))) {
    errors.quantity = "Quantity must be at least 1.";
  }

  return errors;
}

export function OrderModal({ isOpen, product, selectedVariant, onClose, onContinueShopping }) {
  const dispatch = useDispatch();
  const { loading: isSubmitting, error: submitError, order } = useSelector((state) => state.order);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const successMessage = order
    ? "Thank you! Your order has been received successfully. Our team will contact you shortly to confirm your order."
    : "";

  const activeVariant = useMemo(
    () => product?.variants.find((variant) => variant.name === selectedVariant) ?? product?.variants[0],
    [product, selectedVariant]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormState(initialFormState);
    setErrors({});
    dispatch(resetOrderState());
  }, [dispatch, isOpen, product, selectedVariant]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !product || !activeVariant) {
    return null;
  }

  const handleChange = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateOrderForm(formState);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    dispatch(createOrder({
        requestId: crypto.randomUUID(),
        customer: {
          fullName: formState.fullName.trim(),
          mobileNumber: formState.mobileNumber.trim(),
          city: formState.city.trim(),
          email: formState.email.trim() || null,
          state: formState.state.trim() || null,
        },
        product: {
          id: product.id,
          name: product.name,
          zodiacSign: product.zodiacSign,
          boxName: product.shortName,
          variantName: activeVariant.name,
          stockStatus: product.stockStatus,
        },
        order: {
          quantity: Number(formState.quantity),
          unitPrice: activeVariant.price,
          personalizedMessage: formState.personalizedMessage.trim() || null,
          specialInstructions: formState.specialInstructions.trim() || null,
        },
    }));
  };

  const totalPrice = activeVariant.price * Number(formState.quantity || 1);

  return (
    <div className="order-modal-backdrop" role="presentation" onClick={!isSubmitting ? onClose : undefined}>
      <div
        className="order-modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cosmic-card order-modal-card">
          <div className="order-modal-header">
            <div>
              <span className="eyebrow">Rakhi Order</span>
              <h2 className="serif mb-0 mt-3" id="order-modal-title">
                {successMessage ? "Order Confirmed" : "Complete Your Order"}
              </h2>
            </div>
            <button className="btn btn-outline-light rounded-pill px-3" onClick={onClose} type="button" disabled={isSubmitting}>
              Close
            </button>
          </div>

          {successMessage ? (
            <div className="order-success-panel">
              <div className="success-badge">✓</div>
              <p className="lead mb-4">{successMessage}</p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn cosmic-gold-btn rounded-pill px-4" type="button" onClick={onContinueShopping}>
                  Continue Shopping
                </button>
                <button className="btn btn-outline-light rounded-pill px-4" type="button" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form className="order-form" onSubmit={handleSubmit} noValidate>
              <div className="row g-4">
                <div className="col-lg-5">
                  <div className="cosmic-subcard p-4 h-100">
                    <div
                      className="order-product-preview rounded-4 d-flex flex-column justify-content-end"
                      style={{ background: `linear-gradient(155deg, ${product.themeColor}, ${product.accentColor})` }}
                    >
                      <span className="product-glyph">{product.glyph}</span>
                      <strong className="serif h4 mb-1">{product.name}</strong>
                      <span className="text-dark small">{product.zodiacSign}</span>
                    </div>

                    <div className="order-summary-list mt-4">
                      <OrderSummaryItem label="Product" value={product.name} />
                      <OrderSummaryItem label="Zodiac Sign" value={product.zodiacSign} />
                      <OrderSummaryItem label="Selected Box" value={product.shortName} />
                      <OrderSummaryItem label="Selected Variant" value={activeVariant.name} />
                      <OrderSummaryItem label="Stock" value={product.stockStatus} />
                      <OrderSummaryItem label="Price" value={formatPrice(activeVariant.price)} />
                    </div>

                    <div className="price-banner mt-4">
                      <span>Total price</span>
                      <strong>{formatPrice(totalPrice)}</strong>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Full Name</label>
                      <input
                        className={`form-control cosmic-input ${errors.fullName ? "is-invalid" : ""}`}
                        value={formState.fullName}
                        onChange={(event) => handleChange("fullName", event.target.value)}
                        autoComplete="name"
                      />
                      {errors.fullName ? <div className="invalid-feedback d-block">{errors.fullName}</div> : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Mobile Number</label>
                      <input
                        className={`form-control cosmic-input ${errors.mobileNumber ? "is-invalid" : ""}`}
                        value={formState.mobileNumber}
                        onChange={(event) => handleChange("mobileNumber", event.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                        inputMode="numeric"
                        autoComplete="tel"
                      />
                      {errors.mobileNumber ? <div className="invalid-feedback d-block">{errors.mobileNumber}</div> : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        className={`form-control cosmic-input ${errors.city ? "is-invalid" : ""}`}
                        value={formState.city}
                        onChange={(event) => handleChange("city", event.target.value)}
                        autoComplete="address-level2"
                      />
                      {errors.city ? <div className="invalid-feedback d-block">{errors.city}</div> : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email (Optional)</label>
                      <input
                        className={`form-control cosmic-input ${errors.email ? "is-invalid" : ""}`}
                        value={formState.email}
                        onChange={(event) => handleChange("email", event.target.value)}
                        autoComplete="email"
                      />
                      {errors.email ? <div className="invalid-feedback d-block">{errors.email}</div> : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">State (Optional)</label>
                      <input className="form-control cosmic-input" value={formState.state} onChange={(event) => handleChange("state", event.target.value)} autoComplete="address-level1" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                      <input
                        className={`form-control cosmic-input ${errors.quantity ? "is-invalid" : ""}`}
                        type="number"
                        min="1"
                        value={formState.quantity}
                        onChange={(event) => handleChange("quantity", event.target.value)}
                      />
                      {errors.quantity ? <div className="invalid-feedback d-block">{errors.quantity}</div> : null}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Personalized Message (Optional)</label>
                      <textarea
                        className="form-control cosmic-input"
                        rows="3"
                        value={formState.personalizedMessage}
                        onChange={(event) => handleChange("personalizedMessage", event.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Special Instructions (Optional)</label>
                      <textarea
                        className="form-control cosmic-input"
                        rows="3"
                        value={formState.specialInstructions}
                        onChange={(event) => handleChange("specialInstructions", event.target.value)}
                      />
                    </div>
                  </div>

                  {submitError ? <div className="alert alert-danger mt-4 mb-0">{submitError}</div> : null}

                  <div className="order-form-footer">
                    <button className="btn btn-outline-light rounded-pill px-4" type="button" onClick={onClose} disabled={isSubmitting}>
                      Cancel
                    </button>
                    <button className="btn cosmic-gold-btn rounded-pill px-4 order-submit-btn" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                          Confirming...
                        </>
                      ) : (
                        "Confirm Order"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderSummaryItem({ label, value }) {
  return (
    <div className="order-summary-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
