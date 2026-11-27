const fs = require("fs");
const path = "src/lib/catalog/data.ts";
let s = fs.readFileSync(path, "utf8");

const productPhotos = {
  "Gato patate": "gato-patate",
  "Gato coco": "gato-coco",
  "Samosa (10)": "samosa-hand",
  "Fresh bread": "bread-loaf",
  "Tarte banane": "cake-table",
  "Chocolate cake": "cake-slice",
  "Mine bouille": "mine-bouille",
  Biryani: "biryani",
  "Dholl puri": "dholl-puri",
  "Chicken curry": "curry",
  Rougaille: "rougaille",
  "Fried rice": "fried-rice",
  "Tomatoes 1 kg": "market-veg",
  "Bredes 1 kg": "market-eggplant",
  "Bananas 1 kg": "bananas",
  "Carrots 1 kg": "carrots",
  Pineapple: "pineapple",
  "Salad pack": "market-veg",
  "Rice 5 kg": "pantry",
  "Cooking oil 1 L": "pantry2",
  "Flour 2 kg": "pantry",
  "Sugar 1 kg": "pantry2",
  "Tea pack": "pantry",
  "Soap pack": "soap",
  "Achard légumes": "pickles",
  "Piment confit": "pickles2",
  Chatini: "pickles",
  Zasar: "pickles2",
  "Pickled onion": "pickles",
  "Lime pickle": "pickles2",
  Alouda: "juice2",
  "Passion juice": "juice",
  "Orange juice": "juice",
  "Sugarcane juice": "juice2",
  "Coconut water": "juice2",
  Smoothie: "juice",
  "Custom dress": "fabric",
  Alteration: "sewing",
  "Linen shirt": "fabric2",
  "Kids outfit": "baby",
  "Tote bag": "basket",
  Headwrap: "fabric2",
  "Coconut soap": "soap",
  "Hair oil": "pantry2",
  "Body scrub": "soap2",
  "Shea cream": "soap",
  "Lip balm": "soap2",
  "Gift set": "soap",
  "Raffia market bag": "basket",
  "Woven sun hat": "hat2",
  "Shell earrings": "earrings",
  "Wooden bowl": "basket2",
  "Coconut candle": "coconut-candle",
  "Table runner": "fabric",
  "Potted plant": "plant",
  "Woven pot": "basket",
  "Cushion cover": "fabric",
  "Table lamp": "living2",
  "Wall art": "handicraft",
  Planter: "plant2",
  "Cotton onesie": "baby",
  "Soft toy": "baby2",
  "Baby blanket": "baby",
  "Kids tee": "baby2",
  "Story book": "desk",
  "Baby shoes": "baby2",
  "Seasonal bouquet": "flowers",
  Roses: "flowers2",
  "Gift box": "flowers",
  "Orchid pot": "plant",
  "Birthday bunch": "flowers2",
  "Dried flowers": "flowers",
};

let replaced = 0;
for (const [name, photo] of Object.entries(productPhotos)) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(\\[\\s*"${escaped}"\\s*,\\s*"[^"]+"\\s*,\\s*\\d+\\s*,\\s*"[^"]*"\\s*,\\s*)"[^"]+"(\\s*,\\s*"[^"]+"\\s*,?\\s*\\])`,
  );
  if (!re.test(s)) {
    console.log("no match", name);
    continue;
  }
  s = s.replace(re, `$1"${photo}"$2`);
  replaced += 1;
}

const covers = {
  "gato-marie": "bakery-cover",
  "ti-achard": "pickles",
  "chez-nadege": "curry",
  "fri-karan": "market-veg",
  "atelier-volan": "basket2",
  "lartizan-moris": "basket",
  "maison-tiss": "hat2",
  "belle-etoile": "tailoring",
  "zil-beauty": "soap2",
  "kado-kreol": "flowers",
  "bebe-doux": "baby",
  "lakaz-vert": "living",
  "juice-lili": "juice2",
  "gato-rose": "cake-table",
  "patisserie-lila": "cake-slice",
  "gato-kreol": "cake-table",
  "tifin-coal": "biryani",
  "mama-asha": "dholl-puri",
  "kot-kwizinn": "curry",
  "legim-fresh": "market-eggplant",
  "bazar-vert": "bananas",
  "fri-lontan": "carrots",
  "episri-cool": "pantry",
  "komisio-plus": "pantry2",
  "ti-marchand": "pantry",
  "achard-mama": "pickles2",
  "piman-lakaz": "pickles",
  "bwason-kreol": "juice2",
  "fresh-zil": "juice",
  "alouda-bar": "juice2",
  "atelier-linz": "sewing",
  "maison-couture": "fabric",
  "ti-kostim": "baby2",
  "labote-naturel": "soap",
  "savon-moris": "soap2",
  "beauty-lakaz": "soap",
  "plant-corner": "plant2",
  "lakaz-deco": "living2",
  "pot-terre": "living",
  "ti-zanfan": "baby2",
  "bebe-lakaz": "baby",
  "kado-bebe": "baby2",
  "fler-moris": "flowers2",
  "bouquet-lakaz": "flowers",
  "rose-zil": "plant",
};

for (const [slug, cover] of Object.entries(covers)) {
  const re = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?cover: )"[^"]+"`,
  );
  if (re.test(s)) {
    s = s.replace(re, `$1"${cover}"`);
    replaced += 1;
  }
}

fs.writeFileSync(path, s);
console.log("replacements", replaced);
