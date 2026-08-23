import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);

async function readDist(path: string) {
  return readFile(new URL(path, dist), "utf8");
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
  assert.ok(content.length >= 500);
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

test("OpenAPI contract documents the public JSON endpoints and errors", async () => {
  const openapi = JSON.parse(await readDist("openapi.json"));

  assert.equal(openapi.openapi, "3.1.0");
  assert.ok(openapi.paths["/api/profile.json"].get.operationId);
  assert.ok(openapi.paths["/api/health.json"].get.operationId);
  assert.equal(
    openapi.components.schemas.Error.properties.error.properties.code.type,
    "string",
  );
});

test("public API files contain machine-readable payloads", async () => {
  const profile = JSON.parse(await readDist("api/profile.json"));
  const health = JSON.parse(await readDist("api/health.json"));
  const error = JSON.parse(await readDist("api/error.json"));

  assert.equal(profile.type, "Person");
  assert.equal(profile.name, "Milind Kumar Mishra");
  assert.equal(health.status, "ok");
  assert.equal(error.error.code, "NOT_FOUND");
  assert.match(error.error.hint, /openapi/);
});
