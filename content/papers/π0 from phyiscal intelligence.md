---
id: π0 from phyiscal intelligence
aliases: []
tags:
  - blog
  - vla
  - eai
  - phyiscalintelligence
date: "2024-11-02"
modified: "2024-11-15"
title: π0 from Phyiscal Intelligence
---

今天看到了这篇来自于 Physical Intelligence [^1] 的 [博客](https://www.314159.com/blog/pi0)，讲述他们新训练出来的 Vision-Language-Action model (VLA)。其中他们确实完成了非常多很有意思的在家居中使用的 task。我们来通过 blog 中的信息看看他们的技术路线。

## Basic Info from the Blogpost

- 模型架构:

  - 基于 3B 的一个预训练好的 VLM ，用 flow-matching 的方式来生成 action 数据。
  - 还有一个 470M 参数的小型版本 π0-small。

- 训练数据:

  - Internet-scale text-image pretraining (就是 base model 的 pretraining)
  - [X-Embodiment](https://robotics-transformer-x.github.io/) 数据集
  - 使用了自己收集的来自 8 种不同机器人的灵巧任务数据集

- 展示的能力:

  - Multiple embodiment (Aloha 和 UR)

  * Zero-shot/few-shot task performance
  * 复杂任务（如叠衣服、收拾桌子、组装盒子等）

- Baseline: 在5个 zero-shot 的 task 上，和 OpenVLA 和 Octo 对比有显著优势。

## Flow-matching?

第一个不太理解的部分是文中提到的 flow matching 怎么运用在了 action generation 上面，以及这样做的意义是什么。一番检索我找到了 [这篇今年八月的 arxiv](https://arxiv.org/abs/2403.10672) 提到了如何用 flow-matching 来实现 action generation，在这篇文章中提到的好处有 1）geometry-aware 2）速度更快 3）action 更加 smooth。

整体上描述的好处基本上与 phyiscal intelligence 在博客中提到的一致，可以猜测他们的运用方式是一样的 - 用 Flow-matching 来替换 diffusion 过程。但是提到的这篇八月份的 KIT 的论文虽然选择 Diffusion Policy 作为 baseline，但是连一个机器人上的实机测试都没有，结论和方法的可信度尚不可知，只能作为一个参考。

## Summary

总体看下来，π0 是类似于 OpenVLA 这样的工作，区别在于 OpenVLA 直接用 tokenizer 来分解动作，而这篇文章中使用了现在常用的 action generation 的方式来生成动作 (提到的 flow-matching 理解为一种更 fast 的 diffusion policy)。

合理的猜想是将生成出来的 action embedding 加上当前的 observation 传递给 diffusion policy (or equivelant generative action model) 来生成 action trajectory，这样 llm 的 inference frequency 乘上 DP 的 action sequence 在这些日常任务上就能够产生足够丝滑的 action。这种 approach 对于 生成的轨迹质量和精度会高于 OpenVLA 自然也是应该的。在 [[Talk from Cheng Chi]] 中也提到过，现在 SOTA 的 action models 的提升很大一部分来自于 SOTA 的 generative model 的生成质量，相比于 naive 的直接 detokenize action 是一个不小的提升。

这样看起来 VLA 这条路做出来的 agent 的效果真的非常能打，demo 制作的效果让我觉得可以胜任的家居机器人的场景了，但真正的困难还在硬件集成和成本降低之类的问题上，现在我们还远没有能够将机器人抬到普通人的家里面的能力呢。但在 intelligence 这个部分，我相信不会之后最大的 roadblocker。

[^1]: 一个 base 在湾区的，聚焦 embodied AI 的 foundation model 的初创。 BTW 很喜欢他们现在[官网](https://www.314159.com/)的 domain (314159.com) 和风格 - Hacker News 的极简极客风 + pi 作为域名，如果能一直保持这样的风格那可真的太酷了。
