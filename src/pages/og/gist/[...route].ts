import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { ogImageOptions } from "../../../lib/og";

const gists = await getCollection("gists");

// Map each gist id -> the data the card needs.
const pages = Object.fromEntries(
  gists.map((gist) => [
    gist.id,
    { title: gist.data.title, description: gist.data.description ?? "" },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) => ogImageOptions(page),
});
