import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideCartToast } from "../Store/CartService/actions";
import { HiCheckCircle, HiXMark } from "react-icons/hi2";

export function CartToast({ onOpenCart }) {
  const dispatch = useDispatch();
  const { show, productName, variantName, quantity } = useSelector((state) => state.cart.toast);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      dispatch(hideCartToast());
    }, 4000);
    return () => clearTimeout(timer);
  }, [show, dispatch]);

  if (!show) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-[#e6ad3f]/40 bg-[#1c1427] p-4 text-[#fff8ec] shadow-2xl backdrop-blur transition-all duration-300 animate-slide-up"
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(230,173,63,0.2)",
      }}
    >
      <span className="text-2xl text-[#e6ad3f]">
        <HiCheckCircle />
      </span>
      <div className="flex-1 text-xs">
        <p className="font-bold text-[#f7ce75]">Added to cart!</p>
        <p className="mt-0.5 font-medium text-[#e4d8c8] line-clamp-1">
          {quantity} × {productName} {variantName ? `(${variantName})` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            dispatch(hideCartToast());
            if (onOpenCart) onOpenCart();
          }}
          className="rounded-full bg-[#e6ad3f] px-3 py-1.5 text-[11px] font-bold text-[#1c1427] transition hover:bg-[#f5c85d]"
        >
          View Cart
        </button>
        <button
          type="button"
          onClick={() => dispatch(hideCartToast())}
          className="text-lg text-[#a39485] hover:text-white"
          aria-label="Close notification"
        >
          <HiXMark />
        </button>
      </div>
    </div>
  );
}
