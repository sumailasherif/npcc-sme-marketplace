export type Condition = "Mint" | "Good" | "Fair";

export type Listing = {
  slug: string;
  title: string;
  price: number;
  condition: Condition;
  photo: string;
  seller: string;
  sellerRating: number;
  district: string;
  distance: string;
  battery: string;
  storage: string;
  posted: string;
  views: number;
  negotiable: boolean;
  description: string;
};

export const listings: Listing[] = [
  {
    slug: "iphone-11-64gb-good",
    title: "iPhone 11 64GB",
    price: 9500,
    condition: "Good",
    photo: "iphone-red",
    seller: "Ravi S.",
    sellerRating: 4.9,
    district: "Rose Hill",
    distance: "0.8 km",
    battery: "84%",
    storage: "64 GB",
    posted: "today",
    views: 42,
    negotiable: true,
    description:
      "Battery 84%. Unlocked. Small scratch on the back, screen is clean. Charger included. Bought in 2020, selling because I upgraded.",
  },
  {
    slug: "iphone-11-64gb-mint",
    title: "iPhone 11 64GB",
    price: 11200,
    condition: "Mint",
    photo: "iphone-red",
    seller: "Ravi S.",
    sellerRating: 4.9,
    district: "Rose Hill",
    distance: "0.8 km",
    battery: "94%",
    storage: "64 GB",
    posted: "today",
    views: 18,
    negotiable: false,
    description:
      "Mint condition, always in a case. Battery 94%. Unlocked. Box and charger included.",
  },
  {
    slug: "iphone-12-128gb-good",
    title: "iPhone 12 128GB",
    price: 14500,
    condition: "Good",
    photo: "iphone-black-studio",
    seller: "Nadia R.",
    sellerRating: 4.7,
    district: "Quatre Bornes",
    distance: "2.1 km",
    battery: "88%",
    storage: "128 GB",
    posted: "2 days ago",
    views: 31,
    negotiable: true,
    description:
      "Unlocked, 88% battery. Small scuff on the frame, screen is clean. No charger.",
  },
  {
    slug: "iphone-xr-64gb-fair",
    title: "iPhone XR 64GB",
    price: 7200,
    condition: "Fair",
    photo: "iphone-red",
    seller: "Kev M.",
    sellerRating: 4.6,
    district: "Vacoas",
    distance: "3.8 km",
    battery: "79%",
    storage: "64 GB",
    posted: "3 days ago",
    views: 27,
    negotiable: true,
    description:
      "Works well, visible wear on the corners, battery 79%. Good first phone or spare.",
  },
  {
    slug: "wooden-desk",
    title: "Wooden desk",
    price: 2400,
    condition: "Good",
    photo: "desk",
    seller: "Ana P.",
    sellerRating: 4.8,
    district: "Beau Bassin",
    distance: "2.0 km",
    battery: "—",
    storage: "120 × 60 cm",
    posted: "yesterday",
    views: 18,
    negotiable: true,
    description:
      "Solid wood desk, one small mark on the top. Easy to dismantle for transport.",
  },
  {
    slug: "kids-bicycle",
    title: "Kids bicycle",
    price: 1800,
    condition: "Good",
    photo: "bike",
    seller: "Kev M.",
    sellerRating: 4.6,
    district: "Vacoas",
    distance: "3.8 km",
    battery: "—",
    storage: "16 inch",
    posted: "2 days ago",
    views: 12,
    negotiable: false,
    description: "16-inch kids bicycle, brakes checked. Helmet included.",
  },
  {
    slug: "rattan-basket",
    title: "Rattan market basket",
    price: 950,
    condition: "Good",
    photo: "basket",
    seller: "Priya M.",
    sellerRating: 4.8,
    district: "Rose Hill",
    distance: "1.4 km",
    battery: "-",
    storage: "40 × 30 cm",
    posted: "today",
    views: 21,
    negotiable: true,
    description:
      "Strong rattan basket with leather handles. Used for market runs, no breaks. A little sun-faded on one side.",
  },
  {
    slug: "woven-sun-hat",
    title: "Woven sun hat",
    price: 450,
    condition: "Mint",
    photo: "hat2",
    seller: "Ana P.",
    sellerRating: 4.8,
    district: "Beau Bassin",
    distance: "2.0 km",
    battery: "-",
    storage: "56 cm",
    posted: "yesterday",
    views: 14,
    negotiable: false,
    description:
      "Handwoven straw hat with a wide brim. Worn twice, kept on a shelf. Too small for me.",
  },
  {
    slug: "gold-hoop-earrings",
    title: "Gold hoop earrings",
    price: 600,
    condition: "Mint",
    photo: "earrings",
    seller: "Nadia R.",
    sellerRating: 4.7,
    district: "Quatre Bornes",
    distance: "2.1 km",
    battery: "-",
    storage: "4 cm",
    posted: "2 days ago",
    views: 33,
    negotiable: true,
    description:
      "Lightweight gold-tone hoops, never worn. Bought for a wedding and changed my mind. Box included.",
  },
  {
    slug: "potted-monstera",
    title: "Potted monstera",
    price: 1400,
    condition: "Good",
    photo: "plant",
    seller: "Kev M.",
    sellerRating: 4.6,
    district: "Vacoas",
    distance: "3.8 km",
    battery: "-",
    storage: "70 cm",
    posted: "3 days ago",
    views: 19,
    negotiable: true,
    description:
      "Healthy monstera in a ceramic pot. Three new leaves this month. Pickup only — it is heavier than it looks.",
  },
];

export const dealMessages = [
  {
    from: "them" as const,
    text: "Hi! Yes, still available. Battery 84%, small scratch on the back.",
    time: "14:01",
  },
  {
    from: "me" as const,
    text: "Would you take Rs 8,500? I can meet in Rose Hill today.",
    time: "14:02",
  },
  { from: "voice" as const, text: "0:12", time: "14:03" },
  {
    from: "me" as const,
    text: "Great — sending the offer now.",
    time: "14:04",
  },
];

export const wallet = {
  available: 8500,
  held: 4250,
  released: 12400,
  rows: [
    { label: "iPhone 11 · Ravi S.", detail: "Released · 25 Nov", amount: 8500 },
    {
      label: "Wooden desk · Ana P.",
      detail: "Released · 21 Nov",
      amount: 2400,
    },
    {
      label: "Kids bicycle · Kev M.",
      detail: "In escrow · 24 Nov",
      amount: 1800,
    },
  ],
};

export function getListing(slug: string): Listing | undefined {
  return listings.find((listing) => listing.slug === slug);
}

/* ---- "My Pre-loved": one person's selling, buying and messages ---- */

export type MyListingStatus = "live" | "review" | "sold";

export const myListings: {
  slug: string;
  title: string;
  photo: string;
  price: number;
  status: MyListingStatus;
  views: number;
  offers: number;
  posted: string;
}[] = [
  {
    slug: "iphone-11-64gb-good",
    title: "iPhone 11 64GB",
    photo: "iphone-11",
    price: 9500,
    status: "live",
    views: 42,
    offers: 3,
    posted: "today",
  },
  {
    slug: "wooden-desk",
    title: "Wooden desk",
    photo: "wooden-desk",
    price: 2400,
    status: "live",
    views: 18,
    offers: 1,
    posted: "2 days ago",
  },
  {
    slug: "kids-bicycle",
    title: "Kids bicycle",
    photo: "bicycle",
    price: 1800,
    status: "review",
    views: 0,
    offers: 0,
    posted: "today",
  },
  {
    slug: "rattan-basket",
    title: "Rattan basket",
    photo: "basket",
    price: 600,
    status: "sold",
    views: 31,
    offers: 2,
    posted: "12 Nov",
  },
];

export type PurchaseState = "offer" | "held" | "done";

export const myPurchases: {
  slug: string;
  title: string;
  photo: string;
  seller: string;
  amount: number;
  state: PurchaseState;
  note: string;
}[] = [
  {
    slug: "iphone-12-128gb-good",
    title: "iPhone 12 128GB",
    photo: "iphone-black-studio",
    seller: "Anil R.",
    amount: 13500,
    state: "offer",
    note: "Your offer of Rs 13,500 · waiting for the seller",
  },
  {
    slug: "potted-monstera",
    title: "Potted monstera",
    photo: "plant",
    seller: "Lea M.",
    amount: 1200,
    state: "held",
    note: "Paid into SafePay · confirm when you have it",
  },
  {
    slug: "woven-sun-hat",
    title: "Woven sun hat",
    photo: "hat2",
    seller: "Nadia K.",
    amount: 350,
    state: "done",
    note: "Received 20 Nov · you left 5 stars",
  },
];

export const myThreads: {
  slug: string;
  name: string;
  item: string;
  last: string;
  time: string;
  unread: number;
}[] = [
  {
    slug: "iphone-11-64gb-good",
    name: "Kev M.",
    item: "iPhone 11 64GB",
    last: "Would you take Rs 8,500? I can meet in Rose Hill today.",
    time: "14:02",
    unread: 2,
  },
  {
    slug: "iphone-12-128gb-good",
    name: "Anil R.",
    item: "iPhone 12 128GB",
    last: "Let me think about it, I'll reply tonight.",
    time: "Yesterday",
    unread: 0,
  },
  {
    slug: "wooden-desk",
    name: "Ana P.",
    item: "Wooden desk",
    last: "Is it still available? Can I pick up Saturday?",
    time: "Mon",
    unread: 1,
  },
];
