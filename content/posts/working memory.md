---
aliases: ["三点思考法"] 
title: "A Small Hack to Use Working Memory"
date: 2025-06-05
published: 2025-06-05
tags: ["trick", "cognitive-psychology"]
---
我一直很苦恼的一件事情就是自己的「工作记忆」太小了。把思考本身比作画布，因为工作记忆小，我的画布上面能够存放的东西很少，经常是一件事情想到一半就忘掉了前面的点。而遗忘是长线思考时很让人焦虑的点，所以我更习惯通过笔记来思考 — 迅速的将略入脑海的点 dump 到「外部记忆」里面，让自己不需要担心记忆。而由于「外部记忆」让我不需要刻意的 memorizing，思考本身就变的更多聚焦在思考本身而不是 maintain working memory 了。

最近在脑子里面尝试的「三点思考法」非常神奇的帮我解决了这个问题。神奇的 work 但是情理之中。「三点思考法」的核心就是每件在思考的事情限制只能总结成三个点，不能更多。这听起来直觉上并不 make sense — 事情本身的特性可能非常多，没有道理可以在三个 bulletpoints 内可以囊括所有。但在刻意的限制自己思考的时候一件事情最多只能有三个点的时候，我感觉突然一下自己的画布不仅变大了，而且突然靠谱了起来 — 我基本无需担心自己会在思考最后一个点的时候忘记第一个点，我基本可以放心的聚焦思考三个点中的任何一点而不用担心 OOM。

这个看起来神奇的 trick ，细想其实同时有来自「认知心理学」和「深度学习」两侧的 Support。认知心理学早就发现[[Working Memory Span Limit|人们的工作记忆对低于四个 chunk 时有特殊的优化]]。同时虽然事物本身的性质可以很多，但类似于 VJEPA/VAE 这样的 representation learner 其实是通过强制限制一个 bottleneck feature dimension 来引导模型学习到最有意义的 feature 而不是 overfitting，这也就是人们时常说的「压缩即智能」。其实这个 bottleneck 维度的选择是设计者 arbitrary 的选择，也许并不能保证在所有情况下都能完整的 capture 所有重要的 semantic。类比到思考本身，三个点也许不能代表全貌，但这个限制可以强迫自己思考 priority 最高的几个点。