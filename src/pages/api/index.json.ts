import type { APIRoute } from "astro";
import { absoluteUrl, siteConfig } from "../../lib/seo";
import { API_VERSION, jsonResponse } from "../../lib/agent-api";

export const prerender = true;

export const GET: APIRoute = ({ site }) =>
  jsonResponse(
    {
      name: siteConfig.name,
      description: "Machine-readable resources for agents and developers.",
      apiVersion: API_VERSION,
      openapi: absoluteUrl("/openapi.json", site),
      endpoints: [
        {
          name: "Profile",
          url: absoluteUrl("/api/v1/profile.json", site),
          legacyUrl: absoluteUrl("/api/profile.json", site),
        },
        {
          name: "Health",
          url: absoluteUrl("/api/v1/health.json", site),
          legacyUrl: absoluteUrl("/api/health.json", site),
        },
      ],
      errors: {
        schema: `${absoluteUrl("/openapi.json", site)}#/components/schemas/Error`,
        example: absoluteUrl("/api/v1/error.json", site),
      },
    },
    200,
    { deprecated: true, successor: "/api/v1/index.json" },
  );
