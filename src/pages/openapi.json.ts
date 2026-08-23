import type { APIRoute } from "astro";
import { getSiteOrigin, siteConfig } from "../lib/seo";

export const prerender = true;

const errorSchema = {
  type: "object",
  required: ["error"],
  properties: {
    error: {
      type: "object",
      required: ["code", "message", "hint"],
      properties: {
        code: { type: "string", description: "Stable machine-readable code." },
        message: { type: "string", description: "Human-readable explanation." },
        hint: { type: "string", description: "Action an agent can take next." },
      },
    },
  },
} as const;

const response = (description: string, schema: object, status = "200") => ({
  [status]: {
    description,
    content: {
      "application/json": { schema },
    },
  },
});

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const profileSchema = {
    type: "object",
    required: ["type", "name", "description", "url", "jobTitle"],
    properties: {
      type: { type: "string", example: "Person" },
      name: { type: "string", example: siteConfig.name },
      alternateName: { type: "string", example: siteConfig.shortName },
      description: { type: "string" },
      url: { type: "string", format: "uri" },
      jobTitle: { type: "string" },
      worksFor: {
        type: "object",
        properties: {
          name: { type: "string" },
          url: { type: "string", format: "uri" },
        },
      },
      location: { type: "object" },
      knowsAbout: { type: "array", items: { type: "string" } },
      sameAs: { type: "array", items: { type: "string", format: "uri" } },
      contact: { type: "object" },
      resources: { type: "object" },
    },
  };

  return new Response(
    JSON.stringify({
      openapi: "3.1.0",
      info: {
        title: `${siteConfig.name} Agent API`,
        version: "1.0.0",
        description:
          "Read-only, machine-readable profile and availability endpoints for agents and developers.",
        contact: { name: siteConfig.name, email: siteConfig.email },
      },
      servers: [{ url: origin }],
      paths: {
        "/api/index.json": {
          get: {
            operationId: "getApiIndex",
            summary: "Discover the public API",
            description:
              "Returns endpoint URLs and the documented error response shape.",
            responses: response("API endpoint discovery", {
              type: "object",
              required: ["name", "openapi", "endpoints"],
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                openapi: { type: "string", format: "uri" },
                endpoints: { type: "array", items: { type: "object" } },
                errors: { type: "object" },
              },
            }),
          },
        },
        "/api/profile.json": {
          get: {
            operationId: "getProfile",
            summary: "Get Milind Mishra's professional profile",
            description:
              "Returns identity, role, expertise, contact, and canonical resource links.",
            responses: response("Professional profile", profileSchema),
          },
        },
        "/api/health.json": {
          get: {
            operationId: "getHealth",
            summary: "Check API availability",
            description:
              "Returns a small status payload when the API is available.",
            responses: response("API is available", {
              type: "object",
              required: ["status", "service", "version"],
              properties: {
                status: { type: "string", enum: ["ok"] },
                service: { type: "string" },
                version: { type: "string" },
              },
            }),
          },
        },
        "/api/error.json": {
          get: {
            operationId: "getApiErrorExample",
            summary: "Read the not-found error contract",
            description:
              "Returns the JSON shape clients should expect for unsupported API resources.",
            responses: response("Not-found error example", errorSchema, "404"),
          },
        },
      },
      components: {
        schemas: {
          Error: errorSchema,
        },
      },
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
};
