const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = "C:/Users/User/AppData/Local/Temp/opencode/candidates";
const files = fs.readdirSync(dir).filter((f) => f.startsWith("m-") && f.endsWith(".jpg")).sort();
const cell = 360;
const pad = 10;
const label = 26;
const cols = 4;
const rows = Math.ceil(files.length / cols);
const width = cols * cell + (cols + 1) * pad;
const height = rows * (cell + label) + (rows + 1) * pad;
const composites = [];

(async () => {
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const x = pad + (i % cols) * (cell + pad);
    const y = pad + Math.floor(i / cols) * (cell + label + pad);
    const buffer = await sharp(path.join(dir, file))
      .resize(cell, cell, { fit: "cover" })
      .toBuffer();
    composites.push({ input: buffer, left: x, top: y });
    const svg = Buffer.from(
      `<svg width="${cell}" height="${label}"><rect width="100%" height="100%" fill="#fff"/><text x="6" y="19" font-family="Arial" font-size="14" fill="#111">${file.replace(".jpg", "")}</text></svg>`,
    );
    composites.push({ input: svg, left: x, top: y + cell });
  }
  await sharp({ create: { width, height, channels: 3, background: "#f2ede4" } })
    .composite(composites)
    .png()
    .toFile("C:/Users/User/AppData/Local/Temp/opencode/mauritius-contact.png");
  console.log("done", files.length);
})();
