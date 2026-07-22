---
name: "Murmur"
tagline: "System-wide dictation for macOS. Tap Option, talk, and the words land wherever your cursor is."
description: "Murmur is system-wide dictation for macOS. A small Swift speech daemon built on Apple's Speech framework runs behind a local loopback API, and an Electron and React desktop app spawns and manages it, so there is no separate service to run by hand. Tap Option anywhere to start talking, and the transcript is pasted into whatever app is frontmost. No account, no cloud, no telemetry. Murmur is pre-release software and currently ships as an Apple Silicon build."
category: "Productivity"
keywords:
  - dictation
  - speech to text
  - voice
  - transcription
  - macos
  - accessibility
  - microphone
  - sf speech
  - voice typing
  - speak to type
  - hands free
  - desktop app
  - electron
  - swift
pricing: "Free"
platforms:
  - macOS (Apple Silicon)
appStoreUrl: ""
downloadRepo: "thatbeautifuldream/murmur"
screenshotUrls: []
publishedAt: "2025-07-23"
features:
  - title: "Dictate into any app"
    description: "Tap Option anywhere on your Mac to start or stop dictation. The transcript is typed into whatever app is frontmost, your editor, a chat, a browser field, a note. There is nothing to switch to and nothing to paste."
  - title: "A real native speech backend"
    description: "Recognition is handled by a small Swift daemon built on Apple's Speech framework and AVAudioEngine, exposed over a loopback HTTP API on 127.0.0.1. The desktop app spawns and manages it as a child process, so the whole thing is one self-contained package with no separate service to run by hand."
  - title: "One self-contained package"
    description: "The compiled speech daemon is embedded inside the macOS app as an extra resource, and the Electron shell manages its lifecycle. Install Murmur, grant the permissions, and it just runs. Quit the app and the daemon goes with it."
  - title: "Built with a typed bridge"
    description: "The React renderer and Electron main process talk through a single strongly typed DesktopBridge contract, defined once and shared across both sides, so the renderer and native shell can never drift out of sync."
privacyPoints:
  - "Audio capture and speech recognition are performed by a local Swift daemon using Apple's Speech and AVAudioEngine frameworks."
  - "The speech daemon listens only on a loopback address (127.0.0.1); nothing it does is exposed to the network."
  - "Murmur has no account, no sign-up, no analytics, and no third-party telemetry SDKs."
  - "Transcripts are pasted straight into the frontmost app and are not stored by Murmur."
  - "Apple's Speech framework may process recognition requests according to Apple's own privacy policy; Murmur adds no server of its own."
privacyHeadline: "Your voice stays on your Mac."
privacyHeadlineHighlight: "on your Mac"
privacyOverview: "Murmur is built privacy-first. Audio is captured by a local Swift speech daemon and transcribed on your Mac, and the transcript is pasted straight into the frontmost app and never stored. Murmur runs no server of its own. The one external dependency is Apple's Speech framework, which may handle recognition requests according to Apple's own privacy policy."
privacyRetention: "Murmur does not persist transcripts. Audio is captured momentarily by the speech daemon to produce the transcript that is typed into whichever app is frontmost, and it is not written to disk by Murmur. Uninstalling Murmur removes the app and its bundled daemon immediately. There is no server-side copy to delete because Murmur does not run a server."
dataCollected: "None. Murmur does not collect, transmit, or share any personal data, and runs no analytics. Audio is captured locally by the Swift speech daemon and the resulting transcript is typed into whichever app is frontmost. The speech daemon talks only to the desktop app over a loopback address."
thirdParties:
  - "Apple Speech framework (SFSpeechRecognizer) and AVAudioEngine, used by the bundled Swift daemon to capture microphone audio and perform recognition locally. Apple may handle speech requests according to its own privacy policy."
  - "Electron, used as the desktop shell. The packaged app is self-contained and does not phone home."
permissions:
  - "Microphone, required to capture your voice for dictation."
  - "Speech Recognition, required so Apple's Speech framework can transcribe audio."
  - "Accessibility, required for the global Option-tap listener and to paste the transcript into the frontmost app."
requirements:
  - "macOS on Apple Silicon (M-series). The current build is arm64 only."
  - "Microphone, Speech Recognition, and Accessibility permissions, granted on first run."
  - "Pre-release software. Expect rough edges and breaking changes between versions."
supportEmail: "hey@milindmishra.com"
supportLinks:
  - label: "Privacy policy"
    href: "/murmur/privacy"
  - label: "GitHub releases"
    href: "/murmur"
  - label: "Download the latest build"
    href: "/murmur/download"
---

Murmur is system-wide dictation for macOS. Tap Option anywhere to start talking, and the transcript lands wherever your cursor already is — your editor, a chat, a browser field, a note. There is nothing to switch to and nothing to paste.

A small Swift speech daemon, built on Apple's Speech framework and AVAudioEngine, does the listening and recognition over a loopback API on `127.0.0.1`. An Electron and React desktop app spawns and manages that daemon as a child process, so the whole thing ships as one self-contained package with no separate service to run by hand. Quit the app and the daemon goes with it.

## How it works

- **Tap Option** anywhere to start or stop dictation.
- Speak normally. Murmur captures audio with the bundled Swift daemon and transcribes it with Apple's Speech framework.
- The transcript is **typed into whatever app is frontmost**, exactly as if you had typed it.

On first run, macOS will prompt for Microphone, Speech Recognition, and Accessibility access. Murmur needs all three: the microphone to hear you, Speech to transcribe, and Accessibility for the global Option-tap hotkey and to deliver the transcript into the frontmost app.

## Pre-release software

Murmur is at `0.0.1`. The current build is **Apple Silicon only**, the speech stack is still early, and the app will change in ways that are not backward compatible between versions. If you want to watch it grow, the source and every release live on GitHub.

## Private by design

No account. No sign-up. No analytics. No third-party telemetry. The speech daemon listens only on a loopback address, transcripts are pasted straight into the frontmost app and not stored, and Murmur adds no server of its own. Apple's Speech framework may process recognition requests according to Apple's own privacy policy — Murmur does not add to that.

## Free, with no catch

No subscriptions. No in-app purchases. No ads. Open source on GitHub. Just dictation that lands where your cursor is.
