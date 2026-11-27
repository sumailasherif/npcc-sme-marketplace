const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = "C:/Users/User/AppData/Local/Temp/opencode/candidates";
const items = [
  ["p-iphone3", "https://images.pexels.com/photos/21008947/pexels-photo-21008947.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-noodle", "https://images.pexels.com/photos/7758254/pexels-photo-7758254.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["p-noodle2", "https://images.pexels.com/photos/4985538/pexels-photo-4985538.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["o-biryani", "https://live.staticflickr.com/3655/3643374430_fba00b9ed7_b.jpg"],
  ["o-fried-rice", "https://live.staticflickr.com/3010/3010144552_7b95a85756_b.jpg"],
];

(async () => {
  for (const [name, url] of items) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
          Referer: "https://www.flickr.com/",
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
