---
date: 2026-09-18
tags: [llm, self-host, edge-compute]
title: "Bonsai 2 compressed 27B QWen to 6GB RAM Usage"
---

[Ternary Bonsai 2](https://prismml.com/news/bonsai-2-27b) 是基于 qwen 27b 更改的模型。很惊讶的是他可以压到 6GB 以内，而且 Primal ML 声称可以保持 98% 的原模型能力。

27B 的模型如果按照 BF16 的精度，权重就占用了大概 54 GB 的 GPU 内存，所以加上 KV cache 等需求，正常的 inference 可能就需要大概 80 GB 内存的卡。所以如果能把内存压到 6GB （仅存模型），已经可以让这个级别的模型更 accessible 了。

同时这样的压缩让 27B 模型在 5090 上面可以达到 143 token/s ，就非常的可用了。

这条路线往下走看起来真的是能把一些可用的模型放到普通人家里面的 GPU 了。尤其是一方面看到压缩这一侧有显著的成果，加上 qwen 和 zai 也在最近几个月的工作里面证明了小模型可以完成很多之前觉得不可能的任务。

### Kernel Optimization

他们开源了权重和一部分 fork 后的 llama.cpp ，但是算子方面没有开源。但这件事情我觉得确实也没有那么重要，反而让我想到另一件事情。

最近 deepseek 的一位 infra 方向的研究员 (刘胜与「我不得不把才华埋葬在昨天」)提到前沿模型写算子的能力已经基本上超过他了，让他觉得在两年之内就要在算子这个方向被代替。

我不惊讶于在这样有 instant feedback 的领域，模型在短时间内能够超越人类，事实上这是必然的。事实上 kernel 领域可能是模型 RSI 最快的部分之一，因为它的结果极端可控，前沿模型在这条链路上通过 kernel development 提升效率，我猜在 openai/anthropic 里面很可能要么已经，要么很快就能够逼近理论能优化到的效率上限了。

所以从未来几年的考虑来看，人只有从事那些模型无法自我闭环的工作，或者积极的寻找新的工作内容，在上面搭建这种闭环，才算是收益很高的工作。