const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = "C:/Users/User/AppData/Local/Temp/opencode/candidates";
const items = [
  ["p-bananas", "https://images.pexels.com/photos/13968586/pexels-photo-13968586.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-carrots", "https://images.pexels.com/photos/37740957/pexels-photo-37740957.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-pineapple", "https://images.pexels.com/photos/4195527/pexels-photo-4195527.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-candle", "https://images.pexels.com/photos/15996759/pexels-photo-15996759.jpeg?auto=compress&cs=tinysrgb&w=1400"],
];

(async () => {
  for (const [name, url] of items) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(String(res.status));
      const buffer = Buffer.from(await res.arrayBuffer());
      await sharp(buffer)
        .rotate()
        .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 84 })
        .toFile(path.join(outDir, `${name}.jpg`));
      console.log("ok", name);
    } catch (error) {
      console.log("fail", name, String(error));
    }
  }
})();
