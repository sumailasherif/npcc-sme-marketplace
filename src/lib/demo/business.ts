import { productsByShop } from "@/lib/catalog/queries";

export const business = {
  name: "Gato Marie",
  slug: "gato-marie",
  district: "Rose Hill",
  category: "Cakes & pastries",
  rating: 4.8,
  reviews: 212,
};

export type BusinessOrder = {
  id: string;
  customer: string;
  district: string;
  placedAt: string;
  items: number;
  total: number;
  status: "New" | "Preparing" | "Ready" | "Delivered";
  payment: "Juice" | "Cash";
};

export const orders: BusinessOrder[] = [
  {
    id: "GM-0042",
    customer: "Sherif S.",
    district: "Rose Hill",
    placedAt: "09:42",
    items: 2,
    total: 450,
    status: "New",
    payment: "Cash",
  },
  {
    id: "GM-0041",
    customer: "Nadia R.",
    district: "Quatre Bornes",
    placedAt: "09:15",
    items: 4,
    total: 980,
    status: "Preparing",
    payment: "Juice",
  },
  {
    id: "GM-0040",
    customer: "Kev M.",
    district: "Beau Bassin",
    placedAt: "08:40",
    items: 1,
    total: 250,
    status: "Ready",
    payment: "Cash",
  },
  {
    id: "GM-0039",
    customer: "Ana P.",
    district: "Rose Hill",
    placedAt: "Yesterday",
    items: 3,
    total: 720,
    status: "Delivered",
    payment: "Juice",
  },
  {
    id: "GM-0038",
    customer: "Priya M.",
    district: "Moka",
    placedAt: "Yesterday",
    items: 2,
    total: 470,
    status: "Delivered",
    payment: "Juice",
  },
];

const stock: Record<
  string,
  { stock: number; status: "Active" | "Low" | "Out" }
> = {
  "gato-patate-gato-marie": { stock: 18, status: "Active" },
  "gato-coco-gato-marie": { stock: 6, status: "Low" },
  "samosa-10-gato-marie": { stock: 4, status: "Low" },
  "fresh-bread-gato-marie": { stock: 0, status: "Out" },
};

export const productRows = productsByShop("gato-marie").map((p) => ({
  ...p,
  stock: stock[p.slug]?.stock ?? 12,
  status: stock[p.slug]?.status ?? "Active",
}));

export const kpis = [
  {
    label: "Revenue today",
    value: "Rs 8,450",
    note: "+18% vs yesterday",
    tone: "good" as const,
  },
  {
    label: "New orders",
    value: "3",
    note: "2 need confirmation",
    tone: "warn" as const,
  },
  {
    label: "Profit this month",
    value: "Rs 31,400",
    note: "32.6% margin",
    tone: "good" as const,
  },
  {
    label: "Low stock",
    value: "4",
    note: "samosa, gato coco",
    tone: "warn" as const,
  },
];

export const weekRevenue = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 35 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 96 },
  { day: "Sat", value: 64 },
  { day: "Sun", value: 38 },
];

export const topProducts = [
  { name: "Gato patate", sold: 68, revenue: 17000, share: 28 },
  { name: "Samosa (10)", sold: 54, revenue: 8100, share: 21 },
  { name: "Gato coco", sold: 41, revenue: 9020, share: 18 },
  { name: "Fresh bread", sold: 120, revenue: 3000, share: 9 },
];

export const invoices = [
  {
    no: "INV-GM-0042",
    customer: "Sherif S.",
    date: "25 Nov",
    total: 450,
    status: "Draft" as const,
  },
  {
    no: "INV-GM-0039",
    customer: "Ana P.",
    date: "24 Nov",
    total: 720,
    status: "Sent" as const,
  },
  {
    no: "INV-GM-0038",
    customer: "Priya M.",
    date: "23 Nov",
    total: 470,
    status: "Sent" as const,
  },
];

export const customers = [
  {
    name: "Nadia R.",
    orders: 9,
    spend: 4820,
    last: "Yesterday",
    tag: "VIP" as const,
  },
  {
    name: "Kev M.",
    orders: 6,
    spend: 2940,
    last: "3 weeks ago",
    tag: "Win back" as const,
  },
  {
    name: "Ana P.",
    orders: 4,
    spend: 1860,
    last: "Yesterday",
    tag: "Regular" as const,
  },
];

export const payouts = {
  available: 84000,
  gross: 96200,
  fee: 4810,
  delivery: 2400,
  net: 93790,
  recent: [
    {
      label: "Payout · 21 Nov",
      detail: "Bank transfer · MCB ••42",
      amount: 12400,
    },
    {
      label: "Payout · 14 Nov",
      detail: "Bank transfer · MCB ••42",
      amount: 9800,
    },
    { label: "Platform fee · Oct", detail: "5% of Rs 78,900", amount: -3945 },
  ],
};

export const finance = {
  revenue: 96200,
  cogs: 58700,
  profit: 31400,
  cash: 84000,
  stock: 12500,
  receivables: 3200,
  assets: 99700,
  liabilities: 9800,
  netWorth: 89900,
};
