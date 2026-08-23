import type { APIRoute } from "astro";
import { absoluteUrl, siteConfig } from "../../lib/seo";
import { jsonResponse } from "../../lib/agent-api";
export const prerender = true;

export const GET: APIRoute = ({ site }) =>
  jsonResponse({
    name: siteConfig.name,
    description: "Machine-readable resources for agents and developers.",
    openapi: absoluteUrl("/openapi.json", site),
    endpoints: [
      {
        name: "Profile",
        url: absoluteUrl("/api/profile.json", site),
      },
      {
        name: "Health",
        url: absoluteUrl("/api/health.json", site),
      },
    ],
    errors: {
      schema: `${absoluteUrl("/openapi.json", site)}#/components/schemas/Error`,
      example: absoluteUrl("/api/error.json", site),
    },
  });
