import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { ogImageOptions } from "../../lib/og";

const posts = await getCollection("posts");

// Map each blog post id -> the data the card needs.
const pages = Object.fromEntries(
  posts.map((post) => [
    post.id,
    { title: post.data.title, description: post.data.description },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) => ogImageOptions(page),
});
