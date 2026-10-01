---
tags: [robotics, vla, in-context-learning]
title: "关于机器人 In-Context Learning 的一些想法"
date: 2026-10-01
---

# 关于机器人 In-Context Learning 的一些想法

前段时间一直在社交媒体上看到 in-context learning 的工作。自从 Generalist 发布了他们的 in-context learning demo 之后，这件事情突然开始爆火了起来。

我觉得作为一种范式，用一个 demo video 或 demo action 去要求 policy perform 类似的 similar 任务，是一种不错的训练手段。但在我现在的设想里，in-context learning 更多是一种适合用来做训练的方案。

因为它面对的首先是一个相对 vague 的 input command。相比正常 VLA 的 language instruction 更加模糊，包含的信息量和信息密度也更低。而在日常训练和使用 VLA 的过程中，我的直觉也早已对于 VLA 本身用 language instruction 去指代一套复杂的、与真实世界的交互这种方案，感到精度上的不满。所以哪怕是 commanding prompt，对我来讲都算是一种过于 vague 的手段

所以很难想象这种方案日后能作为一种 reliable 的工作方案，而且第二点，它本身就非常强烈地 suffer from 长 context 里 VLM 带有的精度损失。如果以这种方式 roll out 都能做到很高的成功率，那么以 language instruction 形式提供肯定会更高。

但我认为它始终还是一种 promising 的方案，最核心的点在于它将我们在 VLA 训练过程中最难表达的目的（也就是 intention），和 demonstration trajectory 之间解耦开了。也就是说，在尝试做 in-context learning 训练的过程中，你在那段长 video/trajectory 里提供的更多是一种 intention，而模型需要学会在自己的 latent space 里将这种 intention 与一段符合要求的 trajectory 联系到一起。

我认为在训练上，这是一个相比当前 VLA "prompt + observation 输出 action" 更加困难的方案，同时也带有更大的 diversity。而且如果得当，这样训练出来的模型也许能够收敛到一个更清晰的 latent space。

这两天会继续读一读这些 ICL 相关的论文，看看之后会如何进一步 update 我这种 belief。
