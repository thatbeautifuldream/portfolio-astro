import en from "./en";
import hi from "./hi";

export const locales = {
  en: { name: "English", ogLocale: "en_US", dateLocale: "en-US" },
  hi: { name: "हिन्दी", ogLocale: "hi_IN", dateLocale: "hi-IN" },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "en";

const dictionaries = { en, hi };

// Pages with a translated version. Everything else (posts, gists, project and
// uses entries, API docs) stays English-only.
export const translatedPaths = [
  "/",
  "/work",
  "/talks",
  "/contact",
  "/privacy",
  "/blog",
  "/gist",
  "/project",
  "/uses",
];

export function getLocale(current?: string): Locale {
  return current && current in locales ? (current as Locale) : defaultLocale;
}

export function useTranslations(locale: Locale) {
  return dictionaries[locale];
}

export function stripLocale(path: string) {
  const match = path.match(/^\/(\w+)(\/.*)?$/);
  if (match && match[1] !== defaultLocale && match[1]! in locales) {
    return match[2] || "/";
  }
  return path;
}

export function isTranslated(path: string) {
  return translatedPaths.includes(path.replace(/(.)\/$/, "$1"));
}

export function localizePath(path: string, locale: Locale) {
  if (locale === defaultLocale || !isTranslated(path)) return path;
  return `/${locale}${path}`;
}
