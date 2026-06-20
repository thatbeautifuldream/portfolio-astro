export type SitePage = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
};

export const siteConfig = {
  name: "Milind Kumar Mishra",
  shortName: "Milind Mishra",
  tagline: "Product engineer building AI-native interfaces",
  description:
    "Product engineer building AI-native interfaces, product systems, and tools people return to.",
  url: "https://milindmishra.com",
  language: "en",
  locale: "en_US",
  themeColor: "#0a0a0a",
  defaultImage: "/icons/Icon-512.png",
  twitter: "@milindmishra_",
  sameAs: [
    "https://github.com/thatbeautifuldream",
    "https://www.linkedin.com/in/mishramilind/",
    "https://x.com/milindmishra_",
  ],
} as const;

export const sitePages = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/work", changefreq: "monthly", priority: 0.9 },
  { path: "/projects", changefreq: "monthly", priority: 0.9 },
  { path: "/blog", changefreq: "weekly", priority: 0.8 },
  { path: "/gist", changefreq: "weekly", priority: 0.8 },
  { path: "/talks", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
] satisfies SitePage[];

export const defaultKeywords = [
  "product engineer",
  "design engineer",
  "AI interfaces",
  "frontend engineer",
  "React",
  "motion design",
  "Milind Mishra",
];

export function normalizePath(path: string) {
  if (path === "/") return path;
  return path.replace(/\/$/, "");
}

export function getSitePage(path: string) {
  const normalized = normalizePath(path);
  if (normalized.startsWith("/blog/"))
    return { path: normalized, changefreq: "monthly", priority: 0.7 } as const;
  if (normalized.startsWith("/gist/"))
    return { path: normalized, changefreq: "monthly", priority: 0.6 } as const;
  return sitePages.find((page) => page.path === normalized);
}

export function getSiteOrigin(site?: URL | null) {
  return new URL(site?.toString() ?? siteConfig.url).origin;
}

export function absoluteUrl(path: string, site?: URL | null) {
  return new URL(path, `${getSiteOrigin(site)}/`).toString();
}

export function buildPersonSchema(site?: URL | null) {
  const origin = getSiteOrigin(site);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${origin}/`,
    image: absoluteUrl(siteConfig.defaultImage, site),
    jobTitle: "Product Engineer",
    description: siteConfig.description,
    sameAs: [...siteConfig.sameAs],
  };
}

export function buildWebsiteSchema(site?: URL | null) {
  const origin = getSiteOrigin(site);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: siteConfig.name,
    url: `${origin}/`,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${origin}/#person` },
  };
}
