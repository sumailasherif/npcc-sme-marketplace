const fs = require("fs");
const s = fs.readFileSync("src/lib/catalog/data.ts", "utf8");
for (const m of s.matchAll(/name: "([^"]+)"/g)) {
  const n = m[1];
  if (/Nad|toile|Dou|tisserie|Belle|Bebe|bebe/.test(n)) {
    console.log(
      JSON.stringify(n),
      [...n].map((c) => c.codePointAt(0).toString(16)).join(" "),
    );
  }
}
