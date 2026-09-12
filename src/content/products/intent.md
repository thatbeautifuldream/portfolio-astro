---
name: "Intent"
tagline: "A text-only Android launcher. No icons, no widgets, no grid."
description: "Intent replaces your Android home screen with one alphabetical list of app names. Tap a name to open the app. Swipe a row right to pin it or open its app info. Free, open source, and installed from a direct APK download."
category: "Productivity"
keywords:
  - android launcher
  - text launcher
  - minimal launcher
  - minimalist home screen
  - no icons
  - list launcher
  - distraction free
  - digital wellbeing
  - home screen replacement
  - app drawer
  - dark launcher
  - apk
  - expo
  - react native
  - kotlin
pricing: "Free"
platforms:
  - Android
appStoreUrl: ""
downloadRepo: "thatbeautifuldream/intent"
downloadTarget: "android"
screenshotUrls:
  - "https://raw.githubusercontent.com/thatbeautifuldream/intent/main/assets/screenshots/list.png"
  - "https://raw.githubusercontent.com/thatbeautifuldream/intent/main/assets/screenshots/actions.png"
  - "https://raw.githubusercontent.com/thatbeautifuldream/intent/main/assets/screenshots/pinned.png"
screenshotSize:
  width: 1080
  height: 2340
publishedAt: "2026-09-11"
features:
  - title: "Every app as a line of text"
    description: "One alphabetical list of app names, work profile apps included. Nothing to recognise by colour, no folders to maintain."
  - title: "Swipe right to pin"
    description: "A right swipe uncovers two actions: pin the app to the top of the list, or open its system app info."
  - title: "Home resets the list"
    description: "Pressing home closes any open row and scrolls back to the top. Back does nothing, so the launcher stays where it is."
  - title: "Always current"
    description: "Android tells the launcher when apps are installed or removed, so the list is never polled and never stale."
privacyPoints:
  - "No account, no analytics, no network code of any kind."
  - "The app list is read from Android and never leaves the device."
  - "Pinned apps are stored in a local database."
  - "No runtime permissions are requested."
privacyHeadline: "Your home screen stays on your phone."
privacyHeadlineHighlight: "on your phone"
privacyOverview: "Intent reads your installed apps from Android and keeps your pinned apps in a local database. There is no server, no account, and no analytics, and the app requests no runtime permissions."
privacyRetention: "The only thing Intent stores is your pin order, in a local database inside the app's private storage. Uninstalling Intent deletes it. There is no server-side copy because nothing is uploaded."
dataCollected: "None. Intent collects, transmits, and shares nothing. The app list is read locally to draw the home screen, and your pin order is written to a local database."
thirdParties:
  - "Android system APIs, used locally to list apps, launch them, and open their app info."
  - "Expo and React Native, used to build the app. The APK contains no analytics and does not phone home."
  - "SQLite, used for local storage of your pinned apps only."
policyUpdatedAt: "2026-09-11"
faq:
  - question: "How do I make Intent my home screen?"
    answer: "Open Intent, select Set as default, and approve it in the dialog Android shows. You can also set it under Settings, Apps, Default apps, Home app."
  - question: "How do I install the APK?"
    answer: "Download the APK and open it on your phone. Android asks you once to allow installs from your browser or file manager. Approve it and the install proceeds normally."
  - question: "Is there an app search?"
    answer: "Not yet. The list is alphabetical and pinned apps sit at the top."
  - question: "Does it support widgets, folders, or icon packs?"
    answer: "No. Intent is text only. If you want any of those, a conventional launcher will suit you better."
  - question: "What about work profile apps?"
    answer: "They appear in the same list and launch into the profile that owns them."
  - question: "Is Intent on the Play Store?"
    answer: "Not yet. It is distributed as a direct APK download, and the link on this site always points at the newest release."
permissions:
  - "No runtime permissions. Intent asks for no contacts, location, camera, microphone, or storage access."
  - "Default home app, granted by you so the home button opens Intent."
  - "Query installed packages, a manifest declaration every launcher needs to list your apps."
requirements:
  - "An Android phone. There is no iOS build."
  - "Permission to install an APK outside the Play Store, granted once when you open the file."
  - "Pre-release software. Expect rough edges between versions."
supportEmail: "hey@milindmishra.com"
supportLinks:
  - label: "Privacy policy"
    href: "/intent/privacy"
  - label: "GitHub releases"
    href: "/intent"
  - label: "Download the latest APK"
    href: "/intent/download"
---

Intent replaces your Android home screen with one alphabetical list of app names. No icon grid, no widgets, no wallpaper, no folders. You read the name and you tap it.

Built with Expo and React Native on a local Kotlin module that talks to Android's launcher APIs directly.

## How it works

- Tap a name to launch the app
- Swipe a row right to pin it or open its app info
- Press home to close any open row and scroll to the top
- Back does nothing, because a launcher is the bottom of the stack

## Installing

Download the APK, open it on your phone, and approve the one-time prompt Android shows. Then open Intent, select **Set as default**, and approve it as your home app.

## Pre-release

Intent is at `0.0.1`. No search yet, no Play Store listing, and breaking changes between versions. Source and releases are on GitHub.
