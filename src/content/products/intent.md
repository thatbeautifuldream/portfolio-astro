---
name: "Intent"
tagline: "A text-only Android launcher. No icons, no widgets, no grid — every app you open should be one."
description: "Intent replaces your Android home screen with a single alphabetical list of app names. There is no icon grid to scan, no widgets, no wallpaper, no search field to fill in — just the apps you have, in black and white, one tap away. Swipe a row right to pin it to the top or open its app info. Built with Expo and React Native on top of a local Kotlin launcher module, so package changes arrive from the system instead of being polled. No account, no cloud, no analytics. Intent is pre-release software and ships as a direct APK download."
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
screenshotUrls: []
publishedAt: "2026-09-11"
features:
  - title: "Every app as a line of text"
    description: "One alphabetical list of app names, including apps in a work profile. Nothing to recognise by colour, nothing to hunt for in a grid, no folders to maintain. You read the name and you tap it."
  - title: "Swipe right to pin or inspect"
    description: "A right swipe slides the row aside to uncover two actions underneath it: pin the app to the top of the list, or open its system app info. Most recently pinned lands first, so the app you just pinned is the one at the top."
  - title: "Home means a clean home screen"
    description: "Pressing the device home button closes any open row and scrolls the list back to the top. Back does nothing at all — the launcher stays exactly where it is instead of unwinding through a history you never asked for."
  - title: "The list is never stale"
    description: "Android tells the launcher when packages are installed, updated, or removed, so the list is rebuilt exactly when it changes and never polled. An uninstalled app leaves straight away with a short exit animation while the rows below it close the gap."
  - title: "Edge fades that follow the scroll"
    description: "The fade at each edge tracks scroll position rather than sitting there permanently. At rest the top is crisp and the bottom hints at more content; at the end of the list the bottom sharpens again."
  - title: "Black, dark only, no flash"
    description: "A pure black launcher with no wallpaper, which means no wallpaper flash on the home gesture. Reduced-motion settings are respected, so the animations step aside when the system asks them to."
privacyPoints:
  - "Intent has no network code of its own — no account, no sign-up, no analytics, and no third-party telemetry SDKs."
  - "The list of installed apps is read from Android's own package manager and never leaves the device."
  - "Pinned apps are stored in a local SQLite database inside the app's private storage."
  - "Intent requests no runtime permissions: no contacts, location, camera, microphone, or storage access."
  - "Uninstalling Intent removes the app and its pin list immediately."
privacyHeadline: "Your home screen stays on your phone."
privacyHeadlineHighlight: "on your phone"
privacyOverview: "Intent is built privacy-first. It reads the list of installed apps from Android's package manager, keeps your pinned apps in a local SQLite database, and does nothing else. There is no server, no account, and no analytics, and the app requests no runtime permissions."
privacyRetention: "The only thing Intent stores is the order of your pinned apps, in a local SQLite database inside the app's private storage. Unpinning an app removes it from that list, and uninstalling an app drops it automatically. Uninstalling Intent deletes the database with it. There is no server-side copy to delete because nothing was ever uploaded."
dataCollected: "None. Intent does not collect, transmit, or share any personal data, and runs no analytics. The list of installed apps is read locally through Android's LauncherApps API to draw the home screen, and your pin order is written to a local database."
thirdParties:
  - "Android LauncherApps, PackageManager, and UserManager, system APIs used locally to list installed apps, launch them into the right profile, and open their app info. Nothing is sent to Google or any third party."
  - "Expo and React Native, used to build the app. The packaged APK contains no analytics or update service and does not phone home."
  - "SQLite (expo-sqlite), used for local on-device storage of your pinned apps only. No sync, no backup service."
policyUpdatedAt: "2026-09-11"
faq:
  - question: "What does Intent do?"
    answer: "Intent replaces your Android home screen with a single alphabetical list of app names. Tapping a name launches the app. Swiping a row right reveals two actions: pin the app to the top of the list, or open its system app info. There is no icon grid, no widget support, and no wallpaper."
  - question: "How do I make Intent my home screen?"
    answer: "Open Intent and select Set as default, then approve Intent in the system dialog Android shows. Press the device home button and you should land back in the list. If the prompt does not appear, set it manually under Settings, Apps, Default apps, Home app."
  - question: "How do I install the APK?"
    answer: "Download the APK from the download link and open it on your phone. Android will warn you about installing an app from outside the Play Store and ask you to allow installs from your browser or file manager once. Approve it and the install proceeds normally."
  - question: "Does Intent have an app search?"
    answer: "Not yet. The list is alphabetical and pinned apps sit at the top, which is enough for most libraries. Search is the obvious next thing and is not in this build."
  - question: "Does it support widgets, folders, or icon packs?"
    answer: "No, and that is the point. Intent is a text-only launcher: no icons, no widgets, no grid, no folders, no wallpaper. If you want any of those, a conventional launcher will serve you better."
  - question: "What happens to apps in my work profile?"
    answer: "They appear in the same list. Intent reads the current user plus any managed profile, and a package that exists in both profiles gets a row for each, launched into the profile that owns it."
  - question: "Why does the back button do nothing?"
    answer: "A launcher is the bottom of the stack, so there is nowhere sensible for back to go. Pressing home is what resets the launcher: it closes any open row and scrolls the list back to the top."
  - question: "Is Intent on the Play Store?"
    answer: "Not yet. The current build is distributed as a direct APK download from GitHub releases, and the download link on this site always points at the newest one."
  - question: "Are there accounts, subscriptions, or ads?"
    answer: "No accounts, no sign-up, no in-app purchases, no subscriptions, and no advertising SDKs. Intent is free and open source."
permissions:
  - "No runtime permissions are requested. Intent asks for no contacts, location, camera, microphone, or storage access."
  - "Default home app, granted by you when you select Set as default, so pressing the device home button opens Intent."
  - "Query all installed packages, a manifest-level declaration every launcher needs in order to list the apps on your phone."
requirements:
  - "An Android phone. Intent is Android only; there is no iOS build."
  - "Permission to install an APK from outside the Play Store, granted once when you open the downloaded file."
  - "Pre-release software. Expect rough edges and breaking changes between versions."
supportEmail: "hey@milindmishra.com"
supportLinks:
  - label: "Privacy policy"
    href: "/intent/privacy"
  - label: "GitHub releases"
    href: "/intent"
  - label: "Download the latest APK"
    href: "/intent/download"
---

Intent replaces your Android home screen with a single alphabetical list of app names. No icon grid to scan, no widgets, no wallpaper, no folders to maintain. You read the name and you tap it, and every app you open is one you meant to open.

It is built with Expo SDK 57 and React Native on top of a local Kotlin module that talks to Android's `LauncherApps` API directly. The system tells the launcher when packages are installed, updated, or removed, so the list is rebuilt exactly when it changes and never polled.

## How it works

- **Tap a name** to launch the app, in whichever profile owns it.
- **Swipe a row right** to uncover two actions: pin the app to the top, or open its system app info.
- **Press home** to close any open row and scroll back to the top of the list.
- **Back does nothing.** A launcher is the bottom of the stack, so there is nowhere for it to go.

Pinned apps are kept in a small local SQLite database, most recently pinned first, so the app you just pinned is the one at the top. When an app is uninstalled its row leaves straight away with a short exit animation, the rows below it close the gap, and it drops out of the pin order at the same time.

## Installing

Intent is distributed as a direct APK download from GitHub releases. Download it, open the file on your phone, and approve the one-time prompt Android shows for installing an app from outside the Play Store. Then open Intent, select **Set as default**, and approve it as your home app.

## Pre-release software

Intent is at `0.0.1`. There is no app search yet, no Play Store listing, and the app will change in ways that are not backward compatible between versions. The source and every release live on GitHub.

## Private by design

No account. No sign-up. No analytics. No third-party telemetry. Intent has no network code of its own: the app list is read from Android's package manager, your pin order is written to a local database, and neither leaves the phone. It requests no runtime permissions at all.

## Free, with no catch

No subscriptions. No in-app purchases. No ads. Open source on GitHub. Just a home screen that gets out of the way.
