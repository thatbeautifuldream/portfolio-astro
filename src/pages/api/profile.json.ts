import type { APIRoute } from "astro";
import { buildProfileResponse, jsonResponse } from "../../lib/agent-api";

export const prerender = true;

export const GET: APIRoute = ({ site }) =>
  jsonResponse(buildProfileResponse(site), 200, {
    deprecated: true,
    successor: "/api/v1/profile.json",
  });
