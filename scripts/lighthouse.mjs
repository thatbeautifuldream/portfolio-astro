// Verification loop: build, serve dist (with _headers), run Lighthouse for
// mobile + desktop, print category scores and every audit below 100%.
// Usage: node scripts/lighthouse.mjs [--url https://prod] [--no-build]
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const externalUrl = args.includes("--url")
  ? args[args.indexOf("--url") + 1]
  : null;
const noBuild = args.includes("--no-build");
const PORT = 4321;
const URL = externalUrl || `http://localhost:${PORT}/`;

const run = (cmd, cmdArgs, opts = {}) =>
  new Promise((res, rej) => {
    const p = spawn(cmd, cmdArgs, { stdio: "inherit", ...opts });
    p.on("exit", (code) =>
      code === 0 ? res() : rej(new Error(`${cmd} exited ${code}`)),
    );
  });

const waitFor = async (url) => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`server never came up at ${url}`);
};

async function lh(formFactor) {
  const out = join(mkdtempSync(join(tmpdir(), "lh-")), `${formFactor}.json`);
  const preset = formFactor === "desktop" ? ["--preset=desktop"] : [];
  await run("npx", [
    "--yes",
    "lighthouse@12",
    URL,
    "--quiet",
    "--output=json",
    `--output-path=${out}`,
    "--only-categories=performance,accessibility,best-practices,seo",
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    ...preset,
  ]);
  return JSON.parse(readFileSync(out, "utf8"));
}

function report(formFactor, lhr) {
  const cats = lhr.categories;
  const line = Object.values(cats)
    .map((c) => `${c.title}: ${Math.round(c.score * 100)}`)
    .join("  |  ");
  console.log(`\n=== ${formFactor.toUpperCase()} ===\n${line}\n`);
  for (const cat of Object.values(cats)) {
    const fails = cat.auditRefs
      .map((ref) => lhr.audits[ref.id])
      .filter(
        (a) =>
          a &&
          a.score !== null &&
          a.score < 1 &&
          a.scoreDisplayMode !== "informative",
      )
      .map((a) => {
        const dv = a.displayValue ? ` (${a.displayValue})` : "";
        return `    - ${a.id}: ${Math.round((a.score ?? 0) * 100)}%${dv}`;
      });
    if (fails.length) console.log(`  ${cat.title} gaps:\n${fails.join("\n")}`);
  }
  return Object.fromEntries(
    Object.entries(cats).map(([k, c]) => [k, Math.round(c.score * 100)]),
  );
}

(async () => {
  if (!externalUrl && !noBuild) await run("pnpm", ["build"]);
  let server;
  if (!externalUrl) {
    // Kill any stale server still bound to the port from a previous run.
    try {
      await run("bash", [
        "-c",
        `lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`,
      ]);
    } catch {}
    server = spawn("node", ["scripts/serve-dist.mjs", String(PORT)], {
      stdio: "inherit",
    });
    await waitFor(URL);
  }
  try {
    const summary = {};
    for (const ff of ["mobile", "desktop"])
      summary[ff] = report(ff, await lh(ff));
    console.log("\n=== SUMMARY ===");
    console.table(summary);
  } finally {
    if (server) server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
