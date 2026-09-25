import { useState } from "react";
import "./landingPage.css";
import { FestivalBanner } from "./components/FestivalBanner";
import { Footer } from "./components/Footer";
import { GiftFinder } from "./components/GiftFinder";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { LuxuryHeader } from "./components/LuxuryHeader";
import { FeaturedHampers } from "./components/FeaturedHampers";
import { Testimonials } from "./components/Testimonials";
import { WhyMahika } from "./components/WhyMahika";
import { ZodiacCollection } from "./components/ZodiacCollection";
import { CartView } from "../components/CartView";
import { CartToast } from "../components/CartToast";
import { CheckoutView } from "../components/CheckoutView";
import { productFamilies } from "../data/products";
import { ProductDetail } from "../components/ProductDetail";
import { OrderModal } from "../components/OrderModal";

export function LandingPage() {
  const [finderOpen, setFinderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Selected product state for detail modal / view
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("Starter Box");

  // Direct order modal state
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const openFinder = () => {
    setFinderOpen(true);
    document.querySelector("#gift-finder")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]?.name || "Starter Box");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const handleOpenOrderModal = (product, variantName) => {
    setSelectedProduct(product);
    setSelectedVariant(variantName);
    setOrderModalOpen(true);
  };

  if (checkoutOpen) {
    return (
      <CheckoutView
        onBackToCart={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
        onBackToShop={() => setCheckoutOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf1] font-sans text-[#261913] selection:bg-[#e7b246] selection:text-[#25180f]">
      <FestivalBanner />
      <LuxuryHeader onFindGift={openFinder} onOpenCart={() => setCartOpen(true)} />

      <main>
        {selectedProduct ? (
          <div className="mx-auto max-w-7xl px-5 py-12">
            <ProductDetail
              product={selectedProduct}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              onBack={handleCloseProduct}
              onOrder={(prod, varName) => handleOpenOrderModal(prod, varName)}
              onOpenCart={() => setCartOpen(true)}
            />
          </div>
        ) : (
          <>
            <HeroSection onFindGift={openFinder} />
            <ZodiacCollection />
            <FeaturedHampers />
            <GiftFinder open={finderOpen} onOpen={() => setFinderOpen(true)} />
            <WhyMahika />
            <HowItWorks />
            <Testimonials />
          </>
        )}
      </main>

      <Footer />

      {/* Cart Drawer View */}
      <CartView
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onExploreGifts={() => {
          setCartOpen(false);
          if (selectedProduct) setSelectedProduct(null);
          document.querySelector("#hampers")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Added to Cart Toast */}
      <CartToast onOpenCart={() => setCartOpen(true)} />

      {/* Legacy Prebook Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        product={selectedProduct}
        selectedVariant={selectedVariant}
        onClose={() => setOrderModalOpen(false)}
        onContinueShopping={() => {
          setOrderModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
