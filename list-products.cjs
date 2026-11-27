const fs = require("fs");
const s = fs.readFileSync("src/lib/catalog/data.ts", "utf8");
const start = s.indexOf("const productSeeds");
const body = s.slice(start);
const re = /\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*"([^"]*)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,?\s*\]/g;
let m;
let i = 0;
while ((m = re.exec(body))) {
  console.log(
    String(i++).padStart(2, "0"),
    "|",
    m[6].padEnd(14),
    "|",
    m[5].padEnd(18),
    "|",
    m[1].padEnd(22),
    "|",
    m[2],
  );
}
