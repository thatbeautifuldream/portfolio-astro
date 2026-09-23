---
name: "JSON Visualiser"
tagline: "Paste a payload, read it properly. Format, validate, explore, and type your JSON in the browser."
description: "JSON Visualiser is an editor and tree viewer for the JSON you deal with every day. Paste an API response, a config file, or a log line, and it is validated as you type, formatted in one keystroke, and explorable as a collapsible tree. It turns escaped strings back into JSON, generates TypeScript types from any payload, and ships with a Chrome extension that opens raw JSON responses straight into the workspace. No account, no analytics, no server."
category: "Developer Tools"
keywords:
  - json
  - json viewer
  - json formatter
  - json validator
  - json editor
  - json tree
  - json to typescript
  - unescape json
  - pretty print json
  - minify json
  - chrome extension
  - api response
  - codemirror
  - developer tools
pricing: "Free"
platforms:
  - Web
  - Chrome
websiteUrl: "https://json.milind.app/"
screenshotUrls: []
publishedAt: "2025-07-27"
features:
  - title: "Validation as you type"
    description: "The editor is CodeMirror 6 with JSON syntax highlighting and a live linter. A missing comma or a stray quote is underlined where it happens, so you fix the payload instead of hunting for it."
  - title: "Format, minify, copy, clear"
    description: "One click pretty prints the document, another collapses it to a single line. Cmd or Ctrl and S formats from anywhere in the editor, which is the shortcut your hands already reach for."
  - title: "Unescape in one click"
    description: "Paste the string your logger double encoded, all backslashes and quoted quotes, and Unescape turns the escape sequences back into real JSON you can read and format."
  - title: "A tree you can walk"
    description: "Once the document is valid, the Tree View opens it as a collapsible tree. Fold the parts you do not care about and drill into the one nested key you do."
  - title: "TypeScript types from any payload"
    description: "Generate Types reads the current document and writes the matching TypeScript interfaces, nested objects included. Copy them into your codebase and stop typing out response shapes by hand."
  - title: "Open raw responses from Chrome"
    description: "The Chrome extension sends the JSON you are looking at in the browser, and the URL it came from, into the workspace. Large responses are streamed across in chunks and formatted as they land."
privacyPoints:
  - "Parsing, validation, formatting, and type generation all run in your browser."
  - "Your workspace is saved in the browser's IndexedDB, one document per tab."
  - "No account, no sign-up, no analytics, and no server that receives your JSON."
  - "Workspace state for closed tabs is cleaned up automatically."
privacyHeadline: "Your JSON stays in your browser."
privacyOverview: "JSON Visualiser is a static web app. The JSON you paste or load is parsed, validated, and rendered by code running in your own browser, and the workspace is saved in your browser's storage so a refresh does not lose it. There is no account, no analytics, and no backend that receives your content."
privacyRetention: "Each tab keeps its document in the browser's IndexedDB, keyed by a tab identifier held in session storage. When a tab closes, its saved state is removed after a short grace period. You can wipe everything at any time by clearing site data for json.milind.app in your browser settings."
dataCollected: "None. JSON Visualiser does not collect, transmit, or share personal data, and runs no analytics. When you use the Chrome extension, the JSON and its source URL are passed from the extension to the JSON Visualiser page in your browser and saved locally with that tab's document."
thirdParties:
  - "Vercel, which hosts the static site. Like any web host it serves the page and may keep standard request logs. Your JSON is never sent to it."
  - "The JSON Visualiser Chrome extension, which hands JSON from the page you are viewing to the workspace inside your browser."
policyUpdatedAt: "2026-09-24"
faq:
  - question: "Is my JSON uploaded anywhere?"
    answer: "No. The page is served as static files, and everything after that, parsing, validation, the tree view, and type generation, happens in your browser. Your documents are saved in your browser's IndexedDB."
  - question: "Does it work offline?"
    answer: "Yes. JSON Visualiser installs as a progressive web app and caches itself, so once it has loaded you can open it and keep working without a connection."
  - question: "Why is the Tree View missing?"
    answer: "The Tree View only appears when the document is valid JSON. Fix the error the editor underlines and the tab comes back."
  - question: "What does Unescape do?"
    answer: "It replaces JSON escape sequences, such as backslash n, backslash t, and escaped quotes and backslashes, with the characters they stand for. It is meant for JSON that was stringified twice, which is common in logs and message queues."
  - question: "Which languages can Generate Types produce?"
    answer: "TypeScript interfaces. Nested objects become their own named interfaces, and arrays are typed from their items."
  - question: "How do I use the Chrome extension?"
    answer: "Install JSON Visualiser from the Chrome Web Store. When you land on a raw JSON response, send it to the workspace and it opens formatted, with the source URL kept alongside the document."
  - question: "Can I have more than one document open?"
    answer: "Yes. Every browser tab keeps its own document, so you can compare two payloads side by side in two tabs without one overwriting the other."
permissions:
  - "None for the web app. It asks for no camera, microphone, location, notifications, or file system access."
  - "The Chrome extension reads the JSON on the page you choose to send, so it can open it in the workspace."
requirements:
  - "A modern browser. Chrome, Edge, Firefox, and Safari all work."
  - "Chrome, for the browser extension."
supportEmail: "hey@milindmishra.com"
supportLinks:
  - label: "Open JSON Visualiser"
    href: "https://json.milind.app/"
  - label: "Chrome extension"
    href: "https://chromewebstore.google.com/detail/json-visualiser/ahamfjjhmjpiiogljnpgogegjcecmmll"
  - label: "Privacy policy"
    href: "/json-visualiser/privacy"
  - label: "Source on GitHub"
    href: "https://github.com/thatbeautifuldream/jsonvisualiser"
---

JSON Visualiser started as the tab I kept open next to every API I was debugging. Paste a payload, see it formatted, see where it breaks, fold the parts that do not matter. It has grown a few sharp tools since, but it still opens straight to an empty editor, because that is the only screen the job needs.

It is a static app on [json.milind.app](https://json.milind.app/). There is no login and no backend. The editor is CodeMirror 6, the tree is a collapsible viewer over the parsed document, and your work is saved in the browser so a refresh or a crash does not cost you anything.

## How it works

- **Paste or type** JSON into the editor. Errors are underlined as you go.
- **Format** with the toolbar or Cmd or Ctrl and S. **Minify** when you need it back on one line.
- **Unescape** a double encoded string, then format it like any other document.
- Switch to **Tree View** to walk the structure, or **Generate Types** to get TypeScript interfaces for it.

## From the browser, straight in

The [Chrome extension](https://chromewebstore.google.com/detail/json-visualiser/ahamfjjhmjpiiogljnpgogegjcecmmll) closes the loop. Hit a raw JSON endpoint, send it to JSON Visualiser, and the response opens formatted with the URL it came from. Big responses are streamed across in chunks and formatted as they land.

## One document per tab

Every tab keeps its own document in IndexedDB. Open two tabs to compare two responses, close one and its state is cleaned up a few seconds later. It also installs as a progressive web app and works offline once it has loaded.

## Free, with no catch

No account. No analytics. No ads. Open source on [GitHub](https://github.com/thatbeautifuldream/jsonvisualiser). Just a fast place to read JSON.
