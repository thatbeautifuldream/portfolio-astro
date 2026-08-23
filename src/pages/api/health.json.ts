import type { APIRoute } from "astro";
import { jsonResponse } from "../../lib/agent-api";

export const prerender = true;

export const GET: APIRoute = () =>
  jsonResponse({
    status: "ok",
    service: "milindmishra.com",
    version: "1",
  });
