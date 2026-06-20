// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://milindmishra.com',

  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Google Sans Code',
      cssVariable: '--font-google-sans-code',
      weights: ['300 800'],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'Libre Baskerville',
      cssVariable: '--font-libre-baskerville',
      weights: [400, 700],
      styles: ['normal', 'italic'],
    },
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },

  integrations: [mdx(), sitemap()],
});