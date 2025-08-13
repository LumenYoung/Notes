---
aliases: [quartz link improve] 
date: 2025-08-13
tags: [note-taking, quartz, silverbullet]
title: Improve the Note Publishing
---

I have been trying to improve my workflow for publishing some notes from [Silverbullet](https://github.com/silverbulletmd/silverbullet) (my note taking app) to [Quartz](https://github.com/jackyzha0/quartz) (my note publishing tool). Both of them support Obsidian Flavored Markdown and Obsidian style link like `[[something]]`. As a way to simplify how I turn some note pages into public, the `Publish` sub-directory is synchronized with the quartz `content` page to publish any notes that I moved to the `Publish` directory. This makes my publishing experience as effortless as moving some file into a folder.

But this makes the obsidian internal link from note taking system different from the publish system. A valid internal link in Silverbullet is for example `[[Publish/foo/bar]]` but that link should be `[[foo/bar]]` in order to be properly resolved to the respective note in Quartz. So I did this thing manually, changing every links inside the published note, this makes the link no longer valid in Silverbullet and is also tedious to do. But avoid this suboptimal approach, I need to strip the `Publish/` for quartz link resolve in order to make the website find the correct page.

Luckily one of the Quartz’s maintainer [saberzero1](https://github.com/saberzero1) kindly pointed me to the section to make my modification available, it is either modify the ofm transformer in the quartz or path transformer. After a very simple [commit](https://discord.com/channels/927628110009098281/927628110009098284/1404835098871857172) I modified the ofm transformer to make quartz compatible with my note space structure. So now you can see link like `[[Publish/papers/VGGT - Visual Geometry Grounded Transformer]]` is properly resolved to [[Publish/papers/VGGT - Visual Geometry Grounded Transformer| VGGVisGe25]].