---
title: The Part a Person Actually Feels
description: How three of us shipped Merlin Agent from an empty repo to a signed, notarized v1.0 on real desktops. The design system, the details nobody sees, and why making something feel like someone cared is the actual work.
category: Journey
coverImage: ./the-part-a-person-actually-feels.jpg
date: "2026-06-27"
---

A few weeks ago there was nothing, except that one meeting with [Pratyush](https://x.com/pratyush_r8), [Sachin](https://x.com/sa_vatsa), [Anand](https://x.com/anandxpatwa) x Merlin Warriors, that we just needed to ship Merlin Agent. Just an empty repo, one window, and a promise that we'd put a real agent on people's desktops.

Today it's v1.0.x. Signed, notarized, shipping.

3 of us (I, [Shubhankit](https://x.com/shubhcodes) and [Shahbaz](https://x.com/shahbaz_cse)) on the build, the whole team at [Merlin AI](https://x.com/MerlinAIByFoyer) calls us "Merlin Warriors" btw, it's cute. Here's how it actually went.

## It Starts as a Prototype

The repo gets born as `merlin-desktop`. It's a prototype and it barely holds together. Streaming is hacked in, auth is a sketch, the UI is whatever ships.

Honestly that's the right way to start. No overplanning, just building and breaking and fixing. But a prototype that works and a product people actually feel are two very different things, and closing that gap was most of the real work.

## Splitting the Work

We split the work by where each of us couldn't stop caring.

[Shubhankit](https://x.com/shubhcodes) took the spine. The SDK streaming, OAuth deep links, auto updates, code signing and notarization, the session and approval guts.

[Shahbaz](https://x.com/shahbaz_cse) took the reach. Web search, image and video gen, YouTube tools, MCP tooling, file attachments.

I took the part the user actually touches.

## The Part the User Touches

First thing I did wasn't even a feature. It was getting a real design system into the renderer. Layout, spacing, components, design tokens.

Looks boring on a changelog. But everything after that inherited from it, every chip and margin and motion curve, so it mattered more than any single feature did.

Then it just kept compounding. Per tool flow chips. Result views. A file panel that docks. A sidebar rebuild with search, rename, delete, relative timestamps. Settings screens with motion that doesn't feel jarring. A floating sidebar that actually respects the macOS traffic lights.

Small stuff. But small stuff is most of the difference.

## The Part Nobody Sees

Then came the part nobody sees. Chain of thought streaming kept fragmenting mid thought and I had to chase that down. The approval panel had to feel safe instead of scary. The floating Merlin panel had to sit on top of your work without stealing the Dock icon.

I shipped a screenshot to context button so the agent could just see what you see. For a while I even had voice dictation running on device with Whisper. We pulled it later. Knowing what to cut is part of it too.

And then the unglamorous part. Making it an actual product. A proper macOS app icon. A styled DMG installer. Pricing plans. Blocking plan downgrades 😅. System tray. Production hardening.

This is the gap between "it runs on my machine" and something I could share with my friends.

## The Front Door

The desktop app was only half of it. The other half was the front door. We built the [getmerlin.in/agent](https://www.getmerlin.in/agent) landing on the website too, the navbar, the changelog page, the onboarding emails, pricing checkout with help from [Shahbaz](https://x.com/shahbaz_cse) and [Arush](https://x.com/boarush), the app download flow. The page people hit before they ever open the app, and the first thing that has to make them believe.

An empty window became the commit that bumped it to 1.0.0. Signed, notarized, auto updating, on real desktops.

The path went prototype, then a full "remove old codebase for fresh start" reset because we'd outgrown the first one, then productionizing, then release.

## The Part I Can't Show in a Git Log

But honestly, the three of us writing code is the part I can show you in a git log. The part I can't fully capture is everyone else who turned this from a build into a launch.

[Anand](https://x.com/anandxpatwa) kept the product honest and pointed in the right direction. [Sachin](https://x.com/sa_vatsa) and [Udita](https://x.com/i_Udita) were in the room for the calls that shaped how we wanted to launch this, the combined brains behind so many of the decisions that look obvious now only because someone argued them out first. [Athul](https://x.com/expectro1897) designed the landing page feel I just translated into pixels. With a lot of meaningful tweaks from [Sachin](https://x.com/sa_vatsa) and [Anand](https://x.com/anandxpatwa) 🫡

[Nikhil](https://x.com/just_nikhil01) is cutting the launch video that's about to put all of this in front of people. And [Satvik](https://x.com/tr1ckastley) has been an absolute team sport, testing the app to its limits and straight up vibe coding whole apps out of it, which is the kind of real-world abuse no internal test plan ever covers.

The thing I keep coming back to is that none of this was just frontend work. It was product thinking, design systems, AI interaction design, and owning the part a person actually feels from end to end. But none of it ships alone.

I spent a lot of late nights on details most people will never consciously notice, which is kind of the point. If people don't feel it, it doesn't matter.

And now we're in the next phase. Everyone's heads down prepping the launch, scaling ads, getting it in front of real users. The part where the world actually gets to use it starts now.

Still early, still learning, but Merlin Agent is live.

If I missed anyone here, I'm sorry, that's on me and not on your contribution. A lot of hands and a lot of brains carried this, more than one post can hold.

If you're building AI products, my honest take is this. Ship the prototype fast, then spend the real time making it feel like someone cared. Then surround yourself with people who care just as much. That part is the actual work.
