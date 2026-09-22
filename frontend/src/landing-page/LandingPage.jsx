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

export function LandingPage() {
  const [finderOpen, setFinderOpen] = useState(false);
  const openFinder = () => {
    setFinderOpen(true);
    document.querySelector("#gift-finder")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fffaf1] font-sans text-[#261913] selection:bg-[#e7b246] selection:text-[#25180f]">
      <FestivalBanner />
      <LuxuryHeader onFindGift={openFinder} />
      <main>
        <HeroSection onFindGift={openFinder} />
        <ZodiacCollection />
        <FeaturedHampers />
        <GiftFinder open={finderOpen} onOpen={() => setFinderOpen(true)} />
        <WhyMahika />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
