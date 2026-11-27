const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const sourceDir = "C:/Users/User/AppData/Local/Temp/opencode/candidates";
const destDir = "public/photos";

const mapping = {
  "cat-home-cooking": "p-curry2",
  "cat-cakes": "p-cake",
  "cat-fruit-veg": "m-market-eggplant",
  "cat-groceries": "p-pantry",
  "cat-pickles": "p-pickles2",
  "cat-drinks": "p-juice",
  "cat-fashion": "m-textile-3",
  "cat-beauty": "p-soap",
  "cat-crafts": "p-basket2",
  "cat-home-living": "p-living2",
  "cat-kids": "p-baby2",
  "cat-flowers": "p-flowers2",
  "bakery-cover": "m-bakery-flatbread",
  achard: "p-pickles",
  "produce-cover": "m-market-veg",
  "raffia-bag": "p-basket2",
  "crafts-cover": "p-basket",
  "woven-hat": "p-hat2",
  alouda: "p-juice2",
  samosa: "p-samosa-hand",
  bread: "p-bread",
  "tarte-banane": "p-cake2",
  "chocolate-cake": "p-cake",
  piment: "p-pickles",
  earrings: "p-earrings",
  "iphone-11": "p-iphone",
  "iphone-black": "p-iphone3",
  "wooden-desk": "p-desk",
  bicycle: "p-bike",
  "hero-market": "m-portlouis-street",
  "hero-woman": "m-market-mixed",
  "hero-dough": "m-bakery-flatbread",
  "hero-sewing": "m-textile-3",
  "market-veg": "m-market-veg",
  "market-eggplant": "m-market-eggplant",
  "market-peppers": "m-market-peppers",
  "portlouis-street": "m-portlouis-street",
  textile: "m-textile-2",
  tailoring: "m-textile-3",
  flatbread: "m-bakery-flatbread",
  "dholl-puri": "m-bakery-dosa",
  jackfruit: "m-jackfruit",
  handicraft: "m-handicraft",
  men: "m-men",
  curry: "p-curry",
  rougaille: "p-curry2",
  biryani: "o-biryani",
  "fried-rice": "o-fried-rice",
  "mine-bouille": "p-noodle",
  pantry: "p-pantry",
  pantry2: "p-pantry2",
  pickles: "p-pickles",
  pickles2: "p-pickles2",
  juice: "p-juice",
  juice2: "p-juice2",
  soap: "p-soap",
  soap2: "p-soap2",
  baby: "p-baby",
  baby2: "p-baby2",
  flowers: "p-flowers",
  flowers2: "p-flowers2",
  plant: "p-plant",
  plant2: "p-plant2",
  desk: "p-desk",
  bike: "p-bike",
  "iphone-red": "p-iphone",
  "iphone-black-studio": "p-iphone3",
  earrings2: "p-earrings2",
  basket: "p-basket",
  basket2: "p-basket2",
  hat: "p-hat",
  hat2: "p-hat2",
  living: "p-living",
  living2: "p-living2",
  fabric: "p-fabric",
  fabric2: "p-fabric2",
  sewing: "p-sewing",
  sewing2: "p-sewing2",
  "samosa-hand": "p-samosa-hand",
  "cake-slice": "p-cake",
  "cake-table": "p-cake2",
  "bread-loaf": "p-bread",
  "curry-bowl": "p-curry",
};

(async () => {
  for (const [dest, source] of Object.entries(mapping)) {
    const src = path.join(sourceDir, `${source}.jpg`);
    if (!fs.existsSync(src)) {
      console.log("missing", source, "for", dest);
      continue;
    }
    await sharp(src)
      .rotate()
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(destDir, `${dest}.jpg`));
    console.log("wrote", dest);
  }
})();
