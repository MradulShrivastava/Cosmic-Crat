import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../lib/formatters";
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from "../Store/CartService/actions";
import {
  HiMinus,
  HiPlus,
  HiTrash,
  HiXMark,
  HiArrowRight,
  HiSparkles,
  HiTag,
  HiShieldCheck,
  HiTruck,
} from "react-icons/hi2";

export function CartView({ isOpen, onClose, onProceedToCheckout, onExploreGifts }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const discountAmount = promoApplied ? Math.min(200, Math.round(estimatedSubtotal * 0.1)) : 0;
  const deliveryEstimate = estimatedSubtotal >= 999 || estimatedSubtotal === 0 ? 0 : 99;
  const estimatedTotal = Math.max(0, estimatedSubtotal - discountAmount + deliveryEstimate);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      setPromoError("Please enter a valid code.");
      return;
    }
    if (promoCode.trim().toUpperCase() === "COSMIC10" || promoCode.trim().toUpperCase() === "RAKHI") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Code invalid or expired. Try 'COSMIC10'.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-heading"
    >
      <div
        className="relative flex h-full w-full max-w-4xl flex-col bg-[#fffaf1] text-[#2b1b19] shadow-2xl transition-transform duration-300 md:rounded-l-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3d261d]/10 bg-[#fffaf1] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-[#b98332]/40 bg-[#21182b] font-serif text-xl text-[#f7ce75]">
              ✦
            </span>
            <div>
              <h2 id="cart-heading" className="font-serif text-2xl font-bold tracking-tight text-[#2b1b19]">
                Your Shopping Cart
              </h2>
              <p className="text-xs text-[#715949]">
                {totalQuantity} {totalQuantity === 1 ? "gift item" : "gift items"} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="text-xs font-semibold text-[#8c4b27] hover:text-[#b76428] hover:underline transition"
              >
                Clear cart
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full border border-[#3d261d]/15 text-xl hover:bg-[#3d261d]/5 transition"
              aria-label="Close cart"
            >
              <HiXMark />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            /* EMPTY CART STATE */
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
              <div className="grid size-20 place-items-center rounded-full border border-[#e6ad3f]/40 bg-[#21182b] text-4xl text-[#f7ce75] shadow-lg mb-6">
                ✨
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2b1b19] sm:text-3xl">
                Your cart is waiting for something special ✨
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#715949] leading-relaxed">
                Explore our curated gifts and find something meaningful for your loved ones or personal celebrations.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onExploreGifts) onExploreGifts();
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e6ad3f] px-8 py-3.5 text-sm font-extrabold text-[#2b1b19] shadow-md transition hover:bg-[#f5c85d] hover:scale-105 active:scale-95"
              >
                Explore Gifts <HiArrowRight />
              </button>
            </div>
          ) : (
            /* CART CONTENT: LEFT ITEMS, RIGHT SUMMARY */
            <div className="grid gap-8 lg:grid-cols-12">
              {/* CART ITEMS LIST */}
              <div className="space-y-4 lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-wider text-[#9a6630]">
                  Cart Items ({cartItems.length} unique)
                </p>

                {cartItems.map((item) => {
                  const lineTotal = item.unitPrice * item.quantity;
                  const itemColor = item.image?.themeColor || "#21182b";
                  const itemAccent = item.image?.accentColor || "#e6ad3f";
                  const glyph = item.image?.glyph || "✦";

                  return (
                    <div
                      key={item.id}
                      className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#3d261d]/10 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      {/* Product Visual & Info */}
                      <div className="flex items-center gap-4">
                        <div
                          className="grid size-20 shrink-0 place-items-center rounded-xl font-serif text-2xl text-[#f7ce75] shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${itemColor}, ${itemAccent})`,
                          }}
                        >
                          {glyph}
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9a6630]">
                            {item.collection || "Cosmic Gift"}
                          </p>
                          <h4 className="font-serif text-lg font-bold leading-snug text-[#2b1b19]">
                            {item.productName}
                          </h4>
                          <p className="text-xs font-semibold text-[#664b3c] mt-0.5">
                            Variant: <span className="font-normal text-[#2b1b19]">{item.variantName}</span>
                          </p>
                          {item.personalization && (
                            <p className="mt-1 rounded-md bg-[#fffaf1] border border-[#e6ad3f]/30 px-2 py-0.5 text-[11px] text-[#784d1a]">
                              ✨ Personalization: <em>"{item.personalization}"</em>
                            </p>
                          )}
                          <p className="mt-1.5 text-xs font-extrabold text-[#9a6630]">
                            {formatPrice(item.unitPrice)} <span className="text-[10px] font-normal text-[#715949]">/ unit</span>
                          </p>
                        </div>
                      </div>

                      {/* Controls & Line Total */}
                      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#3d261d]/10">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-full border border-[#3d261d]/20 bg-[#fffaf1] p-1">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(updateCartQuantity(item.id, item.quantity - 1))
                            }
                            disabled={item.quantity <= 1}
                            className="grid size-7 place-items-center rounded-full text-xs font-bold transition hover:bg-[#3d261d]/10 disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <HiMinus />
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold text-[#2b1b19]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(updateCartQuantity(item.id, item.quantity + 1))
                            }
                            className="grid size-7 place-items-center rounded-full text-xs font-bold transition hover:bg-[#3d261d]/10"
                            aria-label="Increase quantity"
                          >
                            <HiPlus />
                          </button>
                        </div>

                        {/* Line Total & Delete */}
                        <div className="text-right">
                          <p className="font-serif text-base font-bold text-[#2b1b19]">
                            {formatPrice(lineTotal)}
                          </p>
                          <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-800 transition"
                            aria-label={`Remove ${item.productName} from cart`}
                          >
                            <HiTrash /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Additional Note */}
                <div className="rounded-xl border border-[#b98332]/20 bg-[#fff6e5] p-3 text-xs text-[#734b1a] flex items-center gap-2">
                  <HiSparkles className="text-base shrink-0 text-[#e6ad3f]" />
                  <span>
                    Each gift hamper includes signature cosmic gift box packaging and complimentary personalized card.
                  </span>
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="lg:col-span-5">
                <div className="sticky top-0 rounded-2xl border border-[#3d261d]/15 bg-[#21182b] p-6 text-[#fff8ec] shadow-xl">
                  <h3 className="font-serif text-xl font-bold text-[#f7ce75]">
                    Order Summary
                  </h3>
                  <p className="mt-1 text-[11px] text-[#c9b9a6]">
                    Estimated pricing for your order. Source of truth verified at checkout.
                  </p>

                  {/* Summary Rows */}
                  <div className="mt-5 space-y-3 text-sm border-t border-white/10 pt-4">
                    <div className="flex justify-between text-[#e4d8c8]">
                      <span>Subtotal (Estimated)</span>
                      <span className="font-bold text-[#fff8ec]">
                        {formatPrice(estimatedSubtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#e4d8c8]">
                      <span className="flex items-center gap-1.5">
                        <HiTruck className="text-[#e6ad3f]" /> Estimated Delivery
                      </span>
                      <span>
                        {deliveryEstimate === 0 ? (
                          <strong className="text-green-400">FREE</strong>
                        ) : (
                          formatPrice(deliveryEstimate)
                        )}
                      </span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-400">
                        <span className="flex items-center gap-1">
                          <HiTag /> Promo Discount
                        </span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="mt-5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. COSMIC10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#e6ad3f] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-[#f7ce75] hover:bg-white/25 transition"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="mt-1 text-[11px] text-red-400">{promoError}</p>
                    )}
                    {promoApplied && (
                      <p className="mt-1 text-[11px] text-green-400">
                        ✓ Promo COSMIC10 applied successfully!
                      </p>
                    )}
                  </form>

                  {/* Total */}
                  <div className="mt-6 flex items-baseline justify-between border-t border-white/15 pt-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#c9b9a6]">
                        Estimated Total
                      </span>
                      <p className="text-[10px] text-white/50">Taxes included</p>
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#f7ce75]">
                      {formatPrice(estimatedTotal)}
                    </span>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onProceedToCheckout) onProceedToCheckout();
                    }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#e6ad3f] py-3.5 text-sm font-extrabold text-[#2b1b19] shadow-lg transition hover:bg-[#f5c85d] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Proceed to Checkout <HiArrowRight />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#c9b9a6]">
                    <HiShieldCheck className="text-base text-green-400" />
                    <span>Safe & Secure SSL Encrypted Entry</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
