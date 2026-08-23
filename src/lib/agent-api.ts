import { absoluteUrl, siteConfig } from "./seo";

export function buildProfileResponse(site?: URL | null) {
  return {
    type: "Person",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: absoluteUrl("/", site),
    jobTitle: siteConfig.currentRole.title,
    worksFor: {
      name: siteConfig.currentRole.company,
      url: siteConfig.currentRole.url,
    },
    location: siteConfig.location,
    knowsAbout: [
      "Product engineering",
      "AI-native interfaces",
      "Design engineering",
      "React",
      "TypeScript",
      "Motion design",
      "Design systems",
    ],
    sameAs: [...siteConfig.sameAs],
    contact: {
      email: siteConfig.email,
      contactType: "professional inquiries",
    },
    resources: {
      llms: absoluteUrl("/llms.txt", site),
      fullContext: absoluteUrl("/llms-full.txt", site),
      openapi: absoluteUrl("/openapi.json", site),
    },
  };
}

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": status >= 400 ? "no-store" : "public, max-age=3600",
    },
  });
}

export function apiError(
  code: string,
  message: string,
  hint: string,
  status: number,
) {
  return jsonResponse(
    {
      error: {
        code,
        message,
        hint,
      },
    },
    status,
  );
}
