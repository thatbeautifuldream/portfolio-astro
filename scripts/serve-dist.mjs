// Minimal static server for ./dist that applies public/_headers rules,
// so Lighthouse sees the same response headers Cloudflare Pages will serve.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const COMPRESSIBLE = new Set([
  ".html",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".svg",
  ".xml",
  ".txt",
]);

const DIST = new URL("../dist/", import.meta.url).pathname;
const PORT = Number(process.argv[2] || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

// Parse vercel.json `headers` into [{ test(path), headers }] so the local
// server mirrors the response headers Vercel serves in production.
function parseHeaders() {
  const file = new URL("../vercel.json", import.meta.url).pathname;
  if (!existsSync(file)) return [];
  const cfg = JSON.parse(readFileSync(file, "utf8"));
  return (cfg.headers || []).map((rule) => {
    const re = new RegExp(
      "^" + rule.source.replace(/\(\.\*\)/g, ".*").replace(/\/$/, "/?") + "$",
    );
    const headers = Object.fromEntries(
      rule.headers.map((h) => [h.key, h.value]),
    );
    return { test: (p) => re.test(p), headers };
  });
}

const HEADER_RULES = parseHeaders();

const server = createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let filePath = normalize(join(DIST, pathname));
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }
  if (pathname.endsWith("/")) filePath = join(filePath, "index.html");
  if (!existsSync(filePath) && existsSync(filePath + ".html"))
    filePath += ".html";
  if (!existsSync(filePath) && existsSync(join(filePath, "index.html")))
    filePath = join(filePath, "index.html");

  try {
    let body = await readFile(filePath);
    const ext = extname(filePath);
    const headers = {
      "Content-Type": TYPES[ext] || "application/octet-stream",
    };
    for (const rule of HEADER_RULES)
      if (rule.test(pathname)) Object.assign(headers, rule.headers);
    if (
      COMPRESSIBLE.has(ext) &&
      /\bgzip\b/.test(req.headers["accept-encoding"] || "")
    ) {
      body = gzipSync(body);
      headers["Content-Encoding"] = "gzip";
      headers["Vary"] = "Accept-Encoding";
    }
    res.writeHead(200, headers).end(body);
  } catch {
    const notFound = join(DIST, "404.html");
    if (existsSync(notFound)) {
      res
        .writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
        .end(await readFile(notFound));
    } else {
      res.writeHead(404).end("Not found");
    }
  }
});

server.listen(PORT, () =>
  console.log(`serving dist on http://localhost:${PORT}`),
);
