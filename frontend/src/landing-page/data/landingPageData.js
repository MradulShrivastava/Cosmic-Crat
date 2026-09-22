export const festivalCampaign = {
  label: "Diwali gifting edit",
  message: "Hand-finished hampers for luminous celebrations",
  action: "Explore the Diwali edit",
};

export const navigationItems = [
  { label: "Gifts for every moment", href: "#hampers" },
  { label: "Shop by zodiac", href: "#zodiac" },
  { label: "Gift finder", href: "#gift-finder" },
  { label: "Our story", href: "#our-story" },
];

export const zodiacItems = [
  ["Aries", "Mar 21 – Apr 19", "♈", "Fire"], ["Taurus", "Apr 20 – May 20", "♉", "Earth"],
  ["Gemini", "May 21 – Jun 20", "♊", "Air"], ["Cancer", "Jun 21 – Jul 22", "♋", "Water"],
  ["Leo", "Jul 23 – Aug 22", "♌", "Fire"], ["Virgo", "Aug 23 – Sep 22", "♍", "Earth"],
  ["Libra", "Sep 24 – Oct 23", "♎", "Air"], ["Scorpio", "Oct 24 – Nov 21", "♏", "Water"],
  ["Sagittarius", "Nov 22 – Dec 21", "♐", "Fire"], ["Capricorn", "Dec 22 – Jan 19", "♑", "Earth"],
  ["Aquarius", "Jan 20 – Feb 18", "♒", "Air"], ["Pisces", "Feb 19 – Mar 20", "♓", "Water"],
].map(([name, dates, symbol, element]) => ({ name, dates, symbol, element }));

export const featuredHampers = [
  { name: "The Starlit Ritual", sign: "Zodiac signature gift", price: "₹1,899", detail: "Candle, celestial journal and artisan sweets.", glyph: "☾", theme: "from-[#17233d] via-[#28365a] to-[#b97b38]" },
  { name: "Golden Abundance", sign: "Diwali celebration", price: "₹2,499", detail: "Brass keepsake, festive bites and a wish card.", glyph: "✦", theme: "from-[#6b321c] via-[#b66a2f] to-[#f5cb72]" },
  { name: "Moonlit Calm", sign: "Wellness & self care", price: "₹1,699", detail: "Lavender ritual, silk pouch and moonstone token.", glyph: "☽", theme: "from-[#312348] via-[#5d4c82] to-[#d7b98a]" },
];

export const reasons = [
  { icon: "✦", title: "Curated with intention", copy: "Every element earns its place—from the note to the final ribbon." },
  { icon: "♈", title: "Inspired by the stars", copy: "Thoughtful cues from each sign, never a one-size-fits-all gift." },
  { icon: "♡", title: "Made personal", copy: "A name, a note, a moment—your hamper carries the feeling." },
  { icon: "▣", title: "Beautifully delivered", copy: "A considered unboxing, packed with care and ready to delight." },
];

export const testimonials = [
  { quote: "It felt like someone had wrapped up a whole little universe for me.", name: "Aarushi M.", occasion: "Birthday gifting" },
  { quote: "The details were beautiful. My sister kept the zodiac card on her desk.", name: "Rhea K.", occasion: "Raksha Bandhan" },
  { quote: "The easiest meaningful gift I have ever sent—thoughtful from start to finish.", name: "Nishant S.", occasion: "Just because" },
];
