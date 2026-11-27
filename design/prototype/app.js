/* Bazar business-hub blueprint: categories, 24 frames, invoice motion, live demos. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ------------------------------------------------------------------ data */

const CATEGORIES = [
  {
    slug: "home-cooking",
    en: "Home cooking",
    kreol: "Manze lakaz",
    icon: "i-home",
    color: "teal",
  },
  {
    slug: "cakes",
    en: "Cakes & pastries",
    kreol: "Gato",
    icon: "i-star",
    color: "coral",
  },
  {
    slug: "fruit-veg",
    en: "Fruit & vegetables",
    kreol: "Fri ek legim",
    icon: "i-leaf",
    color: "green",
  },
  {
    slug: "groceries",
    en: "Groceries & pantry",
    kreol: "Komisio",
    icon: "i-cart",
    color: "yellow",
  },
  {
    slug: "pickles",
    en: "Pickles & achards",
    kreol: "Achard",
    icon: "i-basket",
    color: "coral",
  },
  {
    slug: "drinks",
    en: "Drinks & juices",
    kreol: "Bwason",
    icon: "i-cup",
    color: "teal",
  },
  {
    slug: "fashion",
    en: "Fashion & tailoring",
    kreol: "Linz",
    icon: "i-user",
    color: "ink",
  },
  {
    slug: "beauty",
    en: "Beauty & care",
    kreol: "Labote",
    icon: "i-heart",
    color: "coral",
  },
  {
    slug: "crafts",
    en: "Handicrafts",
    kreol: "Lartizana",
    icon: "i-basket",
    color: "yellow",
  },
  {
    slug: "home-living",
    en: "Home & living",
    kreol: "Lakaz",
    icon: "i-store",
    color: "teal",
  },
  {
    slug: "kids",
    en: "Kids & baby",
    kreol: "Zanfan",
    icon: "i-user",
    color: "green",
  },
  {
    slug: "flowers",
    en: "Flowers & gifts",
    kreol: "Fler ek kado",
    icon: "i-heart",
    color: "coral",
  },
];

const BUSINESSES = [
  {
    slug: "gato-marie",
    name: "Gato Marie",
    logo: "GM",
    av: "av-5",
    cats: ["cakes", "home-cooking"],
    district: "Rose Hill",
    rating: 4.8,
    reviews: 212,
    distance: "0.8 km",
    tag: "Cakes & pastries",
    open: "Closes 18:00",
    verified: true,
  },
  {
    slug: "ti-achard",
    name: "Ti Achard",
    logo: "TA",
    av: "av-2",
    cats: ["pickles"],
    district: "Beau Bassin",
    rating: 4.7,
    reviews: 98,
    distance: "2.4 km",
    tag: "Pickles & achards",
    open: "Closes 17:00",
    verified: true,
  },
  {
    slug: "chez-nadege",
    name: "Chez Nadège",
    logo: "CN",
    av: "av-1",
    cats: ["home-cooking"],
    district: "Quatre Bornes",
    rating: 4.9,
    reviews: 164,
    distance: "3.1 km",
    tag: "Home cooking",
    open: "Lunch 11–15",
    verified: true,
  },
  {
    slug: "fri-karan",
    name: "Fri Karan",
    logo: "FK",
    av: "av-3",
    cats: ["fruit-veg"],
    district: "Port Louis",
    rating: 4.6,
    reviews: 73,
    distance: "4.8 km",
    tag: "Fruit & vegetables",
    open: "Closes 16:00",
    verified: true,
  },
  {
    slug: "atelier-volan",
    name: "Atelier Volan",
    logo: "AV",
    av: "av-4",
    cats: ["crafts"],
    district: "Curepipe",
    rating: 4.9,
    reviews: 87,
    distance: "3.6 km",
    tag: "Handicrafts",
    open: "Closes 17:30",
    verified: true,
  },
  {
    slug: "lartizan-moris",
    name: "Lartizan Moris",
    logo: "LM",
    av: "av-6",
    cats: ["crafts"],
    district: "Port Louis",
    rating: 4.8,
    reviews: 64,
    distance: "4.2 km",
    tag: "Handicrafts",
    open: "Closes 16:00",
    verified: true,
  },
  {
    slug: "maison-tiss",
    name: "Maison Tiss",
    logo: "MT",
    av: "av-5",
    cats: ["crafts"],
    district: "Moka",
    rating: 4.7,
    reviews: 41,
    distance: "5.0 km",
    tag: "Handicrafts",
    open: "By appointment",
    verified: false,
  },
  {
    slug: "belle-etoile",
    name: "Belle Étoile",
    logo: "BE",
    av: "av-2",
    cats: ["fashion"],
    district: "Rose Hill",
    rating: 4.6,
    reviews: 52,
    distance: "1.2 km",
    tag: "Fashion & tailoring",
    open: "Closes 18:00",
    verified: true,
  },
  {
    slug: "zil-beauty",
    name: "Zil Beauty",
    logo: "ZB",
    av: "av-1",
    cats: ["beauty"],
    district: "Grand Baie",
    rating: 4.8,
    reviews: 119,
    distance: "8.4 km",
    tag: "Beauty & care",
    open: "Closes 19:00",
    verified: true,
  },
  {
    slug: "kado-kreol",
    name: "Kado Kreol",
    logo: "KK",
    av: "av-4",
    cats: ["flowers"],
    district: "Quatre Bornes",
    rating: 4.7,
    reviews: 38,
    distance: "2.9 km",
    tag: "Flowers & gifts",
    open: "Closes 17:00",
    verified: true,
  },
  {
    slug: "bebe-doux",
    name: "Bébé Doux",
    logo: "BD",
    av: "av-6",
    cats: ["kids"],
    district: "Vacoas",
    rating: 4.8,
    reviews: 57,
    distance: "3.8 km",
    tag: "Kids & baby",
    open: "Closes 17:00",
    verified: true,
  },
  {
    slug: "lakaz-vert",
    name: "Lakaz Vert",
    logo: "LV",
    av: "av-3",
    cats: ["home-living", "groceries"],
    district: "Moka",
    rating: 4.5,
    reviews: 29,
    distance: "6.1 km",
    tag: "Home & living",
    open: "Closes 16:30",
    verified: false,
  },
  {
    slug: "juice-lili",
    name: "Juice Lili",
    logo: "JL",
    av: "av-2",
    cats: ["drinks"],
    district: "Rose Hill",
    rating: 4.7,
    reviews: 44,
    distance: "0.6 km",
    tag: "Drinks & juices",
    open: "Closes 18:00",
    verified: true,
  },
];

const PRODUCTS = {
  "gato-marie": [
    {
      slug: "gato-patate",
      name: "Gato patate",
      price: 250,
      note: "Serves 6 · best seller",
      ph: "ph-1",
    },
    {
      slug: "gato-coco",
      name: "Gato coco",
      price: 220,
      note: "Serves 6",
      ph: "ph-3",
    },
    {
      slug: "samosa",
      name: "Samosa (10)",
      price: 150,
      note: "Chicken or veg",
      ph: "ph-4",
    },
    {
      slug: "pain",
      name: "Fresh bread",
      price: 25,
      note: "Baked at 6 am",
      ph: "ph-2",
    },
  ],
  "atelier-volan": [
    {
      slug: "raffia-bag",
      name: "Raffia market bag",
      price: 850,
      note: "Handwoven · 3 days",
      ph: "ph-3",
    },
    {
      slug: "woven-hat",
      name: "Woven sun hat",
      price: 650,
      note: "One size",
      ph: "ph-4",
    },
    {
      slug: "shell-earrings",
      name: "Shell earrings",
      price: 450,
      note: "Handmade pair",
      ph: "ph-1",
    },
  ],
  "lartizan-moris": [
    {
      slug: "wooden-bowl",
      name: "Wooden bowl",
      price: 1200,
      note: "Carved from local wood",
      ph: "ph-2",
    },
    {
      slug: "coconut-candle",
      name: "Coconut candle",
      price: 550,
      note: "Vanilla · 40 h",
      ph: "ph-3",
    },
  ],
  "ti-achard": [
    {
      slug: "achard",
      name: "Achard légumes",
      price: 180,
      note: "500 g jar",
      ph: "ph-2",
    },
    {
      slug: "piment",
      name: "Piment confit",
      price: 120,
      note: "200 g jar",
      ph: "ph-4",
    },
  ],
  "chez-nadege": [
    {
      slug: "mine",
      name: "Mine bouille",
      price: 180,
      note: "Chicken or veg",
      ph: "ph-4",
    },
    {
      slug: "biryani",
      name: "Biryani",
      price: 250,
      note: "Friday special",
      ph: "ph-1",
    },
  ],
  "zil-beauty": [
    {
      slug: "soap",
      name: "Coconut soap",
      price: 150,
      note: "Cold-pressed",
      ph: "ph-3",
    },
    {
      slug: "oil",
      name: "Hair oil",
      price: 320,
      note: "Rosemary · 100 ml",
      ph: "ph-2",
    },
  ],
  "kado-kreol": [
    {
      slug: "bouquet",
      name: "Seasonal bouquet",
      price: 350,
      note: "Same-day",
      ph: "ph-1",
    },
    {
      slug: "gift-box",
      name: "Small gift box",
      price: 550,
      note: "Local treats",
      ph: "ph-2",
    },
  ],
  "bebe-doux": [
    {
      slug: "onesie",
      name: "Cotton onesie",
      price: 200,
      note: "0–12 months",
      ph: "ph-3",
    },
    { slug: "toy", name: "Soft toy", price: 350, note: "Handmade", ph: "ph-4" },
  ],
  "belle-etoile": [
    {
      slug: "dress",
      name: "Custom dress",
      price: 1200,
      note: "Made to measure",
      ph: "ph-2",
    },
    {
      slug: "alteration",
      name: "Alteration",
      price: 400,
      note: "3 days",
      ph: "ph-4",
    },
  ],
  "fri-karan": [
    {
      slug: "tomato",
      name: "Tomatoes 1 kg",
      price: 60,
      note: "Market fresh",
      ph: "ph-1",
    },
    {
      slug: "greens",
      name: "Bredes 1 kg",
      price: 40,
      note: "Local greens",
      ph: "ph-4",
    },
  ],
  "juice-lili": [
    {
      slug: "alouda",
      name: "Alouda",
      price: 80,
      note: "Large glass",
      ph: "ph-3",
    },
    {
      slug: "juice",
      name: "Passion juice",
      price: 100,
      note: "No added sugar",
      ph: "ph-2",
    },
  ],
  "lakaz-vert": [
    {
      slug: "plant",
      name: "Potted plant",
      price: 250,
      note: "Easy care",
      ph: "ph-4",
    },
    { slug: "pot", name: "Woven pot", price: 180, note: "Small", ph: "ph-3" },
  ],
  "maison-tiss": [
    {
      slug: "runner",
      name: "Table runner",
      price: 950,
      note: "Handwoven",
      ph: "ph-2",
    },
    {
      slug: "cushion",
      name: "Cushion cover",
      price: 700,
      note: "45 × 45 cm",
      ph: "ph-1",
    },
  ],
};

const catLabel = (slug) =>
  (CATEGORIES.find((c) => c.slug === slug) || {}).en || slug;

const EXTRA_BUSINESSES = [
  [
    "gato-rose",
    "Gato Rose",
    "GR",
    "av-2",
    "cakes",
    "Rose Hill",
    4.7,
    64,
    "1.2 km",
  ],
  [
    "patisserie-lila",
    "Pâtisserie Lila",
    "PL",
    "av-4",
    "cakes",
    "Quatre Bornes",
    4.8,
    91,
    "3.4 km",
  ],
  [
    "gato-kreol",
    "Gato Kreol",
    "GK",
    "av-1",
    "cakes",
    "Beau Bassin",
    4.6,
    38,
    "2.1 km",
  ],
  [
    "tifin-coal",
    "Tifin Coal",
    "TC",
    "av-3",
    "home-cooking",
    "Port Louis",
    4.7,
    112,
    "4.6 km",
  ],
  [
    "mama-asha",
    "Mama Asha",
    "MA",
    "av-5",
    "home-cooking",
    "Rose Hill",
    4.9,
    143,
    "1.0 km",
  ],
  [
    "kot-kwizinn",
    "Kot Kwizinn",
    "KK",
    "av-2",
    "home-cooking",
    "Vacoas",
    4.6,
    57,
    "5.2 km",
  ],
  [
    "legim-fresh",
    "Legim Fresh",
    "LF",
    "av-1",
    "fruit-veg",
    "Quatre Bornes",
    4.7,
    45,
    "2.8 km",
  ],
  [
    "bazar-vert",
    "Bazar Vert",
    "BV",
    "av-3",
    "fruit-veg",
    "Rose Hill",
    4.5,
    31,
    "0.9 km",
  ],
  [
    "fri-lontan",
    "Fri Lontan",
    "FL",
    "av-4",
    "fruit-veg",
    "Port Louis",
    4.8,
    66,
    "4.1 km",
  ],
  [
    "episri-cool",
    "Épisri Cool",
    "EC",
    "av-5",
    "groceries",
    "Beau Bassin",
    4.6,
    52,
    "2.6 km",
  ],
  [
    "komisio-plus",
    "Komisio Plus",
    "KP",
    "av-1",
    "groceries",
    "Rose Hill",
    4.7,
    74,
    "1.1 km",
  ],
  [
    "ti-marchand",
    "Ti Marchand",
    "TM",
    "av-3",
    "groceries",
    "Moka",
    4.5,
    27,
    "5.8 km",
  ],
  [
    "achard-mama",
    "Achard Mama",
    "AM",
    "av-2",
    "pickles",
    "Rose Hill",
    4.8,
    83,
    "0.7 km",
  ],
  [
    "piman-lakaz",
    "Piman Lakaz",
    "PL",
    "av-4",
    "pickles",
    "Quatre Bornes",
    4.6,
    36,
    "3.2 km",
  ],
  [
    "zasar-delice",
    "Zasar Délice",
    "ZD",
    "av-5",
    "pickles",
    "Beau Bassin",
    4.7,
    49,
    "2.0 km",
  ],
  [
    "alouda-bar",
    "Alouda Bar",
    "AB",
    "av-1",
    "drinks",
    "Port Louis",
    4.7,
    88,
    "4.4 km",
  ],
  [
    "fresh-zil",
    "Fresh Zil",
    "FZ",
    "av-3",
    "drinks",
    "Rose Hill",
    4.8,
    61,
    "0.9 km",
  ],
  [
    "bwason-kreol",
    "Bwason Kreol",
    "BK",
    "av-2",
    "drinks",
    "Curepipe",
    4.5,
    33,
    "4.9 km",
  ],
  [
    "atelier-linz",
    "Atelier Linz",
    "AL",
    "av-4",
    "fashion",
    "Rose Hill",
    4.7,
    58,
    "1.4 km",
  ],
  [
    "maison-couture",
    "Maison Couture",
    "MC",
    "av-5",
    "fashion",
    "Quatre Bornes",
    4.8,
    72,
    "2.7 km",
  ],
  [
    "ti-kostim",
    "Ti Kostim",
    "TK",
    "av-1",
    "fashion",
    "Vacoas",
    4.5,
    29,
    "4.3 km",
  ],
  [
    "labote-naturel",
    "Labote Naturel",
    "LN",
    "av-2",
    "beauty",
    "Rose Hill",
    4.8,
    96,
    "1.0 km",
  ],
  [
    "savon-moris",
    "Savon Moris",
    "SM",
    "av-3",
    "beauty",
    "Moka",
    4.7,
    44,
    "5.5 km",
  ],
  [
    "beauty-lakaz",
    "Beauty Lakaz",
    "BL",
    "av-4",
    "beauty",
    "Quatre Bornes",
    4.6,
    37,
    "2.9 km",
  ],
  [
    "kraft-kreol",
    "Kraft Kreol",
    "KC",
    "av-5",
    "crafts",
    "Port Louis",
    4.7,
    52,
    "4.3 km",
  ],
  [
    "basket-moris",
    "Basket Moris",
    "BM",
    "av-1",
    "crafts",
    "Curepipe",
    4.8,
    39,
    "4.0 km",
  ],
  [
    "lartizan-sud",
    "Lartizan Sud",
    "LS",
    "av-3",
    "crafts",
    "Savanne",
    4.6,
    22,
    "7.2 km",
  ],
  [
    "plant-corner",
    "Plant Corner",
    "PC",
    "av-4",
    "home-living",
    "Rose Hill",
    4.7,
    41,
    "1.3 km",
  ],
  [
    "lakaz-deco",
    "Lakaz Déco",
    "LD",
    "av-5",
    "home-living",
    "Moka",
    4.6,
    34,
    "5.6 km",
  ],
  [
    "pot-terre",
    "Pot & Terre",
    "PT",
    "av-2",
    "home-living",
    "Quatre Bornes",
    4.8,
    48,
    "3.0 km",
  ],
  [
    "ti-zanfan",
    "Ti Zanfan",
    "TZ",
    "av-1",
    "kids",
    "Rose Hill",
    4.7,
    56,
    "1.1 km",
  ],
  [
    "bebe-lakaz",
    "Bébé Lakaz",
    "BL",
    "av-3",
    "kids",
    "Vacoas",
    4.6,
    31,
    "4.2 km",
  ],
  [
    "kado-bebe",
    "Kado Bébé",
    "KB",
    "av-4",
    "kids",
    "Quatre Bornes",
    4.8,
    44,
    "2.8 km",
  ],
  [
    "fler-moris",
    "Fler Moris",
    "FM",
    "av-5",
    "flowers",
    "Port Louis",
    4.7,
    62,
    "4.5 km",
  ],
  [
    "bouquet-lakaz",
    "Bouquet Lakaz",
    "BL",
    "av-2",
    "flowers",
    "Rose Hill",
    4.8,
    39,
    "0.8 km",
  ],
  ["rose-zil", "Rose Zil", "RZ", "av-1", "flowers", "Moka", 4.6, 28, "5.4 km"],
];

for (const [
  slug,
  name,
  logo,
  av,
  cat,
  district,
  rating,
  reviews,
  distance,
] of EXTRA_BUSINESSES) {
  BUSINESSES.push({
    slug,
    name,
    logo,
    av,
    cats: [cat],
    district,
    rating,
    reviews,
    distance,
    tag: catLabel(cat),
    open: "Closes 18:00",
    verified: true,
  });
}

const CATEGORY_PRODUCTS = {
  "home-cooking": [
    ["Mine bouille", "chez-nadege", 180, "cat-home-cooking"],
    ["Biryani", "tifin-coal", 250, "cat-home-cooking"],
    ["Dholl puri", "mama-asha", 60, "bread"],
    ["Chicken curry", "kot-kwizinn", 280, "cat-home-cooking"],
    ["Rougaille", "chez-nadege", 220, "produce-cover"],
    ["Fried rice", "tifin-coal", 200, "cat-home-cooking"],
  ],
  cakes: [
    ["Gato patate", "gato-marie", 250, "gato-patate"],
    ["Gato coco", "gato-marie", 220, "gato-coco"],
    ["Tarte banane", "gato-rose", 300, "tarte-banane"],
    ["Chocolate cake", "patisserie-lila", 450, "chocolate-cake"],
    ["Croissant", "gato-kreol", 60, "bread"],
    ["Samosa (10)", "gato-marie", 150, "samosa"],
  ],
  "fruit-veg": [
    ["Tomatoes 1 kg", "fri-karan", 60, "produce-cover"],
    ["Bredes 1 kg", "legim-fresh", 40, "produce-cover"],
    ["Bananas 1 kg", "bazar-vert", 50, "produce-cover"],
    ["Carrots 1 kg", "fri-lontan", 45, "produce-cover"],
    ["Pineapple", "fri-karan", 80, "produce-cover"],
    ["Salad pack", "legim-fresh", 70, "produce-cover"],
  ],
  groceries: [
    ["Rice 5 kg", "episri-cool", 320, "produce-cover"],
    ["Cooking oil 1 L", "komisio-plus", 180, "produce-cover"],
    ["Flour 2 kg", "ti-marchand", 120, "produce-cover"],
    ["Sugar 1 kg", "episri-cool", 70, "produce-cover"],
    ["Tea pack", "komisio-plus", 95, "produce-cover"],
    ["Soap pack", "ti-marchand", 110, "cat-beauty"],
  ],
  pickles: [
    ["Achard légumes", "ti-achard", 180, "achard"],
    ["Piment confit", "achard-mama", 120, "piment"],
    ["Chatini", "piman-lakaz", 150, "achard"],
    ["Zasar", "zasar-delice", 160, "achard"],
    ["Pickled onion", "ti-achard", 140, "piment"],
    ["Lime pickle", "achard-mama", 130, "piment"],
  ],
  drinks: [
    ["Alouda", "juice-lili", 80, "alouda"],
    ["Passion juice", "fresh-zil", 100, "alouda"],
    ["Orange juice", "alouda-bar", 90, "cat-drinks"],
    ["Sugarcane juice", "bwason-kreol", 70, "cat-drinks"],
    ["Coconut water", "juice-lili", 120, "cat-drinks"],
    ["Smoothie", "fresh-zil", 150, "alouda"],
  ],
  fashion: [
    ["Custom dress", "belle-etoile", 1200, "cat-fashion"],
    ["Alteration", "atelier-linz", 400, "cat-fashion"],
    ["Linen shirt", "maison-couture", 850, "cat-fashion"],
    ["Kids outfit", "ti-kostim", 600, "cat-fashion"],
    ["Tote bag", "atelier-linz", 450, "raffia-bag"],
    ["Headwrap", "belle-etoile", 300, "cat-fashion"],
  ],
  beauty: [
    ["Coconut soap", "zil-beauty", 150, "cat-beauty"],
    ["Hair oil", "labote-naturel", 320, "cat-beauty"],
    ["Body scrub", "savon-moris", 250, "cat-beauty"],
    ["Shea cream", "beauty-lakaz", 280, "cat-beauty"],
    ["Lip balm", "zil-beauty", 120, "cat-beauty"],
    ["Gift set", "savon-moris", 450, "cat-beauty"],
  ],
  crafts: [
    ["Raffia market bag", "atelier-volan", 850, "raffia-bag"],
    ["Woven sun hat", "atelier-volan", 650, "woven-hat"],
    ["Shell earrings", "atelier-volan", 450, "earrings"],
    ["Wooden bowl", "lartizan-moris", 1200, "crafts-cover"],
    ["Coconut candle", "lartizan-moris", 550, "crafts-cover"],
    ["Table runner", "maison-tiss", 950, "crafts-cover"],
  ],
  "home-living": [
    ["Potted plant", "lakaz-vert", 250, "cat-home-living"],
    ["Woven pot", "plant-corner", 180, "crafts-cover"],
    ["Cushion cover", "lakaz-deco", 700, "crafts-cover"],
    ["Table lamp", "pot-terre", 950, "cat-home-living"],
    ["Wall art", "lakaz-deco", 1200, "crafts-cover"],
    ["Planter", "plant-corner", 320, "cat-home-living"],
  ],
  kids: [
    ["Cotton onesie", "bebe-doux", 200, "cat-kids"],
    ["Soft toy", "ti-zanfan", 350, "cat-kids"],
    ["Baby blanket", "bebe-lakaz", 450, "cat-kids"],
    ["Kids tee", "kado-bebe", 250, "cat-fashion"],
    ["Story book", "ti-zanfan", 180, "cat-kids"],
    ["Baby shoes", "bebe-doux", 400, "cat-kids"],
  ],
  flowers: [
    ["Seasonal bouquet", "kado-kreol", 350, "cat-flowers"],
    ["Roses", "fler-moris", 500, "cat-flowers"],
    ["Gift box", "bouquet-lakaz", 550, "cat-flowers"],
    ["Orchid pot", "rose-zil", 650, "cat-home-living"],
    ["Birthday bunch", "kado-kreol", 450, "cat-flowers"],
    ["Dried flowers", "fler-moris", 400, "cat-flowers"],
  ],
};

const CAT_PHOTO = {
  "home-cooking": "cat-home-cooking",
  cakes: "cat-cakes",
  "fruit-veg": "cat-fruit-veg",
  groceries: "cat-groceries",
  pickles: "cat-pickles",
  drinks: "cat-drinks",
  fashion: "cat-fashion",
  beauty: "cat-beauty",
  crafts: "cat-crafts",
  "home-living": "cat-home-living",
  kids: "cat-kids",
  flowers: "cat-flowers",
};

const bySlug = Object.fromEntries(BUSINESSES.map((b) => [b.slug, b]));
const catBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

const PHOTOS = {
  "gato-patate": "gato-patate",
  "gato-coco": "gato-coco",
  samosa: "samosa",
  pain: "bread",
  "raffia-bag": "raffia-bag",
  "woven-hat": "woven-hat",
  "shell-earrings": "earrings",
  achard: "achard",
  piment: "piment",
  tomato: "produce-cover",
  greens: "produce-cover",
  alouda: "alouda",
  juice: "alouda",
};

const PHOTO_BY_NAME = {
  "Gato patate": "gato-patate",
  "Gato coco": "gato-coco",
  "Samosa (10)": "samosa",
  "Fresh bread": "bread",
  "Tarte banane": "tarte-banane",
};

const SHOP_COVER = {
  "gato-marie": "bakery-cover",
  "ti-achard": "achard",
  "chez-nadege": "produce-cover",
  "fri-karan": "produce-cover",
  "atelier-volan": "raffia-bag",
  "lartizan-moris": "crafts-cover",
  "maison-tiss": "woven-hat",
  "juice-lili": "alouda",
};

function photoFor(p) {
  return PHOTOS[p.slug] || PHOTO_BY_NAME[p.name];
}

function productsFor(slug) {
  return (
    PRODUCTS[slug] || [
      {
        slug: `${slug}-1`,
        name: "Best seller",
        price: 250,
        note: "Shop favourite",
        ph: "ph-1",
      },
      {
        slug: `${slug}-2`,
        name: "New arrival",
        price: 180,
        note: "Just added",
        ph: "ph-3",
      },
    ]
  );
}

/* --------------------------------------------------------------- renderers */

function catTile(c) {
  const photo = CAT_PHOTO[c.slug];
  const style = photo
    ? ` style="background-image: url('assets/photos/${photo}.jpg')"`
    : "";
  return `<button class="cat-tile${photo ? " has-photo" : ""}" data-cat="${c.slug}"${style} title="${c.en}"><span class="cat-ico t-${c.color}"><svg class="i"><use href="#${c.icon}" /></svg></span><span class="cat-copy"><b>${c.en}</b><small>${c.kreol}</small></span></button>`;
}

function bizCard(b) {
  const cover = SHOP_COVER[b.slug] || CAT_PHOTO[b.cats[0]];
  const thumb = cover
    ? `<div class="biz-thumb"><img src="assets/photos/${cover}.jpg" alt="" loading="lazy"></div>`
    : `<div class="avatar ${b.av}">${b.logo}</div>`;
  return `<button class="biz-card" data-goto="f-c-shop">${thumb}<div class="grow"><div class="row g4"><b>${b.name}</b>${b.verified ? '<svg class="i xs verified"><use href="#i-shield" /></svg>' : ""}</div><small class="muted">${b.tag} · ${b.district}</small><div class="row g4 mt4"><svg class="i xs star"><use href="#i-star" /></svg><b class="tiny">${b.rating}</b><small class="muted">(${b.reviews}) · ${b.distance}</small></div></div><div class="biz-end"><span class="tiny muted">${b.open}</span><svg class="i chev"><use href="#i-chev-right" /></svg></div></button>`;
}

function productCard(p, shopSlug) {
  const shop = bySlug[shopSlug];
  const photo = photoFor(p);
  const media = photo
    ? `<img class="ph-img" src="assets/photos/${photo}.jpg" alt="${p.name}" loading="lazy">`
    : "";
  return `<button class="product-card" data-goto="f-c-product"><div class="ph ${p.ph} tall${photo ? " has-photo" : ""}">${media}<span>${p.name}</span></div><b class="tiny">${p.name}</b><small class="muted">${p.note || shop.name}</small><span class="price sm">Rs ${p.price.toLocaleString("en-US")}</span></button>`;
}

function catProductCard([name, shopSlug, price, photo]) {
  const shop = bySlug[shopSlug];
  const media = photo
    ? `<img class="ph-img" src="assets/photos/${photo}.jpg" alt="${name}" loading="lazy">`
    : "";
  return `<button class="product-card" data-goto="f-c-shop"><div class="ph ph-1 tall${photo ? " has-photo" : ""}">${media}<span>${name}</span></div><b class="tiny">${name}</b><small class="muted">${shop ? shop.name : "Bazar"} · ${shop ? shop.district : ""}</small><span class="price sm">Rs ${price}</span></button>`;
}

function customerOrder(o) {
  return `<div class="order-card" data-goto="${o.track ? "f-c-track" : "f-c-orders"}"><div class="row between"><b>${o.no}</b><span class="status ${o.tone}">${o.status}</span></div><small class="muted">${o.shop} · ${o.when}</small><div class="order-lines"><div><span>${o.items}</span> ${o.detail}</div></div><div class="row between mt8"><b class="price sm">Rs ${o.total}</b><small class="muted">${o.pay}</small></div></div>`;
}

function sellerProductRow(p) {
  const tone = p.stock === 0 ? "new" : p.stock <= 6 ? "prep" : "ok";
  const label = p.stock === 0 ? "Out" : p.stock <= 6 ? "Low" : "Active";
  const photo = photoFor(p);
  const media = photo
    ? `<img class="ph-img" src="assets/photos/${photo}.jpg" alt="" loading="lazy">`
    : "";
  return `<div class="prod-row"><div class="ph ${p.ph} xs${photo ? " has-photo" : ""}">${media}<span></span></div><div class="grow"><b class="tiny">${p.name}</b><small class="muted">Rs ${p.price} · ${p.stock} in stock</small></div><span class="status ${tone}">${label}</span></div>`;
}

function invoiceRow(i) {
  const tone = i.status === "Draft" ? "prep" : "ok";
  return `<div class="inv-row"><svg class="i"><use href="#i-doc" /></svg><div class="grow"><b class="tiny">${i.no}</b><small class="muted">${i.customer} · ${i.date}</small></div><div class="right"><b class="mono">Rs ${i.total}</b><span class="status ${tone}">${i.status}</span></div></div>`;
}

const RENDER = {
  categories: () => CATEGORIES.map(catTile).join(""),
  "categories:compact": () => CATEGORIES.map(catTile).join(""),
  "businesses:nearby": () =>
    ["juice-lili", "gato-marie", "atelier-volan"]
      .map((s) => bizCard(bySlug[s]))
      .join(""),
  "businesses:recommended": () =>
    ["ti-achard", "chez-nadege", "gato-marie"]
      .map((s) => bizCard(bySlug[s]))
      .join(""),
  "businesses:saved": () =>
    ["gato-marie", "atelier-volan", "ti-achard"]
      .map((s) => bizCard(bySlug[s]))
      .join(""),
  "businesses:cakes": () =>
    ["gato-marie", "chez-nadege"].map((s) => bizCard(bySlug[s])).join(""),
  "products:gato-marie": () =>
    productsFor("gato-marie")
      .map((p) => productCard(p, "gato-marie"))
      .join(""),
  "products:cakes": () =>
    productsFor("gato-marie")
      .slice(0, 2)
      .map((p) => productCard(p, "gato-marie"))
      .join(""),
  "products:foryou": () =>
    [productsFor("gato-marie")[0], productsFor("ti-achard")[0]]
      .map((p, i) => productCard(p, i === 0 ? "gato-marie" : "ti-achard"))
      .join(""),
  "products:nearby": () =>
    [productsFor("juice-lili")[0], productsFor("ti-achard")[0]]
      .map((p, i) => productCard(p, i === 0 ? "juice-lili" : "ti-achard"))
      .join(""),
  "products:saved": () =>
    [productsFor("atelier-volan")[0], productsFor("gato-marie")[1]]
      .map((p, i) => productCard(p, i === 0 ? "atelier-volan" : "gato-marie"))
      .join(""),
  orders: () =>
    [
      customerOrder({
        no: "GM-0042",
        shop: "Gato Marie",
        when: "today 09:42",
        items: "3 items",
        detail: "Gato patate, samosa",
        total: 450,
        pay: "Cash on delivery",
        status: "Preparing",
        tone: "prep",
        track: true,
      }),
      customerOrder({
        no: "GM-0031",
        shop: "Ti Achard",
        when: "18 Nov",
        items: "2 items",
        detail: "Achard, piment",
        total: 300,
        pay: "Paid · cash",
        status: "Delivered",
        tone: "done",
      }),
    ].join(""),
  "seller-products": () =>
    [
      { name: "Gato patate", price: 250, stock: 18, ph: "ph-1" },
      { name: "Gato coco", price: 220, stock: 6, ph: "ph-3" },
      { name: "Samosa (10)", price: 150, stock: 4, ph: "ph-4" },
      { name: "Fresh bread", price: 25, stock: 0, ph: "ph-2" },
      { name: "Tarte banane", price: 300, stock: 12, ph: "ph-1" },
    ]
      .map(sellerProductRow)
      .join(""),
  inventory: () =>
    [
      { name: "Samosa (10)", price: 150, stock: 4, ph: "ph-4" },
      { name: "Gato coco", price: 220, stock: 6, ph: "ph-3" },
      { name: "Fresh bread", price: 25, stock: 0, ph: "ph-2" },
    ]
      .map(sellerProductRow)
      .join(""),
  invoices: () =>
    [
      {
        no: "INV-GM-0042",
        customer: "Sherif S.",
        date: "25 Nov",
        total: 450,
        status: "Draft",
      },
      {
        no: "INV-GM-0039",
        customer: "Ana P.",
        date: "24 Nov",
        total: 720,
        status: "Sent",
      },
      {
        no: "INV-GM-0038",
        customer: "Nadia R.",
        date: "23 Nov",
        total: 980,
        status: "Sent",
      },
    ]
      .map(invoiceRow)
      .join(""),
};

function renderAll() {
  $$("[data-render]").forEach((el) => {
    const key = el.dataset.render;
    if (RENDER[key]) el.innerHTML = RENDER[key]();
  });
}

/* ------------------------------------------------------------ category page */

function showCategory(slug, { jump = true } = {}) {
  const c = catBySlug[slug];
  if (!c) return;
  const list = BUSINESSES.filter((b) => b.cats.includes(slug));
  const title = $("#cat-title");
  const kreol = $("#cat-kreol");
  const count = $("#cat-count");
  const rows = $("#cat-rows");
  const note = $("#cat-filter-note");
  const empty = $("#cat-empty");
  const productGrid = $("#cat-products");
  const frame = $("#f-c-category");

  if (title) title.textContent = c.en;
  if (kreol)
    kreol.textContent = `${c.kreol} · ${list.length} shop${list.length === 1 ? "" : "s"}`;
  if (count) count.textContent = `All ${list.length}`;
  if (rows) rows.innerHTML = list.map(bizCard).join("");
  const items = CATEGORY_PRODUCTS[slug] || [];
  if (productGrid)
    productGrid.innerHTML = items.length
      ? `<div class="section-label mt12">Popular in ${c.en}</div><div class="grid2">${items.map(catProductCard).join("")}</div>`
      : "";
  if (note)
    note.innerHTML = `<svg class="i sm"><use href="#i-filter" /></svg> Filtered by category: ${c.en} · Rose Hill + 10 km`;
  if (empty)
    empty.textContent = list.length
      ? `${list.length} shops · ${items.length} products in this category.`
      : "No shops in this category yet.";
  if (frame) frame.dataset.title = `C02 · Category · ${c.en}`;
  if (jump) gotoFrame("f-c-category");
}

document.addEventListener("click", (event) => {
  const cat = event.target.closest("[data-cat]");
  if (cat) {
    event.preventDefault();
    event.stopPropagation();
    showCategory(cat.dataset.cat);
    return;
  }
  const go = event.target.closest("[data-goto]");
  if (go) {
    event.preventDefault();
    event.stopPropagation();
    gotoFrame(go.dataset.goto);
  }
});

/* --------------------------------------------------------------- app shell */

const PAGE_ORDER = [
  "overview",
  "customer",
  "seller",
  "resale",
  "delivery",
  "admin",
  "ai",
  "live",
  "roadmap",
];
let currentTitle = null;
let scenePlayed = false;

function switchPage(name, { scroll = true } = {}) {
  $$(".page").forEach((p) =>
    p.classList.toggle("active", p.id === `page-${name}`),
  );
  $$(".page-tab").forEach((t) => {
    const on = t.dataset.page === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", String(on));
  });
  buildFrameList();
  if (scroll) $("#canvas").scrollTo({ top: 0, behavior: "smooth" });
  if (name === "overview") requestAnimationFrame(drawMap);
  if (name === "ai" && !scenePlayed) {
    scenePlayed = true;
    setTimeout(playScene, 150);
  }
}

$$(".page-tab").forEach((tab) =>
  tab.addEventListener("click", () => switchPage(tab.dataset.page)),
);

function buildFrameList() {
  const list = $("#frame-list");
  const active = $(".page.active");
  if (!list || !active) return;
  const frames = $$("[data-frame]", active);
  list.innerHTML = "";
  frames.forEach((frame) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    if (frame.dataset.title === currentTitle) btn.classList.add("active");
    btn.innerHTML = `<span class="fl-dot"></span><span>${frame.dataset.title}</span><span class="fl-kind">${frame.dataset.kind.split(" ")[0]}</span>`;
    btn.addEventListener("click", () => {
      frame.scrollIntoView({ behavior: "smooth", block: "center" });
      flash(frame);
      setInspector(frame);
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
  const count = $("#frame-count");
  if (count) count.textContent = String(frames.length);
}

function flash(frame) {
  frame.classList.add("flash");
  setTimeout(() => frame.classList.remove("flash"), 1200);
}

const PURPOSES = {
  "f-c-home":
    "One entry point: categories, near-you shops and explainable suggestions.",
  "f-c-category":
    "Real category filtering: Handicrafts shows only handicraft shops.",
  "f-c-search":
    "Search across shops and products with a visible smart-search note.",
  "f-c-shop": "The storefront a seller shares on WhatsApp and Facebook.",
  "f-c-product":
    "Product detail with quantity, delivery promise and shop trust.",
  "f-c-cart": "Transparent totals before checkout. No surprise fees.",
  "f-c-checkout": "Guest-friendly, Juice or cash on delivery, two steps only.",
  "f-c-confirm":
    "Order placed with a trackable number and WhatsApp confirmation.",
  "f-c-orders": "Active and past orders in one place.",
  "f-c-track": "Status timeline the customer can trust.",
  "f-c-foryou":
    "AI suggestions with a visible reason and editable preferences.",
  "f-c-saved": "Saved shops and products for the next visit.",
  "f-s-dashboard": "Morning brief: tasks first, then numbers, then AI drafts.",
  "f-s-orders": "Mobile fulfilment: confirm, prepare, invoice.",
  "f-s-order": "Order detail with the 30-minute confirmation promise.",
  "f-s-products":
    "Catalogue management with draft, active and low-stock states.",
  "f-s-editor":
    "Photo to listing: AI fills fields, the owner reviews before publishing.",
  "f-s-inventory": "Stock value, low stock and an AI forecast.",
  "f-s-finance":
    "Revenue, profit and a balance sheet computed from real orders.",
  "f-s-analytics": "What sells, when, and which customers to keep.",
  "f-s-invoices": "Numbered invoices, draft to sent, stored as PDF.",
  "f-s-customers": "Repeat buyers, spend and win-back suggestions.",
  "f-s-settings": "Shop profile, hours, fees and AI permissions.",
  "f-s-payouts": "Gross sales, fees, net payout and statements.",
  "f-r-sell":
    "Two paths: business catalogue vs personal resale. Clear from the first tap.",
  "f-r-verify": "ID, selfie and phone. One-time, private, human-checked.",
  "f-r-rules": "What can be sold, what cannot, and how to photograph it.",
  "f-r-create": "AI helps with the title and price range; the seller decides.",
  "f-r-preview": "The first listing is a draft until a human reviews it.",
  "f-r-listings": "Active, pending and sold, with safety reminders.",
  "f-r-buyer": "Second-hand detail with a verified seller and meet-safe rules.",
  "f-d-options": "Shop delivery, Grabbit, or pickup. One clear price.",
  "f-d-partners": "Only verified delivery companies are bookable.",
  "f-d-tracking": "Courier, OTP, live status and payment state.",
  "f-d-trackpage":
    "The public link pattern: delivery.grabbit-express.com/track/{delivery}/{code}.",
  "f-d-console":
    "Grabbit's side: jobs, EV fleet, riders, coverage, COD and earnings.",
  "f-a-queue": "Three supply types, one queue, different proof bars.",
  "f-a-person": "Individual review: identity, selfie and first listing.",
  "f-a-courier": "Delivery review: registration, insurance, fleet and API.",
  "f-a-escrow":
    "Pre-loved SafePay disputes: release, refund or escalate with evidence and audit.",
  "f-ai-invoice":
    "Playable artefact: order to approved invoice, with a human gate.",
};

function setInspector(frame) {
  currentTitle = frame.dataset.title;
  const title = $("#insp-title");
  const kind = $("#insp-kind");
  const purpose = $("#insp-purpose");
  if (title) title.textContent = frame.dataset.title;
  if (kind) kind.textContent = `${frame.dataset.kind} · 100%`;
  if (purpose) purpose.textContent = PURPOSES[frame.id] || "Flow frame.";
  $$(".frame-list button").forEach((b) =>
    b.classList.toggle("active", b.textContent.includes(frame.dataset.title)),
  );
}

function gotoFrame(id) {
  if (!id) return;
  if (id.startsWith("page-")) return switchPage(id.slice(5));
  const target = document.getElementById(id);
  if (!target) return;
  const page = target.closest(".page");
  if (page && !page.classList.contains("active"))
    switchPage(page.id.slice(5), { scroll: false });
  setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    flash(target);
    setInspector(target);
  }, 60);
}

/* -------------------------------------------------------------- frame zoom */

const overlay = $("#overlay");
const overlayStage = $("#overlay-stage");

function openFrame(frame) {
  const el = frame.querySelector(".device, .scene");
  if (!el) return;
  currentTitle = frame.dataset.title;
  setInspector(frame);
  overlayStage.innerHTML = "";
  const clone = el.cloneNode(true);
  clone.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
  overlayStage.appendChild(clone);
  $("#overlay-title").textContent = frame.dataset.title;
  $("#overlay-kind").textContent = frame.dataset.kind;
  overlay.classList.add("open");
  requestAnimationFrame(scaleOverlay);
}

function scaleOverlay() {
  const el = overlayStage.firstElementChild;
  if (!el) return;
  el.style.transform = "none";
  const available = overlayStage.clientWidth - 48;
  const scale = Math.min(1, available / el.offsetWidth);
  el.style.transform = `scale(${scale})`;
  el.style.marginBottom = `${Math.min(0, el.offsetHeight * (scale - 1))}px`;
}

$$("[data-frame]").forEach((frame) => {
  frame.addEventListener("click", (event) => {
    if (
      event.target.closest("[data-goto], [data-cat], button, a, input, select")
    )
      return;
    openFrame(frame);
  });
});

$("#overlay-close").addEventListener("click", () =>
  overlay.classList.remove("open"),
);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) overlay.classList.remove("open");
});

/* --------------------------------------------------------------- IA map */

const MAP_LINKS = [
  ["home", "categories"],
  ["home", "search"],
  ["categories", "category"],
  ["category", "shop"],
  ["shop", "product"],
  ["product", "cart"],
  ["cart", "checkout"],
  ["checkout", "order"],
  ["order", "account"],
  ["dashboard", "shop"],
  ["resale", "product"],
  ["delivery", "checkout"],
  ["admin", "dashboard"],
  ["admin", "resale"],
  ["admin", "delivery"],
  ["ai", "dashboard", "dashed"],
];

function drawMap() {
  const map = $("#ia-map");
  const svg = $("#map-links");
  if (!map || !svg || !map.offsetParent) return;
  const rect = map.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

  const paths = MAP_LINKS.map(([fromId, toId, style]) => {
    const from = map.querySelector(`[data-node="${fromId}"]`);
    const to = map.querySelector(`[data-node="${toId}"]`);
    if (!from || !to) return "";
    const sameCol =
      Math.abs(
        from.getBoundingClientRect().left - to.getBoundingClientRect().left,
      ) < 4;
    let d;
    if (sameCol) {
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x = a.left - rect.left + a.width / 2;
      const y1 = a.bottom - rect.top;
      const y2 = b.top - rect.top;
      const dir = y2 >= y1 ? 1 : -1;
      const gap = Math.max(16, Math.abs(y2 - y1) * 0.4);
      d = `M ${x} ${y1} C ${x} ${y1 + gap * dir}, ${x} ${y2 - gap * dir}, ${x} ${y2}`;
    } else {
      const toRight =
        to.getBoundingClientRect().left > from.getBoundingClientRect().left;
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x1 = (toRight ? a.right : a.left) - rect.left;
      const y1 = a.top - rect.top + a.height / 2;
      const x2 = (toRight ? b.left : b.right) - rect.left;
      const y2 = b.top - rect.top + b.height / 2;
      const dx = Math.max(24, Math.abs(x2 - x1) * 0.45) * (toRight ? 1 : -1);
      d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    }
    const dashed = style === "dashed";
    return `<path d="${d}" fill="none" stroke="${dashed ? "#f05a3c" : "#b8c6cb"}" stroke-width="1.4" ${dashed ? 'stroke-dasharray="4 4"' : ""} marker-end="url(#map-arrow${dashed ? "-coral" : ""})" opacity="${dashed ? 0.7 : 0.9}" />`;
  }).join("");

  svg.innerHTML = `<defs><marker id="map-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#b8c6cb" /></marker><marker id="map-arrow-coral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f05a3c" /></marker></defs>${paths}`;
}

$$("[data-node]").forEach((node) => {
  node.addEventListener("click", () => {
    const map = {
      home: "f-c-home",
      categories: "f-c-category",
      search: "f-c-search",
      category: "f-c-category",
      shop: "f-c-shop",
      product: "f-c-product",
      cart: "f-c-cart",
      checkout: "f-c-checkout",
      order: "f-c-track",
      account: "f-c-orders",
      dashboard: "f-s-dashboard",
      resale: "f-r-sell",
      delivery: "f-d-partners",
      admin: "f-a-queue",
      ai: "f-ai-invoice",
    };
    gotoFrame(map[node.dataset.node]);
  });
});

/* ---------------------------------------------------------- invoice motion */

let sceneTimers = [];
const SCENE_STATUS = [
  [0, "Reading order"],
  [450, "Matching catalogue"],
  [900, "Calculating totals"],
  [1300, "Drafting invoice"],
  [1750, "Ready for approval"],
  [2200, "Approved"],
];

function playScene() {
  const scene = $("#invoice-scene");
  const status = $("#scene-status");
  if (!scene) return;
  sceneTimers.forEach(clearTimeout);
  sceneTimers = [];
  scene.classList.remove("play");
  void scene.offsetWidth;
  scene.classList.add("play");
  if (status) status.textContent = "Reading order";
  SCENE_STATUS.forEach(([at, label]) => {
    sceneTimers.push(
      setTimeout(() => {
        if (status) status.textContent = label;
      }, at),
    );
  });
}

const replay = $("#replay");
if (replay) replay.addEventListener("click", playScene);

/* ------------------------------------------------------------- live demo */

const liveC = { step: "home", shop: "atelier-volan", cat: "crafts", cart: [] };
const liveS = { step: "orders", order: "GM-0039" };
let cSteps = 0;
let sSteps = 0;

function log(side, message) {
  const el = $(`#live-${side}-log`);
  if (!el) return;
  const n = side === "customer" ? ++cSteps : ++sSteps;
  el.insertAdjacentHTML(
    "afterbegin",
    `<div><span>${String(n).padStart(2, "0")}</span>${message}</div>`,
  );
}

function liveProductRow(p, shopSlug) {
  const photo = photoFor(p);
  const media = photo
    ? `<img class="ph-img" src="assets/photos/${photo}.jpg" alt="" loading="lazy">`
    : "";
  return `<div class="live-prod"><div class="ph ${p.ph} xs${photo ? " has-photo" : ""}">${media}<span></span></div><div class="grow"><b class="tiny">${p.name}</b><small class="muted">Rs ${p.price} · ${p.note}</small></div><button class="btn primary sm" data-lc="add:${shopSlug}:${p.slug}">Add</button></div>`;
}

function renderLiveCustomer() {
  const el = $("#live-customer");
  if (!el) return;
  const cartCount = liveC.cart.reduce((n, i) => n + i.qty, 0);
  const total = liveC.cart.reduce((n, i) => n + i.price * i.qty, 0);

  if (liveC.step === "home") {
    el.innerHTML = `<div class="live-pad"><div class="row between"><span class="loc"><svg class="i sm"><use href="#i-pin" /></svg> Rose Hill</span><span class="tiny muted">live demo</span></div><h3 class="display sm mt10">Shop local.</h3><p class="muted tiny">Tap a category. Only that category appears.</p><div class="searchbar mt10"><svg class="i"><use href="#i-search" /></svg><span>Search shops</span></div><div class="section-label mt12">Categories</div><div class="cat-grid sm">${CATEGORIES.map((c) => `<button class="cat-tile" data-lc="cat:${c.slug}"><span class="cat-ico t-${c.color}"><svg class="i"><use href="#${c.icon}" /></svg></span><b>${c.en}</b><small>${c.kreol}</small></button>`).join("")}</div><div class="section-label mt12">Near you</div>${BUSINESSES.slice(
      0,
      3,
    )
      .map(
        (b) =>
          `<button class="biz-card" data-lc="shop:${b.slug}"><div class="avatar ${b.av}">${b.logo}</div><div class="grow"><div class="row g4"><b>${b.name}</b><svg class="i xs verified"><use href="#i-shield" /></svg></div><small class="muted">${b.tag} · ${b.distance}</small></div><svg class="i chev"><use href="#i-chev-right" /></svg></button>`,
      )
      .join("")}</div>`;
  }

  if (liveC.step === "category") {
    const c = catBySlug[liveC.cat] || catBySlug.crafts;
    const list = BUSINESSES.filter((b) => b.cats.includes(c.slug));
    el.innerHTML = `<div class="live-pad"><div class="row g6"><button class="icon-btn" data-lc="home"><svg class="i"><use href="#i-arrow-left" /></svg></button><b>${c.en}</b></div><p class="muted tiny mt8">${c.kreol} · ${list.length} shop${list.length === 1 ? "" : "s"}</p><div class="filter-note mt8"><svg class="i sm"><use href="#i-filter" /></svg> Only ${c.en.toLowerCase()} shops</div>${list.map((b) => `<button class="biz-card" data-lc="shop:${b.slug}"><div class="avatar ${b.av}">${b.logo}</div><div class="grow"><div class="row g4"><b>${b.name}</b>${b.verified ? '<svg class="i xs verified"><use href="#i-shield" /></svg>' : ""}</div><small class="muted">${b.tag} · ${b.district}</small><small class="muted">★ ${b.rating} · ${b.distance}</small></div><svg class="i chev"><use href="#i-chev-right" /></svg></button>`).join("")}${list.length === 0 ? '<div class="empty-hint">No shops in this category yet.</div>' : ""}<button class="btn ghost sm mt10" data-lc="home">Back to all categories</button></div>`;
  }

  if (liveC.step === "shop") {
    const b = bySlug[liveC.shop];
    const products = productsFor(liveC.shop);
    el.innerHTML = `<div class="live-pad"><div class="row g6"><button class="icon-btn" data-lc="category"><svg class="i"><use href="#i-arrow-left" /></svg></button><b>${b.name}</b><span class="grow"></span><span class="tiny muted">${b.distance}</span></div><p class="muted tiny mt6">${b.tag} · ${b.district} · ★ ${b.rating}</p><div class="mt10">${products.map((p) => liveProductRow(p, liveC.shop)).join("")}</div>${cartCount ? `<button class="btn cta mt10" data-lc="cart">View cart · ${cartCount} item${cartCount === 1 ? "" : "s"} · Rs ${total}</button>` : '<p class="tiny muted mt10">Add something to see the cart.</p>'}</div>`;
  }

  if (liveC.step === "cart") {
    el.innerHTML = `<div class="live-pad"><div class="row g6"><button class="icon-btn" data-lc="shop"><svg class="i"><use href="#i-arrow-left" /></svg></button><b>Cart</b></div>${liveC.cart.map((i) => `<div class="cart-line"><div class="ph ${i.ph} sm"><span></span></div><div class="grow"><b class="tiny">${i.name}</b><small class="muted">Rs ${i.price} × ${i.qty}</small></div><b class="mono">Rs ${i.price * i.qty}</b></div>`).join("")}<div class="totals mt10"><div><span>Subtotal</span><b>Rs ${total}</b></div><div><span>Delivery</span><b>Rs 50</b></div><div class="grand"><span>Total</span><b>Rs ${total + 50}</b></div></div><button class="btn cta mt10" data-lc="place">Pay with Juice</button><p class="tiny muted mt8">No account needed. Confirmation on WhatsApp.</p></div>`;
  }

  if (liveC.step === "done") {
    const t = liveC.cart.reduce((n, i) => n + i.price * i.qty, 0) + 50;
    el.innerHTML = `<div class="live-pad center-col"><div class="success-orb"><svg class="i"><use href="#i-check" /></svg></div><h3 class="h2 mt10">Order placed</h3><p class="muted tiny">GM-${1042 + cSteps} · Rs ${t}</p><div class="order-ticket mt10"><div class="row between"><span class="tiny muted">Shop</span><b class="tiny">${bySlug[liveC.shop].name}</b></div><div class="row between mt4"><span class="tiny muted">Payment</span><b class="tiny">Juice</b></div><div class="row between mt4"><span class="tiny muted">Status</span><span class="status new">New</span></div></div><button class="btn primary mt10" data-lc="reset">Start again</button></div>`;
  }
}

function renderLiveSeller() {
  const el = $("#live-seller");
  if (!el) return;

  if (liveS.step === "orders") {
    el.innerHTML = `<div class="live-pad"><div class="row between"><b>Orders</b><span class="tiny muted">today</span></div><p class="muted tiny mt4">Tap the delivered order to invoice it.</p><button class="order-card mt10" data-ls="order:GM-0042"><div class="row between"><b>GM-0042</b><span class="status new">New</span></div><small class="muted">Sherif S. · Rs 450</small><div class="row g6 mt8"><span class="btn primary sm grow">Confirm</span></div></button><button class="order-card" data-ls="order:GM-0039"><div class="row between"><b>GM-0039</b><span class="status done">Delivered</span></div><small class="muted">Ana P. · Rs 720</small><div class="row g6 mt8"><span class="btn ai sm">Generate invoice</span></div></button></div>`;
  }

  if (liveS.step === "order") {
    el.innerHTML = `<div class="live-pad"><div class="row g6"><button class="icon-btn" data-ls="orders"><svg class="i"><use href="#i-arrow-left" /></svg></button><b>GM-0039</b><span class="status done">Delivered</span></div><div class="detail-block mt10"><small class="muted">Customer</small><b class="tiny">Ana P.</b><p class="tiny muted">Rose Hill · cash paid</p></div><div class="detail-block"><small class="muted">Items</small><div class="order-lines"><div><span>3×</span> Gato coco <b>Rs 660</b></div><div><span>1×</span> Samosa <b>Rs 150</b></div><div><span>1×</span> Delivery <b>Rs 50</b></div></div><div class="row between mt6"><b class="tiny">Total</b><b class="price sm">Rs 860</b></div></div><button class="btn ai mt10" data-ls="invoice"><svg class="i sm"><use href="#i-sparkles" /></svg>Generate invoice with AI</button><p class="tiny muted mt8">Draft only. Nothing is sent until you approve.</p></div>`;
  }

  if (liveS.step === "invoice") {
    el.innerHTML = `<div class="live-pad"><div class="row g6"><button class="icon-btn" data-ls="order"><svg class="i"><use href="#i-arrow-left" /></svg></button><b>Invoice draft</b><span class="tag yellow">Review</span></div><div class="mini-invoice mt10"><div class="row between"><b class="tiny">Gato Marie</b><span class="tiny muted">INV-GM-0039</span></div><div class="inv-lines mt6"><div class="inv-line"><span>Gato coco × 3</span><b>Rs 660</b></div><div class="inv-line"><span>Samosa × 1</span><b>Rs 150</b></div><div class="inv-line"><span>Delivery</span><b>Rs 50</b></div></div><div class="inv-total"><span>Total</span><b>Rs 860</b></div></div><div class="note-card mt10"><svg class="i"><use href="#i-shield" /></svg><div><b>Totals checked in SQL</b><p class="tiny muted">The model drafted the text. It did not calculate the money.</p></div></div><button class="btn primary mt10" data-ls="approve">Approve &amp; send</button></div>`;
  }

  if (liveS.step === "approved") {
    el.innerHTML = `<div class="live-pad center-col"><div class="success-orb"><svg class="i"><use href="#i-check" /></svg></div><h3 class="h2 mt10">Invoice approved</h3><p class="muted tiny">INV-GM-0039 · Rs 860 · sent on WhatsApp</p><div class="order-ticket mt10"><div class="row between"><span class="tiny muted">PDF</span><b class="tiny">stored</b></div><div class="row between mt4"><span class="tiny muted">Status</span><span class="status ok">Sent</span></div><div class="row between mt4"><span class="tiny muted">Logged</span><b class="tiny">audit_log</b></div></div><button class="btn ghost mt10" data-ls="orders">Back to orders</button></div>`;
  }
}

document.addEventListener("click", (event) => {
  const c = event.target.closest("[data-lc]");
  if (c) {
    event.preventDefault();
    event.stopPropagation();
    const [action, a, b] = c.dataset.lc.split(":");
    if (action === "home") {
      liveC.step = "home";
      log("customer", "Went home");
    }
    if (action === "category") {
      liveC.step = "category";
      log("customer", `Browsing ${catBySlug[liveC.cat]?.en || "categories"}`);
    }
    if (action === "cat") {
      liveC.cat = a;
      liveC.step = "category";
      log("customer", `Filtered to ${catBySlug[a].en}`);
    }
    if (action === "shop") {
      if (a) liveC.shop = a;
      liveC.step = "shop";
      log("customer", `Opened ${bySlug[liveC.shop].name}`);
    }
    if (action === "add") {
      const p = productsFor(a).find((x) => x.slug === b);
      const existing = liveC.cart.find((i) => i.slug === p.slug);
      if (existing) existing.qty += 1;
      else liveC.cart.push({ ...p, qty: 1 });
      log("customer", `Added ${p.name} from ${bySlug[a].name}`);
    }
    if (action === "cart") {
      liveC.step = "cart";
      log(
        "customer",
        `Cart · ${liveC.cart.reduce((n, i) => n + i.qty, 0)} items`,
      );
    }
    if (action === "place") {
      liveC.step = "done";
      log("customer", "Paid with Juice");
    }
    if (action === "reset") {
      liveC.step = "home";
      liveC.cart = [];
      log("customer", "Reset demo");
    }
    renderLiveCustomer();
    return;
  }

  const s = event.target.closest("[data-ls]");
  if (s) {
    event.preventDefault();
    event.stopPropagation();
    const [action, a] = s.dataset.ls.split(":");
    if (action === "orders") {
      liveS.step = "orders";
      log("seller", "Back to orders");
    }
    if (action === "order") {
      liveS.order = a;
      liveS.step = "order";
      log("seller", `Opened ${a}`);
    }
    if (action === "invoice") {
      liveS.step = "invoice";
      log("seller", "AI drafted invoice");
    }
    if (action === "approve") {
      liveS.step = "approved";
      log("seller", "Approved and sent invoice");
    }
    renderLiveSeller();
  }
});

$$("[data-live-reset]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.liveReset === "customer") {
      liveC.step = "home";
      liveC.cart = [];
      cSteps = 0;
      $("#live-customer-log").innerHTML = "";
    } else {
      liveS.step = "orders";
      sSteps = 0;
      $("#live-seller-log").innerHTML = "";
    }
    renderLiveCustomer();
    renderLiveSeller();
  });
});

/* ------------------------------------------------------------- keyboard etc. */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    overlay.classList.remove("open");
    document.body.classList.remove("present");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    return;
  }
  const active = $(".page.active");
  if (!active) return;
  const index = PAGE_ORDER.indexOf(active.id.slice(5));
  if (event.key === "ArrowRight" && index < PAGE_ORDER.length - 1)
    switchPage(PAGE_ORDER[index + 1]);
  if (event.key === "ArrowLeft" && index > 0) switchPage(PAGE_ORDER[index - 1]);
});

$("#present").addEventListener("click", async () => {
  const on = document.body.classList.toggle("present");
  if (on) {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* class still works */
    }
  } else if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) document.body.classList.remove("present");
});

window.addEventListener("resize", () => {
  drawMap();
  if (overlay.classList.contains("open")) scaleOverlay();
});

/* ------------------------------------------------------------------- init */

renderAll();
showCategory("crafts", { jump: false });
renderLiveCustomer();
renderLiveSeller();
buildFrameList();
drawMap();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawMap);
setTimeout(drawMap, 300);
