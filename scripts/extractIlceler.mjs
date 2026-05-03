import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inFile = process.argv[2] || path.join(root, "data", "wiki-ilce-raw.txt");
const outFile = path.join(root, "engine", "provinceIlceler.json");

const text = fs.readFileSync(inFile, "utf8");
const lines = text.split(/\r?\n/);

const strip = (s) => {
  const t = s.trim();
  const m = t.match(/^\[([^\]]+)\]\([^)]*\)/);
  if (m) return m[1].replace(/_/g, " ").trim();
  if (t.includes("[")) {
    const m2 = t.match(/\[([^\]]+)\]/);
    if (m2) return m2[1].trim();
  }
  return t.replace(/_/g, " ");
};

const byIl = {};
for (const line of lines) {
  if (!line.startsWith("|")) continue;
  const parts = line.split("|").map((c) => c.trim());
  if (parts.length < 4) continue;
  const colIl = parts[1];
  const colIlce = parts[2];
  if (!colIl || colIl === "İl" || colIl.startsWith("---")) continue;
  if (!colIlce || colIlce === "İlçe") continue;

  const il = strip(colIl);
  const ilce = strip(colIlce);
  if (!il || !ilce) continue;

  if (!byIl[il]) byIl[il] = [];
  /* İstanbul vb. için turistik ilçeler alfabetada geride kalmasın diye il başına yeterli sayıda tutulur. */
  if (byIl[il].length < 24 && !byIl[il].includes(ilce)) {
    byIl[il].push(ilce);
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(byIl, null, 2), "utf8");
console.log("iller:", Object.keys(byIl).length, "->", outFile);
