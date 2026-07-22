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
      /**
       * GitHub "owner/repo" for products distributed as native downloads.
       * When set, the product page shows a macOS download button and a
       * `/{product}/download` route is generated that redirects to the
       * newest release's `.dmg` asset (resolved at build time, pre-releases
       * included). Falls back to the releases page if the API is unreachable.
       */
      downloadRepo: z.string().optional(),
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
      /**
       * Optional privacy-policy narrative. Each product can carry its own
       * accurate posture (shotty is fully on-device; murmur has an Apple
       * Speech framework caveat). When omitted, the template falls back to
       * generic, product-agnostic copy so every product gets a sane policy.
       */
      privacyHeadline: z.string().optional(),
      privacyHeadlineHighlight: z.string().optional(),
      privacyOverview: z.string().optional(),
      privacyRetention: z.string().optional(),
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

export const collections = { posts, gists, products, uses };
