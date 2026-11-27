export const deliveryJobs = [
  {
    id: "BZ-1042",
    pickup: "Gato Marie",
    pickupArea: "Rose Hill",
    drop: "Sherif S.",
    dropArea: "Rose Hill",
    cod: 475,
    status: "Picked up",
  },
  {
    id: "BZ-1041",
    pickup: "Ti Achard",
    pickupArea: "Beau Bassin",
    drop: "Nadia R.",
    dropArea: "Quatre Bornes",
    cod: 300,
    status: "Open",
  },
  {
    id: "BZ-1040",
    pickup: "Atelier Volan",
    pickupArea: "Curepipe",
    drop: "Kev M.",
    dropArea: "Moka",
    cod: 850,
    status: "Assigned",
  },
  {
    id: "BZ-1039",
    pickup: "Gato Marie",
    pickupArea: "Rose Hill",
    drop: "Ana P.",
    dropArea: "Rose Hill",
    cod: 720,
    status: "Delivered",
  },
];

export const deliveryPartners = [
  {
    name: "Grabbit Express",
    verified: true,
    coverage: "Island-wide",
    note: "100% electric · 2 h average · insured up to Rs 5,000",
    rating: 4.8,
    jobs: 1240,
    price: 75,
    status: "Verified" as const,
  },
  {
    name: "Island Courier",
    verified: true,
    coverage: "Port Louis + Plaines Wilhems",
    note: "Same day · insured",
    rating: 4.6,
    jobs: 320,
    price: 90,
    status: "Verified" as const,
  },
  {
    name: "Fast Lane",
    verified: false,
    coverage: "Pending",
    note: "Waiting for insurance and driver checks. Not bookable yet.",
    rating: 0,
    jobs: 0,
    price: 0,
    status: "Pending" as const,
  },
];

export const tracking = {
  id: "DEL_2026_119",
  code: "NAJS4SYF",
  partner: "Grabbit Express",
  errand: "1× Crunch Burger Box from KFC Mahogany",
  fee: 100,
  status: "Preparing your delivery",
  message:
    "Grabbit Express is preparing your order and will assign a rider from their fleet shortly.",
  driver: null,
};

export const fleet = {
  ridersOnline: 7,
  fleetSize: 12,
  battery: 78,
  codToRemit: 12400,
  earnings: 8100,
  onTime: 96,
};
