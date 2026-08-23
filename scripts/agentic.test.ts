import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);

async function readDist(path: string) {
  return readFile(new URL(path, dist), "utf8");
}

async function readRoot(path: string) {
  return readFile(new URL(path, root), "utf8");
}

test("homepage exposes semantic content without JavaScript", async () => {
  const html = await readDist("index.html");
  const content = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  assert.match(html, /<h1\b/);
  assert.match(html, /<h2[^>]*>\s*Products\s*<\/h2>/);
  assert.match(html, /Quick navigation/);
  assert.ok(content.length >= 500);
});

test("homepage includes complete organization identity data", async () => {
  const html = await readDist("index.html");

  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"contactPoint"/);
  assert.match(html, /"contactType":"professional inquiries"/);
  assert.match(html, /"address":\{"@type":"PostalAddress"/);
});

test("404 page contains agent recovery links", async () => {
  const html = await readDist("404.html");

  assert.match(html, /# Not found/);
  assert.match(html, /\/sitemap-index\.xml/);
  assert.match(html, /\/llms\.txt/);
  assert.match(html, /\/developers/);
});

test("robots explicitly allows major AI crawlers", async () => {
  const robots = await readDist("robots.txt");

  for (const crawler of [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Google-Extended",
    "Applebot-Extended",
    "DeepSeekBot",
    "ora-agent",
  ]) {
    assert.match(robots, new RegExp(`User-agent: ${crawler}`));
  }
});

test("OpenAPI contract documents typed versioned operations and errors", async () => {
  const openapi = JSON.parse(await readDist("openapi.json"));

  assert.equal(openapi.openapi, "3.1.0");
  assert.equal(openapi.info.version, "1");
  assert.equal(openapi["x-api-versioning"].canonicalPrefix, "/api/v1/");
  assert.ok(openapi.paths["/api/v1/profile.json"].get.operationId);
  assert.ok(openapi.paths["/api/v1/health.json"].get.operationId);
  assert.equal(
    openapi.components.schemas.Error.properties.error.properties.code.type,
    "string",
  );

  for (const path of Object.keys(openapi.paths)) {
    for (const response of Object.values(openapi.paths[path].get.responses)) {
      assert.ok(
        response &&
          typeof response === "object" &&
          "content" in response &&
          "headers" in response,
      );
    }
  }
});

test("public API files contain versioned machine-readable payloads", async () => {
  const index = JSON.parse(await readDist("api/v1/index.json"));
  const profile = JSON.parse(await readDist("api/v1/profile.json"));
  const health = JSON.parse(await readDist("api/v1/health.json"));
  const error = JSON.parse(await readDist("api/v1/error.json"));

  assert.equal(index.apiVersion, "1");
  assert.equal(profile.type, "Person");
  assert.equal(profile.name, "Milind Kumar Mishra");
  assert.equal(profile.apiVersion, "1");
  assert.equal(health.status, "ok");
  assert.equal(health.version, "1");
  assert.equal(error.error.code, "NOT_FOUND");
  assert.match(error.error.hint, /openapi/);
});

test("markdown representation and discovery guidance are published", async () => {
  const markdown = await readDist("index.md");
  const pages = await Promise.all(
    ["about.md", "blog.md", "gist.md", "uses.md", "developers.md"].map(
      readDist,
    ),
  );
  const llms = await readDist("llms.txt");
  const developers = await readDist("developers/index.html");

  assert.match(markdown, /^# Milind Kumar Mishra/m);
  assert.match(markdown, /\/api\/v1\/profile\.json/);
  assert.match(pages[0], /^# About Milind Kumar Mishra/m);
  assert.match(pages[1], /^# Blog/m);
  assert.match(pages[2], /^# Gists/m);
  assert.match(pages[3], /^# Uses/m);
  assert.match(pages[4], /\/api\/v1\/profile\.json/);
  assert.match(llms, /When to use this site/);
  assert.match(llms, /\/developers/);
  assert.match(developers, /Scalar/);
});

test("trust anchor pages contain substantive content", async () => {
  for (const path of ["about/index.html", "privacy/index.html"]) {
    const html = await readDist(path);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    assert.ok(text.length >= 500, `${path} should contain at least 500 chars`);
  }
});

test("Vercel routing declares Markdown negotiation and JSON API fallback", async () => {
  const config = JSON.parse(await readRoot("vercel.json"));

  assert.ok(
    config.routes.some(
      (route: { src: string; dest?: string }) =>
        route.src === "^/$" && route.dest === "/index.md",
    ),
  );
  assert.ok(
    config.routes.some(
      (route: {
        src: string;
        dest?: string;
        has?: Array<{ key?: string; value?: string }>;
      }) =>
        route.dest === "/$1.md" &&
        route.has?.some(
          (condition: { key?: string; value?: string }) =>
            condition.key === "accept" && condition.value === "text/markdown.*",
        ),
    ),
  );
  assert.ok(
    config.routes.some(
      (route: { src: string; status?: number }) =>
        route.src.includes("/api/") && route.status === 404,
    ),
  );
  assert.ok(
    config.headers.some(
      (rule: { source: string }) => rule.source === "/api/(.*)",
    ),
  );
  assert.ok(
    config.headers
      .find((rule: { source: string }) => rule.source === "/(.*)")
      .headers.some(
        (header: { key: string; value: string }) =>
          header.key === "Vary" && header.value === "Accept, Accept-Encoding",
      ),
  );
});
