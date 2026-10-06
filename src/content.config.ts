import { defineCollection, type SchemaContext } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const postSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    coverImage: image().optional(),
  });

const posts = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
  schema: postSchema,
});

const hiPosts = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/posts/hi" }),
  schema: postSchema,
});

const gistSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  datePublished: z.coerce.date().optional(),
  slug: z.string().optional(),
  tags: z.string().optional(),
  gistId: z.string(),
  gistUrl: z.string(),
  isPublic: z.boolean(),
});

const gists = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/gist" }),
  schema: gistSchema,
});

const hiGists = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/gist/hi" }),
  schema: gistSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    date: z.coerce.date(),
  }),
});

const uses = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/uses" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      url: z.string().optional(),
      date: z.coerce.date(),
      coverImage: image().optional(),
    }),
});

export const collections = {
  posts,
  hiPosts,
  gists,
  hiGists,
  projects,
  uses,
};
