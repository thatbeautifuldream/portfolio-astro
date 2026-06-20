import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      date: z.coerce.date(),
      coverImage: image().optional(),
    }),
});

const gists = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/gist" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    datePublished: z.coerce.date().optional(),
    slug: z.string().optional(),
    tags: z.string().optional(),
    gistId: z.string(),
    gistUrl: z.string(),
    isPublic: z.boolean(),
  }),
});

export const collections = { posts, gists };
