---
id: Talk from Cheng Chi
aliases: []
tags:
  - paper
  - diffusion-policy
  - talk
date: "2024-10-29"
modified: "2024-11-15"
title: Talk from Cheng Chi About Diffusion Policy
---

今天在做饭的时候听了[这个 bilibili 视频](https://www.bilibili.com/video/BV1ZaeAe7EMu)，来自 Diffusion Policy 作者 Cheng Chi 的 Talk。

几个我的 Takeaways：

1. **Predict Action Sequence**: 比起其他当时同时间做 Diffusion based Action Model 的两个工作相比，Diffusion Policy 做对的最核心的内容就是别的工作是 predict 下一个 action，而 DP predict 的是接下来的 action sequence。虽然 Cheng Chi 也没有一个足够好的理论解释为什么 predict action sequence 这么重要，但这确实是从 DP 中看到最核心的一个 lesson。
2. **Generative approach for action**: 无论是 Diffusion Policy 还是 Action Chunking Transformer，这两年在 action model 上发光的新工作都是基于 generative model 的。所以 Cheng Chi 说如果之后出现了超过 DDPM 的 SOTA Generative Model，他相信将其 apply 到 action trajectory generation 上也会有比 DP 更好的效果。比起 Denoising 来说，predict action sequence 是他认为更重要的。
3. **Slow down makes it better**: 另一个没有理论解释的发现则是，对于 diffusion policy 尽管作者可以将其的 inference rate 优化到 20 hz，但在实际中效果最好的频率则是 2 hz - 5 hz，也就是每个被 executed sequence 所 cover 的时间大概在 0.25s 到 0.5 s。这个区间大概符合人从看到东西到可以做出反应的所需的时间。这里得到的结论是与之前的直觉不符合的，人们往往默认更高在机器人领域更高频率的控制是更好的，但在 diffusion policy 上反而是相对较慢的 inference speed 更好。

这上面其实很多的发现都是 “我发现这个东西 work，但我没有很好的理论框架解释为什么这个 design choice works 但是其他的不 work”。 可以看出 action generation model 这个领域现在就只是探索，我们还远没有到可以有足够深刻的来深刻的解释其中的一些发现的程度。

Additional thing worth mentioning yet I didn't fully follow:

1. 提到了 PerAct 处理 rotation 的时候为什么会产生 phantom mode 的问题。 (47:56)
2. 做饭的时候听的，没仔细听数学方面关于 diffusion 他的理解。（14:30）
