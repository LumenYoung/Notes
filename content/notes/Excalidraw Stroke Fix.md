---
id: Excalidraw Stroke Fix
aliases: []
tags:
  - self-host
  - excalidraw
date: "2024-11-18"
modified: "2024-11-19"
title: Why would anyone self-host Excalidraw?
---

I'm an avid soft-host enthusiast, I want to host almost every online service that I can. Yet excalidraw can be categoried as one of the least possible one, the reason being it is too clean a tool: 1) it is open-sourced, 2) it doesn't require login to propertary service to use 3) there is no synchronization service and 4) it doesn't store any of your data on the server and end-to-end encrypted. So you are neither financially nor privacy motivated to self-host it, that is kind of the thing even people on the selfhosted reddit (basically self-host zealots like me) would [question the necessity of self-hosting it](https://www.reddit.com/r/selfhosted/comments/1anbstg/excalidraw_self_host/).

Yet I recently migrated from an AWS Lightsail of 2 GB to a new cloud server that has 8 GB of memory, right now it seems a completely overkill so I just used 5 mins to host it on my server when I found excalidraw to be perfectly fitting my need to sketch my thoughts in a non-structured manner, it is sometimes a better form of note-taking when you haven't decided yet how you want to connect things. 

Initially it was not different at all from the official excalidraw.com except the self-hosted version lost the functionaility of online collaboration room. So yeah, it was even pure negative and I was just doing it for fun.

But then I find that free-drawing in excalidraw is actually too thick and ugly, you can have a glance on the ugliness in this [issue](https://github.com/excalidraw/excalidraw/issues/7467). The main discussion happens at [this issue](https://github.com/excalidraw/excalidraw/issues/3693) and it is a long-hanging 3 year issue. Since it is not fixed in such a long time, I don't expect it to be fixed in near future, so I instead applied some workarounds mentioned ([here](https://github.com/excalidraw/excalidraw/issues/3693#issuecomment-898986896) and [here](https://github.com/excalidraw/excalidraw/issues/3693#issuecomment-2112865366)) in the thread on my cloned locally repo and build a custom excalidraw container from that.

## The Fix

After digging through the GitHub issues, I found some workarounds that seemed promising. It involves only small tweaks in hard-coded parameters in `excalidraw/packages/excalidraw/rendererElements.ts`:

1. In the file `rendererElements.ts`, change the strokeWidth:

```diff
- size: element.strokeWidth * 6,
+ size: element.strokeWidth * 2,
```

This simple change reduced the thickness of freedraw lines at all stroke widths.

2. Then, based on a [comment in the issue thread](https://github.com/excalidraw/excalidraw/issues/3693#issuecomment-2112865366), adjust the freedraw stroke scale number made these adjustments:

```diff
const options: StrokeOptions = {
-  size: element.strokeWidth * 4.25,
-  thinning: 0.6,
+  size: element.strokeWidth,
+  thinning: 0.25,
}
```

This seemed to give the satisfiable results for my needs.

## Building the Custom Container

The great thing about Excalidraw is that it comes with a Dockerfile, making it super easy to build a custom version. After making these changes in my local clone of the repo, I just ran:

```bash
docker build -t lumeny/excalidraw:latest .
```

And voila! I had my own custom Excalidraw container with consistent stroke widths.

## Final Thoughts

While this isn't a perfect solution, it works well for my needs. That is one of the reason I like open-source projects like Excalidraw that allow me to tinker and customize things to fit my nichey preferences. Sure, it's not an official fix, but that's part of the fun of open-source - we can experiment and find workarounds when we need to.

For now, I'm happy with my custom version at draw.lumeny.io. It's a small tweak, but it makes a big difference in usability for me.
