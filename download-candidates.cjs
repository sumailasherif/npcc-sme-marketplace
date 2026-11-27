const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = "C:/Users/User/AppData/Local/Temp/opencode/candidates";
fs.mkdirSync(outDir, { recursive: true });

const items = [
  // Mauritius documentary (Openverse / Flickr, commercial-friendly)
  ["m-market-eggplant", "https://live.staticflickr.com/2331/1812818177_21f51ac716_b.jpg"],
  ["m-market-mixed", "https://live.staticflickr.com/2013/1810685599_0bf153661c_b.jpg"],
  ["m-market-veg", "https://live.staticflickr.com/2094/1812817775_ccf3bb7409_b.jpg"],
  ["m-market-peppers", "https://live.staticflickr.com/2001/1813662846_342b41e3bc_b.jpg"],
  ["m-portlouis-street", "https://live.staticflickr.com/2102/2377033631_c3fd04c49e_b.jpg"],
  ["m-portlouis-market", "https://live.staticflickr.com/4091/5010847065_99e147887a_b.jpg"],
  ["m-portlouis-market2", "https://live.staticflickr.com/4152/5011451762_1bc38596cf_b.jpg"],
  ["m-textile-2", "https://live.staticflickr.com/3523/3212571366_61d83853ca_b.jpg"],
  ["m-textile-3", "https://live.staticflickr.com/3510/3212570568_69afb9625d_b.jpg"],
  ["m-handicraft", "https://live.staticflickr.com/1111/5105419452_841766961d_b.jpg"],
  ["m-men", "https://live.staticflickr.com/8656/15422988524_260322414d_b.jpg"],
  ["m-bakery-flatbread", "https://live.staticflickr.com/5308/5580430883_950a5e0bfe_b.jpg"],
  ["m-bakery-dosa", "https://live.staticflickr.com/4092/5189420981_f047ae2b05_b.jpg"],
  ["m-jackfruit", "https://live.staticflickr.com/7427/10141617146_3f00ba602a_b.jpg"],
  // Pexels
  ["p-samosa", "https://images.pexels.com/photos/36170557/pexels-photo-36170557.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-samosa-hand", "https://images.pexels.com/photos/37586244/pexels-photo-37586244.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-pickles", "https://images.pexels.com/photos/38857376/pexels-photo-38857376.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-pickles2", "https://images.pexels.com/photos/36901549/pexels-photo-36901549.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-soap", "https://images.pexels.com/photos/16244099/pexels-photo-16244099.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-soap2", "https://images.pexels.com/photos/31830892/pexels-photo-31830892.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-baby", "https://images.pexels.com/photos/3932934/pexels-photo-3932934.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-baby2", "https://images.pexels.com/photos/4858394/pexels-photo-4858394.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-flowers", "https://images.pexels.com/photos/31641384/pexels-photo-31641384.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-flowers2", "https://images.pexels.com/photos/40341977/pexels-photo-40341977.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-plant", "https://images.pexels.com/photos/36551643/pexels-photo-36551643.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-plant2", "https://images.pexels.com/photos/7663967/pexels-photo-7663967.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-desk", "https://images.pexels.com/photos/5393443/pexels-photo-5393443.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-desk2", "https://images.pexels.com/photos/30752777/pexels-photo-30752777.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-bike", "https://images.pexels.com/photos/33497179/pexels-photo-33497179.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-bike2", "https://images.pexels.com/photos/38539996/pexels-photo-38539996.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-iphone", "https://images.pexels.com/photos/6791447/pexels-photo-6791447.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-iphone2", "https://images.pexels.com/photos/19152408/pexels-photo-19152408.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-earrings", "https://images.pexels.com/photos/9726881/pexels-photo-9726881.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-earrings2", "https://images.pexels.com/photos/17368472/pexels-photo-17368472.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-sewing", "https://images.pexels.com/photos/5830695/pexels-photo-5830695.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-sewing2", "https://images.pexels.com/photos/30902518/pexels-photo-30902518.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-juice", "https://images.pexels.com/photos/8882541/pexels-photo-8882541.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-juice2", "https://images.pexels.com/photos/33173889/pexels-photo-33173889.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-cake", "https://images.pexels.com/photos/16168204/pexels-photo-16168204.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-cake2", "https://images.pexels.com/photos/28869015/pexels-photo-28869015.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-bread", "https://images.pexels.com/photos/38765135/pexels-photo-38765135.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-bread2", "https://images.pexels.com/photos/33972459/pexels-photo-33972459.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-curry", "https://images.pexels.com/photos/10464100/pexels-photo-10464100.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-curry2", "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-basket", "https://images.pexels.com/photos/38483283/pexels-photo-38483283.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-basket2", "https://images.pexels.com/photos/34667136/pexels-photo-34667136.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-hat", "https://images.pexels.com/photos/13200862/pexels-photo-13200862.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-hat2", "https://images.pexels.com/photos/17555299/pexels-photo-17555299.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-pantry", "https://images.pexels.com/photos/35059639/pexels-photo-35059639.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-pantry2", "https://images.pexels.com/photos/3735145/pexels-photo-3735145.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-fabric", "https://images.pexels.com/photos/34375574/pexels-photo-34375574.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-fabric2", "https://images.pexels.com/photos/34634858/pexels-photo-34634858.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-living", "https://images.pexels.com/photos/12454079/pexels-photo-12454079.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-living2", "https://images.pexels.com/photos/29944538/pexels-photo-29944538.jpeg?auto=compress&cs=tinysrgb&w=1400"],
];

(async () => {
  const downloaded = [];
  for (const [name, url] of items) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(String(res.status));
      const buffer = Buffer.from(await res.arrayBuffer());
      const file = path.join(outDir, `${name}.jpg`);
      await sharp(buffer)
        .rotate()
        .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toFile(file);
      downloaded.push({ name, file });
      console.log("ok", name);
    } catch (error) {
      console.log("fail", name, String(error));
    }
  }

  const cell = 260;
  const pad = 10;
  const label = 26;
  const cols = 5;
  const rows = Math.ceil(downloaded.length / cols);
  const width = cols * cell + (cols + 1) * pad;
  const height = rows * (cell + label) + (rows + 1) * pad;
  const composites = [];
  for (let i = 0; i < downloaded.length; i += 1) {
    const { name, file } = downloaded[i];
    const x = pad + (i % cols) * (cell + pad);
    const y = pad + Math.floor(i / cols) * (cell + label + pad);
    const buffer = await sharp(file)
      .resize(cell, cell, { fit: "cover", position: "centre" })
      .toBuffer();
    composites.push({ input: buffer, left: x, top: y });
    const svg = Buffer.from(
      `<svg width="${cell}" height="${label}"><rect width="100%" height="100%" fill="#fff"/><text x="5" y="19" font-family="Arial" font-size="13" fill="#111">${name}</text></svg>`,
    );
    composites.push({ input: svg, left: x, top: y + cell });
  }
  await sharp({
    create: { width, height, channels: 3, background: "#f2ede4" },
  })
    .composite(composites)
    .png()
    .toFile("C:/Users/User/AppData/Local/Temp/opencode/candidates-contact.png");
  console.log("sheet", width, height, downloaded.length);
})();
