const createGallery = (shortName, themeColor, accentColor, highlight) => [
  {
    id: "box",
    title: `${shortName} Box Reveal`,
    caption: "Gift-ready outer box with cosmic detailing.",
    themeColor,
    accentColor,
    highlight,
  },
  {
    id: "inside",
    title: `${shortName} Inside The Box`,
    caption: "Styled arrangement of festive keepsakes and sweet details.",
    themeColor: accentColor,
    accentColor: themeColor,
    highlight: "Curated for meaningful gifting",
  },
  {
    id: "card",
    title: `${shortName} Message Card`,
    caption: "Printed message insert with warm Rakhi-inspired notes.",
    themeColor,
    accentColor,
    highlight: "Made for personal moments",
  },
];

const starterVariant = (items) => ({
  name: "Starter Box",
  price: 399,
  blurb: "Best for first-time buyers and low-risk gifting.",
  items,
});

const rakhiVariant = (items) => ({
  name: "Rakhi Edition",
  price: 499,
  blurb: "Festival-ready version with one extra gifting moment built in.",
  items,
});

const zodiacBlueprints = [
  ["aries", "Aries", "♈", "Mar 21 - Apr 19", "#FF6B57", "#FFB3A8", "bold", "Red thread charm bracelet", "spicy amber", "In Stock"],
  ["taurus", "Taurus", "♉", "Apr 20 - May 20", "#6F8F4E", "#BDD89B", "grounded", "Rose quartz bead bracelet", "vanilla fig", "Limited Stock"],
  ["gemini", "Gemini", "♊", "May 21 - Jun 20", "#E5B93C", "#FBE08C", "playful", "Dual-tone friendship bracelet", "citrus sparkle", "In Stock"],
  ["cancer", "Cancer", "♋", "Jun 21 - Jul 22", "#5C96D6", "#B8D8FF", "soft", "Moonstone charm bracelet", "ocean mist", "In Stock"],
  ["leo", "Leo", "♌", "Jul 23 - Aug 22", "#F09B1E", "#FFD27A", "radiant", "Golden bead bracelet", "sun-kissed saffron", "Limited Stock"],
  ["virgo", "Virgo", "♍", "Aug 23 - Sep 22", "#8AA367", "#D1E1B0", "thoughtful", "Green aventurine bracelet", "herbal linen", "In Stock"],
  ["libra", "Libra", "♎", "Sep 23 - Oct 22", "#C9A4D7", "#EDD9F3", "balanced", "Pearl accent bracelet", "rose bloom", "In Stock"],
  ["scorpio", "Scorpio", "♏", "Oct 23 - Nov 21", "#7B3C92", "#C594D4", "intense", "Obsidian knot bracelet", "midnight oud", "Limited Stock"],
  ["sagittarius", "Sagittarius", "♐", "Nov 22 - Dec 21", "#DD7A3B", "#F6BA8E", "adventurous", "Turquoise travel bracelet", "orange spice", "In Stock"],
  ["capricorn", "Capricorn", "♑", "Dec 22 - Jan 19", "#7F7F7F", "#C7C7C7", "classic", "Garnet charm bracelet", "cedar musk", "Out of Stock"],
  ["aquarius", "Aquarius", "♒", "Jan 20 - Feb 18", "#3CA8DF", "#A5E0FF", "modern", "Amethyst thread bracelet", "fresh linen", "In Stock"],
  ["pisces", "Pisces", "♓", "Feb 19 - Mar 20", "#7ACFC6", "#C7F2EC", "dreamy", "Aquamarine bead bracelet", "sea salt bloom", "In Stock"],
];

const stockNotes = {
  "In Stock": "Ready for quick confirmation and dispatch planning.",
  "Limited Stock": "Few boxes left for this sign. Order early to avoid missing out.",
  "Out of Stock": "This box is currently unavailable. Please check again soon.",
};

const buildZodiacProduct = ([id, shortName, glyph, dates, themeColor, accentColor, vibe, bracelet, fragrance, stockStatus]) => ({
  id,
  slug: `${id}-gift-box`,
  type: "zodiac",
  collection: "Zodiac",
  zodiacSign: shortName,
  name: `${shortName} Zodiac Box`,
  shortName,
  glyph,
  dates,
  themeColor,
  accentColor,
  heroCopy: `${shortName} gifting with a ${vibe} color story, curated details, and a launch-friendly price.`,
  description: `A ${vibe} cosmic gift box styled around ${shortName} tones, festive accents, and small details that feel thoughtful without feeling overdone.`,
  summary: `A ${vibe} starter gift box designed around ${shortName} colors, mood, and quick gifting appeal.`,
  audience: `Best for shoppers who want a thoughtful zodiac gift without crossing the impulse-buy price range.`,
  tags: ["Zodiac", "Budget Friendly", "Rakhi Ready"],
  launchBadge: shortName === "Cancer" || shortName === "Leo" ? "Fast mover" : "Easy add-on",
  stockStatus,
  stockNote: stockNotes[stockStatus],
  images: createGallery(shortName, themeColor, accentColor, `${shortName} constellation styling`),
  variants: [
    starterVariant([bracelet, `${fragrance} fragrance card`, "2 mini chocolates", `${shortName} zodiac message card`]),
    rakhiVariant(["Designer rakhi", bracelet, `${fragrance} fragrance card`, "Mini chocolate jar", "Personal note card"]),
  ],
});

const zodiacProducts = zodiacBlueprints.map(buildZodiacProduct);

const occasionProducts = [
  {
    id: "rakhi",
    slug: "rakhi-zodiac-gift-pack",
    type: "occasion",
    collection: "Occasion",
    zodiacSign: "Universal",
    name: "Rakhi Zodiac Gift Pack",
    shortName: "Rakhi",
    glyph: "✦",
    dates: "Seasonal launch",
    themeColor: "#E95A74",
    accentColor: "#FFD7A8",
    heroCopy: "A festive entry product made to convert quickly during Rakhi gifting.",
    description: "A warm Rakhi-ready gift box with sweet keepsakes, festive styling, and a premium cosmic finish.",
    summary: "A festive cosmic gift box designed for sibling gifting and special Rakhi surprises.",
    audience: "Best for sibling gifting, quick orders, and first-time buyers.",
    tags: ["Rakhi", "Best Seller", "Starter Product"],
    launchBadge: "Launch first",
    stockStatus: "In Stock",
    stockNote: stockNotes["In Stock"],
    images: createGallery("Rakhi Cosmic", "#E95A74", "#FFD7A8", "Seasonal gifting favorite"),
    variants: [
      starterVariant(["Designer rakhi", "Mini attar fragrance card", "2 chocolates", "Printed sibling note"]),
      rakhiVariant(["Premium rakhi", "Mini zodiac bracelet", "Attar fragrance card", "Chocolate jar", "Name note card"]),
    ],
  },
  {
    id: "birthday",
    slug: "birthday-color-box",
    type: "occasion",
    collection: "Occasion",
    zodiacSign: "Universal",
    name: "Birthday Color Box",
    shortName: "Birthday",
    glyph: "★",
    dates: "All year gifting",
    themeColor: "#FF6C93",
    accentColor: "#FFC8D7",
    heroCopy: "A cheerful low-ticket box for birthdays and last-minute gifting.",
    description: "A bright celebration box with playful color, sweet details, and a compact gift-ready format.",
    summary: "Bright packaging, small joyful items, and a price point that feels easy to say yes to.",
    audience: "Best for friends, classmates, and office gifting.",
    tags: ["Birthday", "Quick Gift", "Affordable"],
    launchBadge: "All-season",
    stockStatus: "In Stock",
    stockNote: stockNotes["In Stock"],
    images: createGallery("Birthday", "#FF6C93", "#FFC8D7", "Celebration-ready"),
    variants: [
      starterVariant(["Birthday badge", "Mini bracelet", "2 chocolates", "Birthday wish card"]),
      rakhiVariant(["Birthday badge", "Mini bracelet", "Fragrance card", "Chocolate jar", "Confetti note card"]),
    ],
  },
  {
    id: "self-care",
    slug: "self-care-zodiac-box",
    type: "occasion",
    collection: "Occasion",
    zodiacSign: "Universal",
    name: "Self Care Zodiac Box",
    shortName: "Self Care",
    glyph: "☾",
    dates: "All year gifting",
    themeColor: "#6799A3",
    accentColor: "#CBE7E4",
    heroCopy: "A soft gifting option for customers buying for themselves or close friends.",
    description: "A calm gift box with soothing details and a gentle cosmic aesthetic for comfort-led gifting.",
    summary: "Simple wellness-led curation that still fits your starter pricing strategy.",
    audience: "Best for comfort gifting, care packages, and soft-aesthetic shoppers.",
    tags: ["Self Care", "Soft", "Repeat Purchase"],
    launchBadge: "Upsell later",
    stockStatus: "Limited Stock",
    stockNote: stockNotes["Limited Stock"],
    images: createGallery("Self Care", "#6799A3", "#CBE7E4", "Soft gifting favorite"),
    variants: [
      starterVariant(["Mini affirmation card", "Mini bracelet", "Tea-light candle", "2 chocolates"]),
      rakhiVariant(["Mini affirmation card", "Mini bracelet", "Tea-light candle", "Fragrance card", "Chocolate jar"]),
    ],
  },
];

export const productFamilies = [...zodiacProducts, ...occasionProducts];
export const featuredProductIds = ["rakhi", "cancer", "leo", "birthday"];
