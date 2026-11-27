const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = "C:/Users/User/AppData/Local/Temp/opencode/openverse";
fs.mkdirSync(outDir, { recursive: true });

const groups = [
  {
    name: "mauritius-1",
    queries: [
      "mauritius market",
      "mauritius street food",
      "mauritius shop",
      "mauritius bakery",
      "mauritius fruit",
      "mauritius handicraft",
      "mauritius textile",
      "mauritius cook",
      "port louis market",
      "mauritius village",
    ],
  },
  {
    name: "food-1",
    queries: [
      "samosa",
      "sweet potato cake",
      "gateau patate",
      "bakery bread",
      "pickled lemon jar",
      "alouda",
      "curry rice",
      "dholl puri",
      "biryani",
      "fried rice",
    ],
  },
  {
    name: "goods-1",
    queries: [
      "handmade basket",
      "straw hat",
      "baby clothes",
      "bouquet flowers",
      "handmade soap",
      "plant pot home",
      "wooden desk",
      "kids bicycle",
      "iphone 11",
      "gold earrings",
    ],
  },
  {
    name: "mauritius-2",
    queries: [
      "mauritius beach local",
      "mauritius people",
      "mauritius food",
      "mauritius vegetable",
      "mauritius spices",
      "mauritius sugar cane",
      "mauritius sega",
      "mauritius house",
      "mauritius flower",
      "mauritius fisherman",
    ],
  },
];

async function fetchQuery(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=5`;
  const res = await fetch(url, {
    headers: { "User-Agent": "BazarDesignResearch/1.0" },
  });
  if (!res.ok) throw new Error(`${q}: ${res.status}`);
  const data = await res.json();
  return (data.results ?? []).map((r) => ({
    title: r.title,
    creator: r.creator,
    license: r.license,
    source: r.source,
    width: r.width,
    height: r.height,
    url: r.url,
    thumbnail: r.thumbnail,
    foreign_landing_url: r.foreign_landing_url,
  }));
}

(async () => {
  for (const group of groups) {
    const results = {};
    const rows = [];
    for (const q of group.queries) {
      try {
        const items = await fetchQuery(q);
        results[q] = items;
        rows.push({ q, items });
      } catch (error) {
        rows.push({ q, items: [], error: String(error) });
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    fs.writeFileSync(
      path.join(outDir, `${group.name}.json`),
      JSON.stringify(results, null, 2),
    );

    const cell = 230;
    const gap = 10;
    const label = 26;
    const cols = 5;
    const width = cols * cell + (cols + 1) * gap;
    const height = rows.length * (cell + label + gap) + gap;
    const composites = [];
    for (let row = 0; row < rows.length; row += 1) {
      const y = gap + row * (cell + label + gap);
      const svg = Buffer.from(
        `<svg width="${width}" height="${label}"><rect width="100%" height="100%" fill="#f4efe4"/><text x="8" y="19" font-family="Arial" font-size="15" fill="#1a1916">${rows[row].q}</text></svg>`,
      );
      composites.push({ input: svg, left: 0, top: y });
      for (let col = 0; col < rows[row].items.length; col += 1) {
        const item = rows[row].items[col];
        const x = gap + col * (cell + gap);
        try {
          const res = await fetch(item.thumbnail);
          if (!res.ok) continue;
          const buffer = Buffer.from(await res.arrayBuffer());
          const thumb = await sharp(buffer)
            .resize(cell, cell, { fit: "cover" })
            .toBuffer();
          composites.push({ input: thumb, left: x, top: y + label });
        } catch {
          // skip a broken thumbnail
        }
      }
    }
    await sharp({
      create: { width, height, channels: 3, background: "#f4efe4" },
    })
      .composite(composites)
      .png()
      .toFile(path.join(outDir, `${group.name}.png`));
    console.log("done", group.name);
  }
})();
