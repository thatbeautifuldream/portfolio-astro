// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

import { getSitePage } from "./src/lib/seo";
import { stripLocale } from "./src/i18n";

function rehypeWrapTables() {
  /** @param {{ children?: any[] }} node */
  const wrap = (node) => {
    node.children?.forEach((child, i, children) => {
      if (child.tagName === "table") {
        children[i] = {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrap"] },
          children: [child],
        };
      } else {
        wrap(child);
      }
    });
  };
  return wrap;
}

const changefreqMap = {
  weekly: ChangeFreqEnum.WEEKLY,
  monthly: ChangeFreqEnum.MONTHLY,
};

// https://astro.build/config
export default defineConfig({
  site: "https://milindmishra.com",

  build: {
    // Inline all stylesheets so the critical CSS isn't a render-blocking request.
    inlineStylesheets: "always",
  },

  image: {
    // Generate srcset/sizes for every <Image> and Markdown image. Styling stays
    // with Tailwind (responsiveStyles left off so Astro's styles don't override
    // Tailwind's cascade-layer classes).
    layout: "constrained",
  },

  i18n: {
    locales: ["en", "hi"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },

  redirects: {
    "/whatsapp": "https://wa.me/919631333128",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["100 900"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.google(),
      name: "Noto Sans Devanagari",
      cssVariable: "--font-devanagari",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["devanagari"],
    },
  ],

  markdown: {
    rehypePlugins: [rehypeWrapTables],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "vesper",
      },
      wrap: false,
    },
  },

  integrations: [
    icon(),
    mdx(),
    sitemap({
      serialize(item) {
        const page = getSitePage(stripLocale(new URL(item.url).pathname));
        if (page) {
          item.changefreq = changefreqMap[page.changefreq];
          item.priority = page.priority;
        }
        return item;
      },
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", hi: "hi-IN" },
      },
      namespaces: {
        news: false,
        video: false,
      },
    }),
  ],
});
