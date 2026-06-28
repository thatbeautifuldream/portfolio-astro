export const siteLinks = {
  primaryCta: { href: "/contact#book", label: "Book time" },
  resume: {
    href: "/resume",
    label: "View resume",
    pdf: "https://cdn.jsdelivr.net/gh/thatbeautifuldream/resume-tex/resume.pdf",
  },
  github: { href: "https://github.com/thatbeautifuldream", label: "GitHub" },
  linkedin: {
    href: "https://www.linkedin.com/in/mishramilind/",
    label: "LinkedIn",
  },
  x: { href: "https://x.com/milindmishra_", label: "X/Twitter" },
};

export const heroStats = [
  { label: "users across shipped products", value: "2m+" },
  { label: "products shipped from 0→1", value: "5+" },
  { label: "talks at React communities", value: "4*" },
];

export const roles = [
  {
    company: "Merlin AI by Foyer",
    role: "Product Engineer",
    period: "Feb 2025 to present",
    location: "Bengaluru, India",
    summary:
      "Product engineer on an AI SaaS, building interaction-heavy surfaces across chat, desktop coding agents, browser agents, onboarding, growth, and retention, and owning monetization end to end.",
    highlights: [
      "Shipped core AI SaaS workflows across chat, desktop coding agents, browser agents, onboarding, growth, and retention using React, TypeScript, and reusable frontend architecture.",
      "Built ChatGPT Imports, Projects, chat history, and prompt-driven workflows, helping users preserve context, organize conversations, and reuse AI outputs across sessions.",
      "Refactored design-system and component patterns across multiple product surfaces, improving accessibility, UI consistency, implementation speed, and frontend review quality.",
      "Owned billing, subscription, checkout, and payment flows, enabling pricing experiments, lifecycle state handling, customer account management, and monetization workflows.",
    ],
  },
  {
    company: "SARAL",
    role: "Software Engineer",
    period: "Dec 2024 to Feb 2025",
    location: "Bengaluru, India",
    summary:
      "Built internal tooling for influencer-marketing operations: analytics, creator workflows, and campaign execution.",
    highlights: [
      "Revamped internal analytics dashboards with React, TypeScript, and reusable UI patterns, giving growth and operations teams clearer visibility into customer workflows and campaign metrics.",
      "Built creator content submission and approval workflows, reducing manual coordination across operations, creators, and internal review teams during influencer campaigns.",
      "Implemented multi-select drag-and-drop bulk actions for campaign operations, reducing repetitive creator-management steps and improving internal workflow speed.",
    ],
  },
  {
    company: "Proof-of-Skill Protocol",
    role: "Founding Product Engineer",
    period: "Jun 2024 to Dec 2024",
    location: "Bengaluru, India",
    summary:
      "Built the frontend for a three-sided skill-assessment marketplace from ambiguous 0-to-1 requirements to launch.",
    highlights: [
      "Built the frontend for a 3-sided assessment marketplace across validators, candidates, and recruiters, turning ambiguous 0-to-1 product requirements into launch-ready workflows.",
      "Designed consensus-driven validation, assessment, and review experiences with clear UX states, scalable interaction patterns, and trust-focused decision flows.",
      "Built real-time recording, proctoring, API integrations, and candidate integrity workflows to support reliable remote skill assessment and evaluation.",
      "Owned frontend architecture, release execution, and deployment from prototype to launch, balancing speed, maintainability, and rapid product iteration.",
    ],
  },
  {
    company: "StartupHire",
    role: "Frontend Engineer (Lead)",
    period: "Aug 2023 to Jan 2024",
    location: "Remote",
    summary:
      "Led frontend delivery for an AI recruiting workflow SaaS, improving candidate pipeline management and recruiter productivity.",
    highlights: [
      "Led frontend delivery for a recruiting workflow SaaS platform, improving candidate pipeline management, hiring operations, and recruiter productivity.",
      "Integrated multiple job boards and application sources into a unified recruiter dashboard, centralizing candidate intake, workflows, and pipeline visibility.",
      "Shipped recruiting automation and GenAI-powered product features from planning to release, supporting recruiter screening, outreach, and pipeline management workflows.",
    ],
  },
  {
    company: "Locus Connect (NYCU)",
    role: "Frontend Engineer",
    period: "Jul 2022 to Jul 2023",
    location: "Hsinchu, Taiwan",
    summary:
      "Built frontend systems for a real-time 3D indoor-positioning platform, integrating IoT telemetry with interactive spatial visualization.",
    highlights: [
      "Built frontend systems for a real-time 3D indoor positioning platform, integrating IoT telemetry, location data, and interactive spatial visualization workflows.",
      "Developed real-time 3D indoor maps with React, Three.js, GSAP, state management, and rendering optimizations for smooth telemetry visualization.",
      "Improved indoor positioning accuracy from approximately 20cm to under 10cm through HDOP optimization, telemetry analysis, and iterative calibration.",
      "Managed production infrastructure with Docker, NGINX, load balancers, and networking configurations to keep real-time visualization environments stable.",
    ],
  },
];

export const projects = [
  {
    name: "imgzly",
    status: "Live",
    href: "https://imgzly.com",
    description:
      "Privacy-first, browser-based image toolkit that compresses, resizes, converts, crops, removes backgrounds, makes PDFs, and prepares form-ready photos, all processed locally on-device with no uploads or accounts.",
    metrics: [
      { label: "Processing", value: "100% on-device" },
      { label: "Formats", value: "JPG · PNG · WebP · AVIF" },
    ],
    highlights: [
      "Runs every operation locally in the browser so images never leave the user's device, with no sign-up or server uploads required.",
      "Bundles editing, format conversion, compression, HEIC-to-JPG, background removal, OCR, and EXIF/metadata tools into a single chained workflow.",
      "Batch-processes multiple images at once and exports the results as a ZIP, plus generators for favicons, Instagram grids, and contact sheets.",
    ],
    tags: [
      "TypeScript",
      "WebAssembly",
      "Canvas",
      "Image Processing",
      "Privacy",
    ],
  },
  {
    name: "JSON Visualiser",
    status: "Live",
    href: "https://jsonvisualiser.com",
    github: "https://github.com/thatbeautifuldream/jsonvisualiser",
    description:
      "JSON inspection and visualization tool for debugging deeply nested payloads across tree and grid views.",
    metrics: [
      { label: "Return rate", value: "43%" },
      { label: "Power user sessions", value: "49" },
    ],
    highlights: [
      "Built a unified inspection workflow that combines validation, formatting, and multi-view exploration for complex payloads.",
      "Implemented tree and grid renderers optimized for nested JSON structures with efficient expand and collapse interactions.",
    ],
    tags: ["React", "TypeScript", "D3.js"],
  },
  {
    name: "Markdown Visualizer",
    status: "Live",
    href: "https://markdownvisualizer.com",
    github: "https://github.com/thatbeautifuldream/markdownvisualizer",
    description:
      "Markdown editing and preview tool for fast iteration on technical writing workflows.",
    metrics: [],
    highlights: [
      "Built a low-latency editing and preview workflow to reduce context switching while drafting markdown-heavy content.",
      "Implemented rendering and editing utilities that keep technical writing workflows responsive and predictable.",
    ],
    tags: ["React", "TypeScript", "Markdown"],
  },
  {
    name: "attnui",
    status: "In progress",
    href: "https://attnui.com",
    github: "https://github.com/thatbeautifuldream/ui",
    description:
      "A passion project and my design engineering playground. A component library where I work through motion, interaction quality, and the small details that make interfaces feel finished.",
    metrics: [
      { label: "Components", value: "3" },
      { label: "Registry", value: "attnui.com/r/registry.json" },
    ],
    highlights: [
      "Where I experiment with interaction design, motion systems, and the craft I want to bring to every product I touch.",
      "Production-ready primitives built to raise my own bar for what polished frontend work looks like.",
    ],
    tags: ["React", "TypeScript", "Motion", "Design Systems"],
  },
];

export const talks = [
  {
    title: "Building a Component Distribution System with shadcn Registry",
    event: "React Bangalore",
    date: "Jan 31, 2026",
    href: "https://meetup.com/reactjs-bangalore/events/312620988",
    description:
      "A practical talk on shipping components with better distribution ergonomics.",
  },
  {
    title: "Mastering ViewTransition in React for Stunning UI Updates",
    event: "React Play Bengaluru",
    date: "Nov 15, 2025",
    href: "https://meetup.com/reactplay-bengaluru/events/311437528",
    description:
      "View transitions, UI continuity, and interaction-led motion in React.",
  },
  {
    title: "Building Real-Time Applications with Reactive Databases",
    event: "React Play Bengaluru",
    date: "May 17, 2025",
    href: "https://meetup.com/reactplay-bengaluru/events/307690438",
    description:
      "View transitions, UI continuity, and interaction-led motion in React.",
  },
  {
    title: "AI for React Developers",
    event: "React Bangalore",
    date: "April 12, 2025",
    href: "https://meetup.com/reactjs-bangalore/events/306320480",
    description:
      "A product-minded frontend intro to AI SDK workflows and patterns.",
  },
];

export const contributions = [
  {
    title: "Streamdown table copy and CSV / markdown download options",
    href: "https://github.com/vercel/streamdown/pull/99",
    context:
      "Improved utility and export affordances for markdown-heavy developer workflows.",
  },
  {
    title: "Streamdown code and image download affordances",
    href: "https://github.com/vercel/streamdown/pull/102",
    context: "Added more complete download behavior for rendered content.",
  },
  {
    title: "AI Elements speech-to-text prompt input",
    href: "https://github.com/vercel/ai-elements/pull/112",
    context:
      "Extended prompt input ergonomics in an AI-facing interface primitive set.",
  },
];

export const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/thatbeautifuldream",
    copy: "Open source work, side projects, and product experiments.",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mishramilind",
    copy: "Professional profile and current work context.",
  },
  {
    label: "X/Twitter",
    href: "https://x.com/milindmishra_",
    copy: "Thoughts, links, and occasional product or interface observations.",
  },
];

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/talks", label: "Talks" },
  { href: "/blog", label: "Blog" },
  { href: "/gist", label: "Gist" },
  { href: "/contact", label: "Contact" },
];

export const contactEmail = "milindmishra.work@gmail.com";

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function screenshotUrl(url: string): string {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
    "viewport.deviceScaleFactor": "2",
    waitForTimeout: "1500",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}
