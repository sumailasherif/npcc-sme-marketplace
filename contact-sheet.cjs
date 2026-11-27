const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = "public/photos";
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".jpg"))
  .sort();
const cell = 300;
const pad = 12;
const label = 30;
const cols = 5;
const rows = Math.ceil(files.length / cols);
const width = cols * cell + (cols + 1) * pad;
const height = rows * (cell + label) + (rows + 1) * pad;
const composites = [];

(async () => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const x = pad + (i % cols) * (cell + pad);
    const y = pad + Math.floor(i / cols) * (cell + label + pad);
    const buffer = await sharp(path.join(dir, file))
      .resize(cell, cell, { fit: "cover", position: "centre" })
      .toBuffer();
    composites.push({ input: buffer, left: x, top: y });
    const name = file.replace(".jpg", "");
    const svg = Buffer.from(
      `<svg width="${cell}" height="${label}"><rect width="100%" height="100%" fill="#ffffff"/><text x="6" y="21" font-family="Arial" font-size="15" fill="#111">${name}</text></svg>`,
    );
    composites.push({ input: svg, left: x, top: y + cell });
  }

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#e9e4da",
    },
  })
    .composite(composites)
    .png()
    .toFile("C:/Users/User/AppData/Local/Temp/opencode/photos-contact.png");

  console.log("done", width, height, files.length);
})();
