import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { productOgImageOptions } from "../../../lib/og";

const products = await getCollection("products");

const pages = Object.fromEntries(
  products.map((product) => [
    product.id,
    { name: product.data.name, tagline: product.data.tagline },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) =>
    productOgImageOptions(page),
});
