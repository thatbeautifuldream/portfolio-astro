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

const products = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/products" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      description: z.string(),
      category: z.string(),
      keywords: z.array(z.string()).default([]),
      pricing: z.string().default("Free"),
      platforms: z.array(z.string()).default([]),
      appStoreUrl: z.string().optional(),
      icon: image().optional(),
      coverImage: image().optional(),
      screenshotUrls: z.array(z.string()).default([]),
      features: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        )
        .default([]),
      privacyPoints: z.array(z.string()).default([]),
      dataCollected: z.string().optional(),
      thirdParties: z.array(z.string()).default([]),
      policyUpdatedAt: z.coerce.date().optional(),
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          }),
        )
        .default([]),
      permissions: z.array(z.string()).default([]),
      requirements: z.array(z.string()).default([]),
      supportEmail: z.string().optional(),
      supportLinks: z
        .array(
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        )
        .default([]),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
    }),
});

export const collections = { posts, gists, products };
