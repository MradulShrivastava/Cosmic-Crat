import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../lib/formatters";
import { clearCart } from "../Store/CartService/actions";
import {
  HiArrowLeft,
  HiCheck,
  HiCheckCircle,
  HiLockClosed,
  HiOutlineShoppingBag,
  HiShieldCheck,
  HiShoppingBag,
  HiSparkles,
  HiTruck,
} from "react-icons/hi2";

export function CheckoutView({ onBackToCart, onBackToShop }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    giftMessage: "",
  });

  const estimatedSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = estimatedSubtotal >= 999 || estimatedSubtotal === 0 ? 0 : 99;
  const grandTotal = estimatedSubtotal + deliveryFee;

  const handleChange = (field, val) => {
    setShippingDetails((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="min-h-screen bg-[#fffaf1] px-4 py-8 text-[#2b1b19] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d261d]/10 pb-5">
          <button
            type="button"
            onClick={onBackToCart}
            className="flex items-center gap-2 rounded-full border border-[#3d261d]/20 bg-white px-4 py-2 text-xs font-bold text-[#3d261d] transition hover:bg-[#3d261d]/5"
          >
            ← Back to Cart
          </button>

          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-[#b98332]/40 bg-[#21182b] font-serif text-lg text-[#f7ce75]">
              ✦
            </span>
            <span className="font-serif text-xl font-bold tracking-tight text-[#2b1b19]">
              CosmicCrate Checkout
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToShop}
            className="text-xs font-semibold text-[#9a6630] hover:underline"
          >
            Continue Shopping
          </button>
        </div>

        {/* Progress Indicator Steps */}
        <div className="mt-8 mb-10 flex items-center justify-center gap-2 sm:gap-6 text-xs font-bold">
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-800 text-xs">
              ✓
            </span>
            <span>1. Cart Items</span>
          </div>
          <span className="h-0.5 w-8 bg-[#3d261d]/20" />
          <div className="flex items-center gap-2 text-[#2b1b19]">
            <span className="grid size-6 place-items-center rounded-full bg-[#21182b] text-[#f7ce75] text-xs">
              2
            </span>
            <span>2. Shipping & Gift Details</span>
          </div>
          <span className="h-0.5 w-8 bg-[#3d261d]/20" />
          <div className="flex items-center gap-2 text-[#9c8979]">
            <span className="grid size-6 place-items-center rounded-full border border-[#3d261d]/20 bg-white text-xs">
              3
            </span>
            <span>3. Payment</span>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="mb-8 rounded-2xl border border-[#b98332]/30 bg-[#21182b] p-6 text-[#fff8ec] shadow-lg">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e6ad3f]/20 text-2xl text-[#f7ce75]">
              🚀
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#f7ce75]">
                Checkout Integration Architecture Ready
              </h3>
              <p className="mt-1 text-xs text-[#e4d8c8] leading-relaxed">
                This is a production-minded checkout preview stage. When the production API (e.g., <code>/api/v1/orders</code>) and PostgreSQL backend are connected, cart lines will be transmitted and validated for stock, active price, and discounts.
              </p>
            </div>
          </div>
        </div>

        {/* Form & Summary */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Shipping Form Placeholder */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-[#3d261d]/10 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#2b1b19]">
                Shipping & Delivery Address
              </h3>
              <p className="mt-1 text-xs text-[#715949]">
                Where should we deliver this gift hamper?
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#3d261d] mb-1">
                    Recipient / Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={shippingDetails.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="w-full rounded-xl border border-[#3d261d]/20 bg-[#fffaf1] px-4 py-2.5 text-xs text-[#2b1b19] focus:border-[#e6ad3f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d261d] mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={shippingDetails.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    className="w-full rounded-xl border border-[#3d261d]/20 bg-[#fffaf1] px-4 py-2.5 text-xs text-[#2b1b19] focus:border-[#e6ad3f] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#3d261d] mb-1">
                    Street Address & Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="House / Flat No., Street, Area"
                    value={shippingDetails.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full rounded-xl border border-[#3d261d]/20 bg-[#fffaf1] px-4 py-2.5 text-xs text-[#2b1b19] focus:border-[#e6ad3f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d261d] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={shippingDetails.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full rounded-xl border border-[#3d261d]/20 bg-[#fffaf1] px-4 py-2.5 text-xs text-[#2b1b19] focus:border-[#e6ad3f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d261d] mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 400001"
                    value={shippingDetails.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    className="w-full rounded-xl border border-[#3d261d]/20 bg-[#fffaf1] px-4 py-2.5 text-xs text-[#2b1b19] focus:border-[#e6ad3f] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#3d261d] mb-1">
                    Personal Gift Message (Printed inside box card)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a heartwarming message for the recipient..."
                    value={shippingDetails.giftMessage}
                    onChange={(e) => handleChange("giftMessage", e.target.value)}
                    className="w-full rounded-xl border border-[#3d261d]/20 bg-[#fffaf1] px-4 py-2.5 text-xs text-[#2b1b19] focus:border-[#e6ad3f] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Preview Column */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#3d261d]/15 bg-[#21182b] p-6 text-[#fff8ec] shadow-xl">
              <h3 className="font-serif text-xl font-bold text-[#f7ce75]">
                Order Items ({cartItems.length})
              </h3>

              <div className="mt-4 max-h-60 overflow-y-auto space-y-3 pr-1 border-b border-white/10 pb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#fff8ec]">{item.productName}</p>
                      <p className="text-[11px] text-[#c9b9a6]">
                        {item.variantName} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-[#f7ce75]">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-xs text-[#e4d8c8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(estimatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between border-t border-white/15 pt-3 text-sm font-bold text-[#f7ce75]">
                  <span>Total Payable</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-full bg-white/20 py-3.5 text-xs font-extrabold text-[#f7ce75] opacity-80 cursor-not-allowed text-center"
                >
                  🔒 Payment Gateway Connection Pending Backend API
                </button>
                <p className="mt-2 text-center text-[10px] text-[#c9b9a6]">
                  Real payment gateway will be enabled in Phase 2 API integration.
                </p>
              </div>

              <button
                type="button"
                onClick={onBackToShop}
                className="mt-4 w-full rounded-full border border-white/20 bg-transparent py-2.5 text-xs font-bold text-[#fff8ec] hover:bg-white/10 transition"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
