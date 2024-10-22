---
aliases: []
tags: [papers, 中文, robotics]
title: 2024-05-14 insights - robotic representations
date: 2024-05-14 23:17:38
category: 
updated: 2024-05-15 09:48:07
---

今天分享几篇最近阅读的关于 visual representation 在 robotics 方向的使用。

## R3M: A Universal Visual Representation for Robot Manipulation

[pdf](https://arxiv.org/pdf/2203.12601) | [github](https://github.com/facebookresearch/r3m) | [arxiv](https://arxiv.org/abs/2203.12601)

r3m 是来自 Standford 和 meta 的工作。作者提出 robotics 中使用的 pretrained visual representation 应该在训练过程中学习到 1） semantic information ，2）temporal information 以及 3）represnetation 本身应该简单而稀疏。

因此，r3m 在训练过程中使用了三方面的 loss:

- video-language alignment 学习语义信息
- time contrastive learning 来学习时间信息
- l1/l2 penalty 来 enforce 稀疏性

作者在人类视频的 Ego4d 数据集上训练了 r3m 模型，并且获得了比 baseline （CLIP, MoCo, supervised ImageNet 的 feature 以及直接在 downstream task 训练的模型）更好的结果。

作者还做了 ablation，确认这三部分的 loss 对于 pretrained backbone 都很重要。

## Where are we in the search for an Artificial Visual Cortex for Embodied Intelligence?

[pdf](https://arxiv.org/pdf/2303.18240) | [arxiv](https://arxiv.org/abs/2303.18240)

这篇工作主要讨论一个问题：动物的视觉皮层只有一个，能够为各种各样的交互任务提供视觉特征，因此作者想在当前已经提出的各种视觉基础模型中实验，寻找是否有这样一个模型可以在各种 downstream 的 Embodied AI task 里面提供最好的视觉特征，作者称之为人工视觉皮层。为此作者创建了一个由各种 embodied AI task 组成的一个 benchmark。

这项研究发现，预训练的视觉表征优于从零开始的训练方法，然而在体现在 AI 中的操控的每个子领域，没有任何现有的工作可以在每个 downstream task 上有优于所有其他工作的成绩。**所以我们还没有找到人工视觉皮层。** （*我很喜欢这种有新意的工作，但是作者寻找 AVC 的 metric 实在是有点瑕疵*）

除此之外，作者还研究了预训练数据量对 performance 的影响，发现数据量与 performance 正相关，但是并不是在所有 task 都会绝对提升其 performance。

根据这些发现，作者自己提出的 vc 模型也会在各个子任务上做特定 task 的训练，获得了 SOTA 的结果。

## Real-World Robot Learning with Masked Visual Pre-training

[arxiv](https://arxiv.org/abs/2210.03109) | [pdf](https://arxiv.org/pdf/2210.03109)

这篇工作在来自互联网和第一人称视角视频的大规模图像集（包含 450 万张图像）上训练一个拥有 3.07 亿参数的 ViT。与上篇文章的结论相同，在这片工作中得出的结论是，扩大 visual pretrain dataset 的数据集是有益的，但并没有发现扩大 pretrained dataset 会降低某些 task 的结果。
