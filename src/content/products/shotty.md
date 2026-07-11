---
name: "Shotty"
tagline: "Your screenshots are out of control. Shotty turns them into a clean, searchable inbox."
description: "Shotty reads every screenshot on your iPhone or iPad, pulls out the text, and builds a private index you can search in an instant. Type a name, a number, a place, or a single word, and the right screenshot shows up right away. Everything happens on the device. No server, no cloud, no account, no API."
category: "Productivity"
keywords:
  - screenshot
  - organizer
  - manager
  - search
  - find
  - scan
  - receipt
  - ocr
  - text
  - tag
  - vision
  - photo
  - library
  - sort
  - index
pricing: "Free"
platforms:
  - iPhone
  - iPad
appStoreUrl: ""
screenshotUrls:
  - "https://cdn.milind.app/media/products/shotty/screenshots/iphone/iphone-dark-01.webp"
  - "https://cdn.milind.app/media/products/shotty/screenshots/iphone/iphone-dark-02.webp"
  - "https://cdn.milind.app/media/products/shotty/screenshots/iphone/iphone-dark-03.webp"
publishedAt: "2025-07-12"
features:
  - title: "Search the words inside your screenshots"
    description: "Open Shotty and start typing. It matches against tags, filenames, and the actual text inside the image, then ranks the results so the best match is on top. Each result tells you why it matched, so you always know what is going on."
  - title: "Smart tags, suggested automatically"
    description: "Shotty looks at each screenshot and suggests tags based on what is in it. Receipts get tagged as receipts. Boarding passes as tickets. Code snippets as code. Tap to accept a suggestion, or hide the ones you do not want to see."
  - title: "A real fullscreen viewer"
    description: "Tap any screenshot to open it fullscreen. Pinch to zoom up to 6x, double tap to jump in, pan around, and swipe down to dismiss. Quick and smooth."
  - title: "Copy text in one tap"
    description: "Every screenshot shows the text that was detected, and you can copy the whole thing with a single tap. Paste it into a note, a message, a chat, or wherever you need it."
  - title: "Delete what you do not need"
    description: "If a screenshot has outlived its usefulness, delete it from Photos straight inside Shotty. The local index gets cleaned up at the same time. No juggling two apps."
  - title: "Always fresh"
    description: "Shotty keeps your index up to date automatically. Every time you open the app, it checks Photos for new screenshots and indexes them in the background. Capture something new, and it shows up in your inbox seconds later."
privacyPoints:
  - "All OCR runs on device with Apple Vision."
  - "All language tagging runs on device with NaturalLanguage."
  - "All storage is local SwiftData."
  - "No analytics, no tracking, no account."
  - "Shotty only reads the screenshots you let it see."
dataCollected: "None. Shotty does not collect, transmit, or share any personal data. There is no server, no cloud, no account, no API, and no analytics. Your screenshots and the index built from them never leave your device."
thirdParties:
  - "Apple Vision and NaturalLanguage, system frameworks that run entirely on your device to perform OCR and language tagging. No data is sent to Apple or any third party."
  - "SwiftData, used for local on-device storage only. No iCloud sync, no CloudKit."
  - "Photos (PhotosUI / PhotoKit), Apple system framework used to read and delete screenshots you choose. No photos are uploaded."
policyUpdatedAt: "2025-07-12"
faq:
  - question: "What does Shotty do?"
    answer: "Shotty is a private, on-device screenshot organizer. It scans your Photos library for screenshots, runs Vision OCR and NaturalLanguage tagging on each one, and stores the result in a local index. You can then search screenshots by the words inside them, accept or hide suggested tags, add your own tags, view screenshots fullscreen, copy extracted text, and delete screenshots."
  - question: "Why does Shotty need Photos access?"
    answer: "Shotty reads screenshots from your Photos library and needs Full or Limited Photos access to index them. ReadWrite access is requested because deleting a screenshot from inside Shotty is supported. No photos are uploaded anywhere."
  - question: "The Inbox looks empty. Is something wrong?"
    answer: "If your Photos library has no screenshots, Shotty will show an empty Inbox by design. Shotty only reads assets with the screenshot media subtype, regular photos and videos are ignored. Take at least one screenshot on the device, reopen Shotty, and it will be indexed in the background."
  - question: "How does search rank results?"
    answer: "Results rank by tag match, filename, suggested tag, full extracted text, then word match. Each result shows the reason it matched so you can tell why a screenshot surfaced."
  - question: "Does Shotty upload my screenshots anywhere?"
    answer: "No. Everything happens on device. There is no server, no cloud, no account, no API, no analytics, and no SDK that phones home, verifiable with a network proxy. OCR runs through Apple Vision and language tagging through NaturalLanguage, all locally."
  - question: "Are there accounts, subscriptions, or ads?"
    answer: "No accounts, no sign-up, no in-app purchases, no subscriptions, no paywalls, and no advertising SDKs. Shotty is free."
  - question: "What devices does Shotty run on?"
    answer: "iPhone and iPad."
  - question: "What happens if I deny Photos access?"
    answer: "Shotty shows a permission card with an Allow Photos Access button. Tapping it reopens the system prompt, or opens system Photos settings if Limited access was chosen. No crash, no empty screen without explanation."
permissions:
  - "Photos (Full or Limited access), required to read screenshots and to support deleting them. No photos leave the device."
  - "No camera, microphone, location, contacts, or other permissions are requested."
requirements:
  - "iPhone and iPad"
  - "At least one screenshot in Photos to see content in the Inbox"
supportEmail: "hey@milindmishra.com"
supportLinks:
  - label: "Privacy policy"
    href: "/shotty/privacy"
  - label: "App Store"
    href: "/shotty"
---

Shotty reads every screenshot on your iPhone or iPad, pulls out the text, and builds a private index you can search in an instant. Type a name, a number, a place, or a single word, and the right screenshot shows up right away.

Everything happens on the device. No server, no cloud, no account, no API. Your screenshots never leave your phone.

## What Shotty recognizes today

- Receipts and amounts
- Invoices and billing
- Tickets, boarding passes, and bookings
- Code, stack traces, and developer snippets
- Social posts, handles, and hashtags
- Recipes and ingredients
- Addresses and places
- Errors, exceptions, and crash logs

You finally find that receipt, that address, that flight ticket, or that funny tweet from two years ago.

## Built for iPhone and iPad

Shotty works great on iPhone and scales up nicely on iPad. The whole interface is built with SwiftUI, supports Dynamic Type, and respects your accessibility settings.

## Free, with no catch

No subscriptions. No in-app purchases. No ads. No data leaving your device. Just a clean, fast way to find the screenshots you already took.
