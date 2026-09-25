import { useDispatch } from "react-redux";
import { zodiacItems } from "../data/landingPageData";
import { addToCart } from "../../Store/CartService/actions";

export function ZodiacCollection({ onSelectZodiac }) {
  const dispatch = useDispatch();

  const handleZodiacAdd = (sign) => {
    dispatch(
      addToCart({
        productId: `${sign.name.toLowerCase()}-zodiac-box`,
        variantId: "Starter Box",
        productName: `${sign.name} Zodiac Box`,
        variantName: "Starter Box",
        quantity: 1,
        unitPrice: 399,
        image: {
          glyph: sign.symbol,
          themeColor: "#21182b",
          accentColor: "#bd7c38",
        },
        collection: "Zodiac Collection",
        zodiacSign: sign.name,
      })
    );
  };

  return (
    <section id="zodiac" className="bg-[#f7efe2] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a35d2c]">
              Our cosmic signature
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-[#2b1b19] sm:text-5xl">
              Find a gift <em className="font-normal text-[#aa6a34]">written in their stars.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#715949]">
            Zodiac hampers are our specialty—personal, playful and thoughtfully matched to the energy they bring to every room.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {zodiacItems.map((sign) => (
            <div
              key={sign.name}
              className="group flex flex-col justify-between rounded-2xl border border-[#5c3725]/10 bg-[#fffaf1] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#d39246] hover:shadow-xl hover:shadow-[#8c5727]/10"
            >
              <div>
                <span className="block font-serif text-4xl text-[#bd7c38] transition group-hover:scale-110">
                  {sign.symbol}
                </span>
                <h3 className="mt-4 text-sm font-bold text-[#35231e]">
                  {sign.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-[#9c7d64]">
                  {sign.element} · {sign.dates}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleZodiacAdd(sign)}
                className="mt-4 rounded-full border border-[#b98332]/40 bg-[#fffaf1] py-1.5 text-[11px] font-bold text-[#8a4f1e] transition hover:bg-[#e6ad3f] hover:text-[#2b1b19]"
              >
                + Add ₹399
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
