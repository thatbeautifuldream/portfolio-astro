// Composable static server for ./dist that mirrors the vercel.json header rules
// (and gzips), so an audit sees the same response headers Vercel serves.
// Import `startServer()` to embed it, or run this file directly to serve.
import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

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

const TYPES: Record<string, string> = {
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

interface HeaderRule {
  test: (path: string) => boolean;
  headers: Record<string, string>;
}

// Parse vercel.json `headers` into [{ test(path), headers }] so the local
// server mirrors the response headers Vercel serves in production.
function parseHeaders(root: string): HeaderRule[] {
  const file = join(root, "vercel.json");
  if (!existsSync(file)) return [];
  const cfg = JSON.parse(readFileSync(file, "utf8")) as {
    headers?: { source: string; headers: { key: string; value: string }[] }[];
  };
  return (cfg.headers ?? []).map((rule) => {
    const re = new RegExp(
      "^" + rule.source.replace(/\(\.\*\)/g, ".*").replace(/\/$/, "/?") + "$",
    );
    const headers = Object.fromEntries(
      rule.headers.map((h) => [h.key, h.value]),
    );
    return { test: (p: string) => re.test(p), headers };
  });
}

export interface ServerHandle {
  url: string;
  port: number;
  close: () => Promise<void>;
}

export interface ServerOptions {
  port?: number;
  /** Project root containing `dist/` and `vercel.json`. Defaults to cwd's parent of this script. */
  root?: string;
}

const PROJECT_ROOT = fileURLToPath(new URL("../", import.meta.url));

/** Start the dist server and resolve once it is listening. */
export function startServer(opts: ServerOptions = {}): Promise<ServerHandle> {
  const root = opts.root ?? PROJECT_ROOT;
  const dist = join(root, "dist") + "/";
  const headerRules = parseHeaders(root);

  const server: Server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(
      new URL(req.url ?? "/", "http://x").pathname,
    );
    let filePath = normalize(join(dist, pathname));
    if (!filePath.startsWith(dist)) {
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
      const headers: Record<string, string> = {
        "Content-Type": TYPES[ext] ?? "application/octet-stream",
      };
      for (const rule of headerRules)
        if (rule.test(pathname)) Object.assign(headers, rule.headers);
      if (
        COMPRESSIBLE.has(ext) &&
        /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")
      ) {
        body = gzipSync(body);
        headers["Content-Encoding"] = "gzip";
        headers["Vary"] = "Accept-Encoding";
      }
      res.writeHead(200, headers).end(body);
    } catch {
      const notFound = join(dist, "404.html");
      if (existsSync(notFound)) {
        res
          .writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
          .end(await readFile(notFound));
      } else {
        res.writeHead(404).end("Not found");
      }
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(opts.port ?? 0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : opts.port!;
      resolve({
        url: `http://localhost:${port}/`,
        port,
        close: () => new Promise<void>((res) => server.close(() => res())),
      });
    });
  });
}

// Run directly: `node scripts/serve-dist.ts [port]` — serve and stay up.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.argv[2]) || 4321;
  startServer({ port }).then((h) => console.log(`serving dist on ${h.url}`));
}
