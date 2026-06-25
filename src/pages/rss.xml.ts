import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { siteConfig } from "../lib/seo";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: `${siteConfig.shortName} · Blog`,
    description:
      "Notes on product engineering, AI interfaces, developer tools, and the journey of building products.",
    site: context.site ?? siteConfig.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: [post.data.category],
      link: `/blog/${post.id}`,
    })),
  });
}
