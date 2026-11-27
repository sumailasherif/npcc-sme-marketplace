const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = "C:/Users/User/AppData/Local/Temp/opencode/candidates";
const items = [
  ["m-market-eggplant", "https://live.staticflickr.com/2331/1812818177_21f51ac716_b.jpg"],
  ["m-market-mixed", "https://live.staticflickr.com/2013/1810685599_0bf153661c_b.jpg"],
  ["m-market-veg", "https://live.staticflickr.com/2094/1812817775_ccf3bb7409_b.jpg"],
  ["m-market-peppers", "https://live.staticflickr.com/2001/1813662846_342b41e3bc_b.jpg"],
  ["m-portlouis-market", "https://live.staticflickr.com/4091/5010847065_99e147887a_b.jpg"],
  ["m-portlouis-market2", "https://live.staticflickr.com/4152/5011451762_1bc38596cf_b.jpg"],
  ["m-textile-2", "https://live.staticflickr.com/3523/3212571366_61d83853ca_b.jpg"],
  ["m-textile-3", "https://live.staticflickr.com/3510/3212570568_69afb9625d_b.jpg"],
  ["m-handicraft", "https://live.staticflickr.com/1111/5105419452_841766961d_b.jpg"],
  ["m-men", "https://live.staticflickr.com/8656/15422988524_260322414d_b.jpg"],
  ["m-bakery-flatbread", "https://live.staticflickr.com/5308/5580430883_950a5e0bfe_b.jpg"],
  ["m-bakery-dosa", "https://live.staticflickr.com/4092/5189420981_f047ae2b05_b.jpg"],
  ["m-jackfruit", "https://live.staticflickr.com/7427/10141617146_3f00ba602a_b.jpg"],
];

(async () => {
  for (const [name, url] of items) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
          Referer: "https://www.flickr.com/",
          Accept: "image/avif,image/webp,image/jpeg,image/*",
        },
      });
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
    await new Promise((r) => setTimeout(r, 250));
  }
})();
