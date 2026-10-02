---
title: "You Don't Know You Can Do It, Until You Do"
description: How I led the migration of the Merlin AI mobile app from Flutter to a native feeling React Native app for iOS and Android. The crests, the troughs, the late nights and a lot of love for the craft.
category: Journey
coverImage: ./you-dont-know-you-can-do-it.jpg
date: "2026-09-30"
---

Not long ago I had never shipped a mobile app.

Today the new Merlin app is on a phased rollout in iOS and Android. In a bunch of languages, on phones and tablets, looking and feeling like it belongs on your phone.

I still can't fully believe I'm the one who got to lead it.

## The Ask

[Merlin AI](https://x.com/MerlinAIByFoyer) already had a mobile app, written in Flutter. It worked. But every feature we shipped on the website had to be built a second time, in a different language, with a different mental model.

The plan was simple to say and scary to do. Rebuild the whole thing in React Native with Expo. Match the website features. Make it feel native on both platforms. And don't log a single existing user out.

I'm a web person. React, design systems, motion, browser extensions. I knew React. I did not know Xcode build phases, Gradle, provisioning profiles, or why an Android emulator would randomly decide to die.

I said yes anyway.

## It Starts as a Prototype

It started as a prototype. A chat screen, a drawer, some liquid glass. Mock responses, no auth, no backend.

So I started with login. Then sign up. Then loading real chat history.

The first weekend was pure energy. The real Merlin chat client. Streaming that stuttered, then streaming that didn't. Attachments. Voice dictation with a waveform. Web citation sources. A model picker. Image and video generation.

Somewhere in there I generated a typed client for our backend straight from its API spec, so the app could never drift from it. Boring on a changelog. But every screen after that inherited from it.

## The Troughs

Then mobile humbled me.

Keeping existing users signed in was the scariest part. If the new app handled auth differently from the Flutter one, everyone would open the update and find themselves logged out. So I rebuilt auth wiring to pick up exactly where the old app left off, and tested it the only honest way: install the old app, sign in, install the new one right over it, and pray. It kept the session. I think I said something out loud to an empty room.

Then a new Xcode and iOS release changed the rules on how apps start up. Get it wrong and the app crashes at launch. Get it half right and you get a blank white screen, which is somehow worse. That one took a lot of reading.

The Android emulator kept dying. Everything looked like the app was crashing. It wasn't the app. The emulator just didn't have the resources to run it. I lost real hours to that before I learned to read the logs first and panic second.

Eventually I just got myself a Pixel 7 Pro. Not because anyone asked me to. I cared too much about how the app felt on Android to keep judging it through an emulator.

And the small ones. The thread jumping when you selected text. Blocks that kept remounting. My disk filling up mid build.

Some things I built, loved, and cut. Chat branching, editing a prompt to fork a thread, was one of my favourite features. It made the app heavier than it was worth, so we dropped it. Knowing what to cut is part of it too.

## The Crests

And then the good days. So many good days.

[Aakarsh](#) joined and the whole thing changed pace. Aakarsh took the feel of the thread, the composer and the drawer and just kept going. A composer glow that blooms and brightens when you focus it. Thinking and search blocks that fold away when they're done. Menus on liquid glass. A drawer that stays smooth while you switch chats.

I went deep on everything around it. Projects. Vault. Crafts. Folders. Sign in with Apple. Subscriptions and paywalls. Analytics. Crash reporting. Translating the whole app. Fitting it to iPads.

Then came the first TestFlight build. Seeing Merlin, our Merlin, installed on team members' phones felt unreal.

Then another build. And another. Each with release notes written for testers, not developers. "The send button shows white in dark mode." That kind of thing 🤣.

## Building With Agents

A lot of this was built alongside AI coding agents, and that taught me something I didn't expect.

Agents copy whatever they find. A workaround with a nice comment becomes the house pattern in a week. So half my job became making the codebase worth copying. Lint rules that catch the mistakes before review does. One way to do each thing. A proper design system, so no screen can quietly invent its own grey.

Same lesson as always, just louder. The system you set up early is the thing everything else inherits.

## The Part I Can't Show in a Git Log

The git log shows a lot of commits from Aakarsh and me. It doesn't show who unblocked us, who tested at midnight, who told us something felt off.

[Pratyush](https://x.com/pratyush_r8) trusted me to lead this. And everyone at Merlin who installed a build and sent feedback made it better than I could have alone.

If I missed anyone, that's on me, not on your contribution.

## Until You Do

Not long ago, if you had asked me whether I could lead a Flutter to React Native migration, ship on both platforms, keep every user signed in, and make it feel native, I would have said "I think so?" with a very big question mark.

I didn't know I could do it.

Then I did.

That's the thing nobody tells you. You don't get the confidence first and then do the hard thing. You do the hard thing, badly, then less badly, and the confidence shows up afterwards, quietly, somewhere along the way.

So if there's something you're not sure you can do, maybe just say yes and start.

Still early, still learning, still building. And I've loved every single day of this one.
