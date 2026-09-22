// Shared Open Graph card style, matching the site.
export function ogImageOptions(page: { title: string; description?: string }) {
  return {
    title: page.title,
    description: page.description ?? "",
    bgGradient: [[253, 253, 252]] as [number, number, number][],
    border: { width: 0 },
    padding: 96,
    font: {
      title: {
        color: [17, 17, 17] as [number, number, number],
        size: 44,
        weight: "Medium" as const,
        lineHeight: 1.35,
        families: ["Inter"],
      },
      description: {
        color: [152, 152, 151] as [number, number, number],
        size: 44,
        weight: "Normal" as const,
        lineHeight: 1.35,
        families: ["Inter"],
      },
    },
    // CanvasKit can't read woff2, so OG cards use static TTF Inter instances.
    fonts: [
      "./src/assets/fonts/Inter-400.ttf",
      "./src/assets/fonts/Inter-500.ttf",
    ],
  };
}
