// Subset the local Inter variable fonts to the Latin unicode-range Astro already
// declares. Astro's local font provider serves woff2 files as-is (no subsetting),
// so the full ~350KB+ files land on the critical path; subsetting drops them to
// ~50KB while keeping the variable `wght` axis. Re-run after updating Inter.
// Usage: node scripts/subset-fonts.ts
import subsetFont from "subset-font";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const FONT_DIR = ROOT + "src/assets/fonts/";

// The exact range Astro emits in the generated @font-face for these fonts.
const UNICODE_RANGE =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";

/** Expand a CSS unicode-range into the string of characters it covers. */
function rangeToText(range: string): string {
  let text = "";
  for (const part of range.split(",")) {
    const m = part.trim().match(/^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/);
    if (!m) continue;
    const start = parseInt(m[1]!, 16);
    const end = m[2] ? parseInt(m[2], 16) : start;
    for (let cp = start; cp <= end; cp++) text += String.fromCodePoint(cp);
  }
  return text;
}

const FILES = ["InterVariable.woff2", "InterVariable-Italic.woff2"];

const text = rangeToText(UNICODE_RANGE);

for (const file of FILES) {
  const input = await readFile(FONT_DIR + file);
  const out = await subsetFont(input, text, { targetFormat: "woff2" });
  const target = file.replace(/\.woff2$/, ".subset.woff2");
  await writeFile(FONT_DIR + target, out);
  const pct = Math.round((1 - out.length / input.length) * 100);
  console.log(
    `${file}: ${(input.length / 1024) | 0}KB -> ${target} ${(out.length / 1024) | 0}KB (-${pct}%)`,
  );
}

// CanvasKit (Skia) can't parse woff2, so the OG-image cards need raw TTF. Emit
// static Inter instances at the weights the cards use (400 body, 600 title)
// from the same source, so the OG font matches the site exactly.
const interSource = await readFile(FONT_DIR + "InterVariable.woff2");
for (const weight of [400, 600]) {
  const out = await subsetFont(interSource, text, {
    targetFormat: "sfnt",
    variationAxes: { wght: weight },
  });
  const target = `Inter-${weight}.ttf`;
  await writeFile(FONT_DIR + target, out);
  console.log(`InterVariable.woff2 -> ${target} ${(out.length / 1024) | 0}KB`);
}
