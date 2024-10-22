---
aliases: []
tags: [opinion, android]
title: Web Environment Integrity is gone, but the Android is more locked down than ever
description: ""
noteId_x: 27
category: English
create_time: 11/9/2023, 10:56:24 AM
update_time: 11/9/2023, 2:15:45 PM
publish_time: 11/9/2023, 11:44:29 AM
date: 2024-01-10 00:00:24
updated: 2024-01-10 00:22:17
---

Knowing this from brodie’s [video](https://www.youtube.com/watch?v=CxoFZNW1xMM). People from Google finally give up the WEI proposal and reverted all the changes in chromium. Instead, they are pursuing a similar proposal, but exclusively for Android WebView.

![[WEI-is-gone.png]]

From this topic on, it has sparked a conversation about Android becoming increasingly restrictive, a change that is perceptible when compared to other platforms, even Windows. Quote from onegabriel on YouTube:

> I just want to say, I hate how Android is becoming more locked down nowadays. The device I bought no longer feels like I owned it. In comparison, at least I can still modify things on Windows without making apps no longer work because of "the environment is untrusted". But hey, this is just me treating my phone like a PC.

This is an interesting comparison. As I generally don’t think windows is kept more open than Android due to any benevolence on Microsoft's part, there must be a deeper rationale.

The first thing that comes to my mind is their respective revenue models. Microsoft's income was primarily derived from direct software sales, while Google profits from advertising. Naturally, this incentivizes Google to counter the use of ad-blocks even more. In fact, this is IMO the driving motivation behind Google's WEI proposal.

However, this alone doesn't fully account for the difference. Another significant factor is the target user. Smartphones are designed for a broader population that lacks a technical background even more. The device is online most of the time, accompanying the user for a longer time, stores more sensitive private data and more. As such, a more rigorous security strategy could be seen as a benefit for this larger audience.

But I don’t like this. Stripping power from the user only exacerbates the existing imbalance between the everyday consumer and the tech behemoths, pushing the user into an increasingly vulnerable position. While some people are comfortable entrusting their digital safety to what they perceive as a trustworthy steward (like Apple User), believing in their consistent demonstration of good, ethical behavior, I can’t place my trust on such “benevolent dictator” without serious constraint from the outside.

## References

- Quora discussion on [why phone-OSes are more locked down than PC](https://www.quora.com/Why-are-phone-OSes-and-hardware-so-locked-down-compared-to-personal-computers)
