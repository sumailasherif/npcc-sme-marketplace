export type VerificationCase = {
  id: string;
  name: string;
  detail: string;
  kind: "Business" | "Individual" | "Delivery";
  proof: string;
  submitted: string;
  risk: "Low" | "Medium" | "High";
  status: "Pending" | "In review" | "Approved" | "Rejected";
};

export const verificationCases: VerificationCase[] = [
  {
    id: "ravi-s",
    name: "Ravi S.",
    detail: "First listing · iPhone 11",
    kind: "Individual",
    proof: "ID ✓ Selfie ✓",
    submitted: "40 m ago",
    risk: "Low",
    status: "Pending",
  },
  {
    id: "gato-marie",
    name: "Gato Marie",
    detail: "Cakes · 12 products",
    kind: "Business",
    proof: "ID ✓ Address",
    submitted: "2 h ago",
    risk: "Low",
    status: "Pending",
  },
  {
    id: "grabbit",
    name: "Grabbit Express",
    detail: "Delivery · 12 drivers",
    kind: "Delivery",
    proof: "Reg ✓ Insurance ✓",
    submitted: "1 d ago",
    risk: "Medium",
    status: "In review",
  },
  {
    id: "fast-lane",
    name: "Fast Lane",
    detail: "Delivery · 3 drivers",
    kind: "Delivery",
    proof: "Insurance",
    submitted: "1 d ago",
    risk: "High",
    status: "In review",
  },
  {
    id: "maison-tiss",
    name: "Maison Tiss",
    detail: "Handicrafts · 5 products",
    kind: "Business",
    proof: "ID ✓",
    submitted: "2 d ago",
    risk: "Medium",
    status: "Pending",
  },
];

export const disputes = [
  {
    id: "PL-1042",
    buyer: "Sherif S.",
    seller: "Ravi S.",
    amount: 8500,
    reason: "Not as described",
    status: "Open",
  },
  {
    id: "PL-1038",
    buyer: "Nadia R.",
    seller: "Priya M.",
    amount: 2400,
    reason: "Damaged",
    status: "Replied",
  },
  {
    id: "PL-1031",
    buyer: "Ana P.",
    seller: "Kev M.",
    amount: 1800,
    reason: "Not delivered",
    status: "Escalated",
  },
  {
    id: "PL-1029",
    buyer: "Kev M.",
    seller: "Ana P.",
    amount: 950,
    reason: "No response 48h",
    status: "Auto-refund",
  },
];

export const trustKpis = [
  { label: "Businesses", value: "6", note: "oldest 2 days" },
  { label: "Individuals", value: "9", note: "ID queue" },
  { label: "Delivery", value: "2", note: "insurance check" },
  { label: "Median review", value: "6 h", note: "target < 24 h" },
];
