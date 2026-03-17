---
aliases:
  - "Beyond Language Modeling: An Exploration of Multimodal Pretraining"
date: "2026-03-17"
paper_publish_date: "2026-03-03"
item_type: "paper"
title: "Beyond Language Modeling: An Exploration of Multimodal Pretraining"
abstract: "The visual world offers a critical axis for advancing foundation models beyond language. Despite growing interest in this direction, the design space for native multimodal models remains opaque. We provide empirical clarity through controlled, from-scratch pretraining experiments, isolating the factors that govern multimodal pretraining without interference from language pretraining. We adopt the Transfusion framework, using next-token prediction for language and diffusion for vision, to train on diverse data including text, video, image-text pairs, and even action-conditioned video. Our experiments yield four key insights: (i) Representation Autoencoder (RAE) provides an optimal unified visual representation by excelling at both visual understanding and generation; (ii) visual and language data are complementary and yield synergy for downstream capabilities; (iii) unified multimodal pretraining leads naturally to world modeling, with capabilities emerging from general training; and (iv) Mixture-of-Experts (MoE) enables efficient and effective multimodal scaling while naturally inducing modality specialization. Through IsoFLOP analysis, we compute scaling laws for both modalities and uncover a scaling asymmetry: vision is significantly more data-hungry than language. We demonstrate that the MoE architecture harmonizes this scaling asymmetry by providing the high model capacity required by language while accommodating the data-intensive nature of vision, paving the way for truly unified multimodal models."
url: "https://arxiv.org/abs/2603.03276"
pdf_url: "https://arxiv.org/pdf/2603.03276.pdf"
add_date: "2026-03-16T20:41:22Z"
authors:
  - "Shengbang Tong"
  - "David Fan"
  - "John Nguyen"
  - "Ellis Brown"
  - "Gaoyue Zhou"
  - "Shengyi Qian"
  - "Boyang Zheng"
  - "Théophane Vallaeys"
  - "Junlin Han"
  - "Rob Fergus"
  - "Naila Murray"
  - "Marjan Ghazvininejad"
  - "Mike Lewis"
  - "Nicolas Ballas"
  - "Amir Bar"
  - "Michael Rabbat"
  - "Jakob Verbeek"
  - "Luke Zettlemoyer"
  - "Koustuv Sinha"
  - "Yann LeCun"
  - "Saining Xie"
tags:
  - "literature"
luminexus_slug: "beyond-language-modeling-an-exploration-of-multimodal-pretraining-6de5ac2a"
paper_id: "arxiv:2603.03276"
artifact_id: "sha256:83196a90a82ac51efcc7a317b7d570c17d181f764cce37e3f36dd7d6fe984164"
note_id: "beyond-language-modeling-an-exploration-of-multimodal-pretraining-6de5ac2a"
note_path: "/workspace/luminexus_ws/silverbullet/Literature_Note/beyond-language-modeling-an-exploration-of-multimodal-pretraining-6de5ac2a.md"
---

# Beyond Language Modeling: An Exploration of Multimodal Pretraining

## Questions I Care About

架构是什么？

一个 autoregressive VLM + a diffusion/flow matching model that computes the frame from image feature for reconstruction。 VLM 在语言上正常学习，但是在 image/video 方面依赖于一个预训练好的图像 encoder map 进入 feature space，并且训练一个 flow matching model 去 reconstruct frame from feature 来保证模型有原生多模态的能力。

预训练分布是什么？

1. 25 % video: 他们使用 youtube ，但如果只是有意义的训练数据我觉得 ego4d 或者其他 action 相关的数据也是可以的。视频的内容是最安全的多模态数据，不会伤害模型的文本能力。
2. 50 % text: use DCLM
3. 22.5 % text + image with careful selection on the distribution.
4. 2.5 % action。

需要注意：这个 50/25/22.5/2.5 更像是论文里一个接近默认强配方的经验比例，而不是唯一正确答案。更重要的 lesson 是：

1. pure video 是最安全的多模态数据，基本不伤语言，甚至可能帮助语言建模。
2. image-text 仍然重要，但关键不只是“有没有 paired data”，而是 paired data 里的文本分布是否接近主文本语料。

对于我关心的 Video-Language-Action Model，这篇论文最值得借鉴的 recipe 不是追求 text-to-image aesthetic quality，而是 text + pure video + 少量高质量 action-conditioned data。

预训练的 scale 是什么？

主模型最常见的大规模训练预算是 1T tokens = 520B text + 520B multimodal。默认训练配置是 sequence length 4096，128 GPUs，每卡 batch size 4，总 batch 大约 2M tokens / step。默认模型约 2.3B total params，1.5B active params。

如果粗略按论文里 scaling section 使用的 dense 训练 FLOPs 近似计算：

$$
C approx 6 N D
$$

其中 active parameters 取 $N = 1.5 times 10^9$，训练 tokens 取 $D = 1.0 times 10^12$，那么总训练算力大约为：
$$
C approx 6 times 1.5 times 10^9 times 10^12 = 9 times 10^21 "FLOPs"
$$

如果按 8 张 H100 的理论峰值粗算，单卡 BF16 / FP16 tensor core 峰值约 $989 times 10^12$ FLOPs / s，则总峰值约为：

$$
8 times 989 times 10^12 approx 7.9 times 10^15 "FLOPs/s"
$$

理想下限时间大约是：

$$
T_"ideal" approx (9 times 10^21) / (7.9 times 10^15) approx 1.14 times 10^6 "s" approx 13.2 "days"
$$

但真实训练不可能达到理论峰值。若按 30% 到 50% 的有效利用率估算，则 8 张 H100 训练这一级别主模型的时间大约在：

$$
T_"realistic" approx 26 - 44 "days"
$$

也就是 roughly 3 到 6 周。对我来说，这说明论文的主训练是明确的大型预训练规模，不是 8 卡几天就能轻松复现的实验设置。

## Evidence And Claims

- Text + Video 不伤害语言能力，甚至在 DCLM 上优于 text-only。说明真正伤语言的不是视觉模态本身，而更像是 image caption text 的 distribution shift。
- Text + MetaCLIP 的 perplexity 最差。作者将其归因于 image caption 风格文本与 DCLM 主文本分布不一致。
- 论文显式比较了 MetaCLIP, MetaCLIP Recaption, SSTK 与 DCLM 的文本分布距离；距离越远，语言 perplexity 越容易变差。
- 不同 image-text source 对应不同能力：MetaCLIP 更适合 I2T / understanding；SSTK 更适合 T2I / generation。因此 image-text data 应该按 objective 选，而不是混成一种通用 caption 数据。
- world modeling 的 framing 很重要：他们把 action-conditioned prediction 写成 I + T -> I，也就是 context frames + text action -> future frame(s)。这是一个很适合 instruction-conditioned video prediction 的统一接口。
- world modeling 中，加入 general-purpose video 的收益大于单纯继续加更多 domain-specific navigation data。
- 在固定 200B token 预算下，in-domain NWM data 比例升高很快饱和；论文声称 1% 左右 in-domain data 就已经能达到有竞争力表现。
- 结论上，world modeling / navigation ability 更像是从 general multimodal pretraining 中涌现，再由少量 in-domain action data 对齐，而不是主要靠海量专门导航轨迹学出来。

## My Conclusions

如果目标是一个能够 follow instruction、理解物理变化、具备 action conditioning 的 Video-Language-Action Model，那么这篇论文真正重要的不是它对 text-to-image 审美数据的结论，而是以下几点：

1. pure video 很可能比高质量静态 image-text data 更重要，因为 instruction 只是条件，真正困难的是 world dynamics / physical change prior。
2. action 可以先直接表示成 text tokens。这对 language-first 的统一模型是一个自然且强的 baseline，不一定需要一开始就设计单独的 action head。当然我觉得 fast tokenizer 确实也可以考虑，但我记得其他论文也提到了对于 VLM 来说 fast 并不是一个很好的预训练内容。
3. 少量高质量 action-conditioned data 可能已经足够把通用视频先验对齐到可控行为上，因此数据工程的重点应该先放在 large-scale pure video + enough language + limited but high-quality action trajectories。
4. 对 VLA 来说，可以弱化高审美 T2I 数据，转而优先收集 instruction/transition/action 描述更强的数据，例如 state + instruction + next state, video transition + language, before/after + action。
5. caption-style image-text 数据仍然有用，但主要价值应该放在 language grounding / understanding，而不是作为主要的“物理变化学习”来源。

## Open Issues And Next Steps

- 如果目标是 VLA，是否应该进一步提高 pure video 占比，降低静态 image-text 占比？
- 是否应该将 image-text data 从 caption corpus 改成更偏 instruction / transition corpus？
- action 用自然语言 token 是否已经足够，还是在更细粒度控制任务中需要额外的 continuous / discretized action tokenization？
- 对我的目标来说，评估不应只看 VQA 或 text-to-image，而应更多看 instruction following、counterfactual rollout、physical consistency、action controllability。
