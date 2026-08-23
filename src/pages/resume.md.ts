import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const prerender = true;

function resumeMarkdown(body: string) {
  const match = body.match(
    /^```markdown(?: title="resume\.md")?\n([\s\S]*?)\n```\s*$/,
  );
  return (match?.[1] ?? body).trim();
}

export const GET: APIRoute = async () => {
  const resume = (await getCollection("gists")).find(
    (item) => item.id === "resume",
  );
  const body = resume ? `${resumeMarkdown(resume.body ?? "")}\n` : "# Resume\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept, Accept-Encoding",
    },
  });
};
