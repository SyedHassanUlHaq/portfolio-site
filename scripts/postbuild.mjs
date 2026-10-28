// Next writes generated social images as extensionless files ("opengraph-image"). Static hosts such as
// GitHub Pages then serve them as application/octet-stream, which link scrapers can reject.
// Copy each to *.png and point the <meta> tags at it.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
let images = 0;
let pages = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "opengraph-image") {
      fs.copyFileSync(p, `${p}.png`);
      images++;
    } else if (e.name.endsWith(".html")) {
      const html = fs.readFileSync(p, "utf8");
      const next = html.replace(/opengraph-image\?[a-z0-9]+/g, "opengraph-image.png");
      if (next !== html) {
        fs.writeFileSync(p, next);
        pages++;
      }
    }
  }
}
walk(OUT);
console.log(`postbuild: ${images} social images → .png, ${pages} pages updated`);
