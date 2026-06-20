import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl, getSiteOrigin, siteConfig } from "../lib/seo";

export const prerender = true;

function gistDate(data: { datePublished?: Date; date?: Date }): Date {
  return data.datePublished ?? data.date ?? new Date(0);
}

export const GET: APIRoute = async ({ site }) => {
  const origin = getSiteOrigin(site);

  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const gists = (await getCollection("gists"))
    .filter((gist) => gist.data.isPublic)
    .sort((a, b) => gistDate(b.data).getTime() - gistDate(a.data).getTime());

  const sections = [
    "## Pages",
    "",
    `- [Work](${absoluteUrl("/work", site)}): Product and AI work across startup environments.`,
    `- [Projects](${absoluteUrl("/projects", site)}): Side projects born from curiosity.`,
    `- [Talks](${absoluteUrl("/talks", site)}): Talks on React, motion systems, interface architecture, and AI.`,
    `- [Blog](${absoluteUrl("/blog", site)}): Notes on product engineering, AI interfaces, and developer tools.`,
    `- [Gists](${absoluteUrl("/gist", site)}): Code snippets and quick solutions.`,
    `- [Contact](${absoluteUrl("/contact", site)}): Get in touch.`,
    "",
    "## Writing",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${absoluteUrl(`/blog/${post.id}`, site)}): ${post.data.description}`,
    ),
    "",
    "## Gists",
    "",
    ...gists.map(
      (gist) =>
        `- [${gist.data.title}](${absoluteUrl(`/gist/${gist.id}`, site)})${gist.data.description ? `: ${gist.data.description}` : ""}`,
    ),
  ].join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.shortName} is a product engineer building AI-native interfaces, product systems, and tools people return to. This site collects his work, projects, talks, writing, and code gists.

${sections}

## Citation Facts

- Official site: ${origin}/
- Author: ${siteConfig.name}
- Links: ${siteConfig.sameAs.join(", ")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
