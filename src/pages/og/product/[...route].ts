import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { ogImageOptions } from "../../../lib/og";

const products = await getCollection("products");

const pages = Object.fromEntries(
  products.map((product) => [
    product.id,
    { title: product.data.name, description: product.data.tagline },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) => ogImageOptions(page),
});
