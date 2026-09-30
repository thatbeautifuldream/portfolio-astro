import type { APIRoute } from "astro";
import { jsonResponse } from "../../../lib/agent-api";
import { buildGistList, getGists } from "../../../lib/content-api";

export const prerender = true;

export const GET: APIRoute = async ({ site }) =>
  jsonResponse(buildGistList(await getGists(), site));
