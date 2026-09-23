---
name: "Markdown Visualizer"
tagline: "Write Markdown on the left, read it on the right. Live preview with code, tables, and Mermaid diagrams."
description: "Markdown Visualizer is a split screen Markdown editor for READMEs, docs, changelogs, and notes. You write in the same Monaco editor that powers VS Code, and the preview renders as you type, with GitHub Flavored Markdown, highlighted code blocks, and Mermaid diagrams drawn inline. Resize the panes, expand either one with a shortcut, and pick up where you left off after a refresh. No account, and no backend of its own that stores your writing."
category: "Developer Tools"
keywords:
  - markdown
  - markdown editor
  - markdown preview
  - live preview
  - github flavored markdown
  - readme editor
  - mermaid
  - mermaid diagrams
  - code blocks
  - syntax highlighting
  - monaco editor
  - online markdown editor
  - documentation
  - developer tools
pricing: "Free"
platforms:
  - Web
websiteUrl: "https://md.milind.app/"
analytics: true
screenshotUrls: []
publishedAt: "2026-03-04"
features:
  - title: "The editor you already know"
    description: "Writing happens in Monaco, the editor inside VS Code, with Markdown syntax highlighting and the keyboard behaviour your hands expect. It follows your light or dark theme."
  - title: "A preview that keeps up"
    description: "The right pane re-renders on every keystroke. Headings, lists, blockquotes, tables, and task lists render the way GitHub renders them, so what you see is what your README will look like."
  - title: "Code and diagrams, rendered"
    description: "Fenced code blocks are syntax highlighted in the preview. A mermaid block is drawn as a real diagram, so flowcharts and sequence diagrams live next to the prose that explains them."
  - title: "Panes that get out of the way"
    description: "Drag the divider to resize. Cmd or Ctrl and E expands the editor to full width, Cmd or Ctrl, Shift, and P does the same for the preview, and pressing it again brings the split back."
  - title: "Nothing lost on refresh"
    description: "Each tab saves its document to the browser's IndexedDB as you type. Reload, close the laptop, come back, and your draft is still there."
  - title: "Works on a phone and offline"
    description: "On small screens the split becomes two tabs, Editor and Preview. It installs as a progressive web app and keeps working without a connection once it has loaded."
privacyPoints:
  - "Your Markdown is rendered in your browser. There is no backend that stores it."
  - "Drafts are saved in the browser's IndexedDB, one document per tab."
  - "No account and no sign-up."
  - "Google Analytics and Microsoft Clarity measure how the site is used. Clarity records sessions, which can include what is visible on screen, so avoid pasting anything sensitive."
privacyHeadline: "Your writing stays in your browser."
privacyOverview: "Markdown Visualizer is a static web app. Everything you write is rendered by code running in your own browser, and your draft is saved in your browser's storage so a refresh does not lose it. There is no account and no backend that receives your Markdown. The site does use Google Analytics and Microsoft Clarity to understand how it is used."
privacyRetention: "Each tab keeps its document in the browser's IndexedDB, keyed by a tab identifier held in session storage. When a tab closes, its saved state is removed after a short grace period. You can wipe everything at any time by clearing site data for md.milind.app in your browser settings. Analytics data is retained according to Google's and Microsoft's own policies."
dataCollected: "Usage analytics only. Google Analytics records page views and general device and browser information, and Microsoft Clarity records sessions, including clicks, scrolls, and what is visible on screen, which can include text in the editor and preview. Markdown Visualizer has no account and never asks for your name or email."
thirdParties:
  - "Google Analytics, used to measure page views and traffic. Processed under Google's privacy policy."
  - "Microsoft Clarity, used to understand how the editor is used. Processed under Microsoft's privacy statement."
  - "Vercel, which hosts the static site and may keep standard request logs."
policyUpdatedAt: "2026-09-24"
faq:
  - question: "Is my Markdown uploaded anywhere?"
    answer: "There is no backend that stores it. The editor and the preview both run in your browser, and your draft is saved in your browser's IndexedDB. The site does run Microsoft Clarity, whose session recordings can include what is on screen, so keep secrets out of it."
  - question: "Which Markdown features are supported?"
    answer: "GitHub Flavored Markdown, which covers headings, emphasis, lists, blockquotes, links, images, tables, task lists, and strikethrough, plus syntax highlighted code blocks and Mermaid diagrams."
  - question: "How do I draw a diagram?"
    answer: "Open a fenced code block with the language set to mermaid and write Mermaid syntax inside it. The preview draws the diagram in place."
  - question: "What are the keyboard shortcuts?"
    answer: "Cmd or Ctrl and E expands the editor. Cmd or Ctrl, Shift, and P expands the preview. Press the same shortcut again to return to the split view."
  - question: "Where did my draft go?"
    answer: "Drafts are saved per browser tab. If you closed the tab, its draft is cleaned up shortly after. Clearing site data in your browser also removes it."
  - question: "Does it work on mobile?"
    answer: "Yes. On narrow screens the editor and preview become two tabs you switch between."
  - question: "Can I use it offline?"
    answer: "Yes. It installs as a progressive web app and caches itself, so it keeps working without a connection once it has loaded."
permissions:
  - "None. Markdown Visualizer asks for no camera, microphone, location, notifications, or file system access."
requirements:
  - "A modern browser. Chrome, Edge, Firefox, and Safari all work."
supportEmail: "hey@milindmishra.com"
supportLinks:
  - label: "Open Markdown Visualizer"
    href: "https://md.milind.app/"
  - label: "Privacy policy"
    href: "/markdown-visualizer/privacy"
  - label: "Source on GitHub"
    href: "https://github.com/thatbeautifuldream/markdownvisualizer"
---

Markdown Visualizer is the younger sibling of [JSON Visualiser](/json-visualiser), built on the same bones for the other format I read all day. Write on the left, read on the right, and stop pushing a README three times to see whether the table lines up.

It is a static app on [md.milind.app](https://md.milind.app/). The editor is Monaco, the same one inside VS Code. The preview is rendered with Streamdown, which handles GitHub Flavored Markdown, highlights code, and draws Mermaid diagrams inline.

## How it works

- **Write** in the editor on the left. The preview on the right updates on every keystroke.
- **Drag** the divider to give either side more room.
- **Cmd or Ctrl and E** to expand the editor, **Cmd or Ctrl, Shift, and P** to expand the preview.
- **Copy** the whole document when you are done, or **Clear** to start fresh.

## Good for

- READMEs and project docs
- Changelogs and release notes
- Architecture notes with Mermaid diagrams
- Anything headed for GitHub, a docs site, or a static blog

## One draft per tab

Every tab keeps its own document in IndexedDB, so a refresh never costs you a draft and two tabs never overwrite each other. On a phone the split becomes two tabs, and it installs as a progressive web app that works offline.

## Free, with no catch

No account. No sign-up. No ads. Open source on [GitHub](https://github.com/thatbeautifuldream/markdownvisualizer). Just a clean place to write Markdown and see it rendered.
