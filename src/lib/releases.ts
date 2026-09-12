/**
 * Build-time GitHub release resolver.
 *
 * Used by product pages whose frontmatter declares a `downloadRepo`
 * (e.g. "thatbeautifuldream/murmur"). Resolves the newest published
 * release — including pre-releases, since GitHub's `/releases/latest`
 * endpoint only points at stable releases — and returns its installer
 * asset URL plus the metadata the marketing copy needs.
 *
 * The asset to look for depends on the product's `downloadTarget`
 * ("macos" ships a `.dmg`, "android" an `.apk`), so a product only ever
 * links the installer its own platform can open.
 *
 * The result is cached per build, so calling it from both the product
 * page and the `/download` route issues a single API request per repo.
 * If the API is unreachable or rate-limited, `null` is returned and
 * callers fall back to the releases index page. Set `GITHUB_TOKEN` to
 * raise the unauthenticated 60 req/hour build-time ceiling.
 */
export type DownloadTarget = "macos" | "android";

export const downloadTargets = {
  macos: {
    extension: ".dmg",
    label: "Download for macOS",
    icon: "ri:apple-fill",
  },
  android: {
    extension: ".apk",
    label: "Download for Android",
    icon: "ri:android-fill",
  },
} as const satisfies Record<
  DownloadTarget,
  { extension: string; label: string; icon: string }
>;

export type GithubRelease = {
  /** Raw release tag, e.g. "v0.0.1". */
  tag: string;
  /** Tag with a leading `v` stripped, e.g. "0.0.1". */
  version: string;
  /** Human release title, may be null. */
  name: string | null;
  /** Whether GitHub marks the release as a pre-release. */
  prerelease: boolean;
  /** ISO timestamp the release was published. */
  publishedAt: string;
  /** The release's HTML page on github.com. */
  htmlUrl: string;
  /** Direct browser_download_url for the target's installer asset, if present. */
  assetUrl: string | null;
};

type RawRelease = {
  tag_name: string;
  name: string | null;
  prerelease: boolean;
  published_at: string;
  html_url: string;
  assets: Array<{ name: string; browser_download_url: string }>;
};

const cache = new Map<string, GithubRelease | null>();

export function parseRepo(downloadRepo: string): {
  owner: string;
  repo: string;
} {
  const parts = downloadRepo.split("/");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(
      `Invalid downloadRepo "${downloadRepo}". Expected "owner/repo".`,
    );
  }
  return { owner: parts[0], repo: parts[1] };
}

export function repoReleasesUrl(downloadRepo: string): string {
  const { owner, repo } = parseRepo(downloadRepo);
  return `https://github.com/${owner}/${repo}/releases`;
}

export function repoTagUrl(downloadRepo: string, tag: string): string {
  const { owner, repo } = parseRepo(downloadRepo);
  return `https://github.com/${owner}/${repo}/releases/tag/${tag}`;
}

export async function getLatestRelease(
  downloadRepo: string,
  target: DownloadTarget = "macos",
): Promise<GithubRelease | null> {
  const cacheKey = `${downloadRepo}#${target}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  const { extension } = downloadTargets[target];
  const { owner, repo } = parseRepo(downloadRepo);
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "milindmishra.com",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases?per_page=10`,
      { headers },
    );
    if (!res.ok) {
      throw new Error(`GitHub releases API responded ${res.status}`);
    }
    const releases = (await res.json()) as RawRelease[];
    const hasAsset = (release: RawRelease) =>
      release.assets.some((asset) =>
        asset.name.toLowerCase().endsWith(extension),
      );
    // GitHub returns newest-first by created_at. Prefer the newest release
    // that actually ships the target's installer, otherwise fall back to the
    // newest so the page still links somewhere useful.
    const latest = releases.find(hasAsset) ?? releases[0];

    if (!latest) {
      cache.set(cacheKey, null);
      return null;
    }

    const asset = latest.assets.find((candidate) =>
      candidate.name.toLowerCase().endsWith(extension),
    );
    const result: GithubRelease = {
      tag: latest.tag_name,
      version: latest.tag_name.replace(/^v/, ""),
      name: latest.name,
      prerelease: latest.prerelease,
      publishedAt: latest.published_at,
      htmlUrl: latest.html_url,
      assetUrl: asset ? asset.browser_download_url : null,
    };
    cache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn(
      `[releases] could not resolve latest release for ${downloadRepo}:`,
      err,
    );
    cache.set(cacheKey, null);
    return null;
  }
}
