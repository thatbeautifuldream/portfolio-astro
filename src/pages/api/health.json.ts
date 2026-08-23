import type { APIRoute } from "astro";
import { API_VERSION, jsonResponse } from "../../lib/agent-api";

export const prerender = true;

export const GET: APIRoute = () =>
  jsonResponse(
    {
      status: "ok",
      service: "milindmishra.com",
      version: API_VERSION,
    },
    200,
    { deprecated: true, successor: "/api/v1/health.json" },
  );
