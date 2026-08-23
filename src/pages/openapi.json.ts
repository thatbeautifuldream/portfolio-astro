import type { APIRoute } from "astro";
import { API_VERSION } from "../lib/agent-api";
import { getSiteOrigin, siteConfig } from "../lib/seo";

export const prerender = true;

const errorSchema = {
  type: "object",
  additionalProperties: false,
  required: ["error"],
  properties: {
    error: {
      type: "object",
      additionalProperties: false,
      required: ["code", "message", "hint"],
      properties: {
        code: { type: "string", description: "Stable machine-readable code." },
        message: { type: "string", description: "Human-readable explanation." },
        hint: { type: "string", description: "Action an agent can take next." },
      },
    },
  },
} as const;

const errorRef = { $ref: "#/components/schemas/Error" };

const response = (description: string, schema: object, status = "200") => ({
  [status]: {
    description,
    headers: {
      "RateLimit-Limit": {
        description: "Maximum requests in the current one-minute window.",
        schema: { type: "integer", minimum: 1 },
      },
      "RateLimit-Remaining": {
        description: "Advisory requests remaining in the current window.",
        schema: { type: "integer", minimum: 0 },
      },
      "RateLimit-Reset": {
        description: "Seconds until the current window resets.",
        schema: { type: "integer", minimum: 0 },
      },
      ...(status === "429"
        ? {
            "Retry-After": {
              description: "Seconds to wait before retrying.",
              schema: { type: "integer", minimum: 1 },
            },
          }
        : {}),
    },
    content: {
      "application/json": { schema },
    },
  },
});

const standardResponses = (description: string, schema: object) => ({
  ...response(description, schema),
  ...response("The requested resource does not exist.", errorRef, "404"),
  ...response("Rate limit exceeded.", errorRef, "429"),
  ...response("Unexpected API error.", errorRef, "500"),
});

const profileSchema = {
  type: "object",
  required: [
    "type",
    "name",
    "description",
    "url",
    "jobTitle",
    "worksFor",
    "location",
    "knowsAbout",
    "sameAs",
    "contact",
    "resources",
    "apiVersion",
  ],
  properties: {
    type: { type: "string", example: "Person" },
    name: { type: "string", example: siteConfig.name },
    alternateName: { type: "string", example: siteConfig.shortName },
    description: { type: "string" },
    url: { type: "string", format: "uri" },
    jobTitle: { type: "string" },
    worksFor: {
      type: "object",
      required: ["name", "url"],
      properties: {
        name: { type: "string" },
        url: { type: "string", format: "uri" },
      },
    },
    location: {
      type: "object",
      required: ["city", "region", "country", "countryCode", "timezone"],
      properties: {
        city: { type: "string" },
        region: { type: "string" },
        country: { type: "string" },
        countryCode: { type: "string" },
        timezone: { type: "string" },
        timezoneLabel: { type: "string" },
      },
    },
    knowsAbout: { type: "array", items: { type: "string" } },
    sameAs: { type: "array", items: { type: "string", format: "uri" } },
    contact: {
      type: "object",
      required: ["email", "contactType"],
      properties: {
        email: { type: "string", format: "email" },
        contactType: { type: "string" },
      },
    },
    resources: {
      type: "object",
      required: ["llms", "fullContext", "openapi", "developers"],
      properties: {
        llms: { type: "string", format: "uri" },
        fullContext: { type: "string", format: "uri" },
        openapi: { type: "string", format: "uri" },
        developers: { type: "string", format: "uri" },
      },
    },
    apiVersion: { type: "string", example: API_VERSION },
  },
} as const;

const indexSchema = {
  type: "object",
  required: [
    "name",
    "description",
    "apiVersion",
    "openapi",
    "endpoints",
    "errors",
  ],
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    apiVersion: { type: "string" },
    openapi: { type: "string", format: "uri" },
    endpoints: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "url", "legacyUrl"],
        properties: {
          name: { type: "string" },
          url: { type: "string", format: "uri" },
          legacyUrl: { type: "string", format: "uri" },
        },
      },
    },
    errors: {
      type: "object",
      required: ["schema", "example"],
      properties: {
        schema: { type: "string", format: "uri-reference" },
        example: { type: "string", format: "uri" },
      },
    },
  },
} as const;

const healthSchema = {
  type: "object",
  required: ["status", "service", "version"],
  properties: {
    status: { type: "string", enum: ["ok"] },
    service: { type: "string" },
    version: { type: "string" },
  },
} as const;

const operation = (
  operationId: string,
  summary: string,
  description: string,
  schema: object,
) => ({
  get: {
    operationId,
    summary,
    description,
    responses: standardResponses(summary, schema),
  },
});

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const legacy = (path: string) => `${origin}${path}`;

  return new Response(
    JSON.stringify({
      openapi: "3.1.0",
      info: {
        title: `${siteConfig.name} Agent API`,
        version: API_VERSION,
        description:
          "Read-only, machine-readable profile and availability endpoints for agents and developers.",
        contact: { name: siteConfig.name, email: siteConfig.email },
      },
      servers: [{ url: origin }],
      externalDocs: {
        description: "Interactive Scalar API reference",
        url: legacy("/developers"),
      },
      "x-api-versioning": {
        strategy: "URL path",
        current: API_VERSION,
        canonicalPrefix: "/api/v1/",
        legacyPrefix: "/api/",
        deprecation:
          "Unversioned aliases remain for compatibility. Future breaking changes use a new URL version and are announced in /developers.",
      },
      paths: {
        "/api/v1/index.json": operation(
          "getApiIndexV1",
          "Discover the public API",
          "Returns versioned endpoint URLs and the documented error response shape.",
          indexSchema,
        ),
        "/api/v1/profile.json": operation(
          "getProfileV1",
          "Get Milind Mishra's professional profile",
          "Returns identity, role, expertise, contact, and canonical resource links.",
          profileSchema,
        ),
        "/api/v1/health.json": operation(
          "getHealthV1",
          "Check API availability",
          "Returns a small status payload when the API is available.",
          healthSchema,
        ),
        "/api/v1/error.json": {
          get: {
            operationId: "getApiErrorExampleV1",
            summary: "Read the not-found error contract",
            description:
              "Returns the JSON shape clients should expect for unsupported API resources.",
            responses: {
              ...response("Not-found error example", errorRef, "404"),
              ...response("Rate limit exceeded.", errorRef, "429"),
            },
          },
        },
        "/api/index.json": {
          get: {
            ...operation(
              "getApiIndexLegacy",
              "Discover the public API through a legacy alias",
              "Compatibility alias for the versioned API index.",
              indexSchema,
            ).get,
            deprecated: true,
          },
        },
        "/api/profile.json": {
          get: {
            ...operation(
              "getProfileLegacy",
              "Get the profile through a legacy alias",
              "Compatibility alias for the versioned profile endpoint.",
              profileSchema,
            ).get,
            deprecated: true,
          },
        },
        "/api/health.json": {
          get: {
            ...operation(
              "getHealthLegacy",
              "Check availability through a legacy alias",
              "Compatibility alias for the versioned health endpoint.",
              healthSchema,
            ).get,
            deprecated: true,
          },
        },
        "/api/error.json": {
          get: {
            operationId: "getApiErrorExampleLegacy",
            summary: "Read the not-found error contract through a legacy alias",
            description: "Compatibility alias for the versioned error example.",
            deprecated: true,
            responses: {
              ...response("Not-found error example", errorRef, "404"),
              ...response("Rate limit exceeded.", errorRef, "429"),
            },
          },
        },
      },
      components: {
        schemas: {
          Error: errorSchema,
          Profile: profileSchema,
          ApiIndex: indexSchema,
          Health: healthSchema,
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
