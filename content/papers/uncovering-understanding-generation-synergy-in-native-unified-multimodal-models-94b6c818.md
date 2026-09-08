---
aliases:
- 'Uncovering Understanding-Generation Synergy in Native Unified Multimodal Models: From Representation, Task to System'
date: 2026-09-02
paper_publish_date: 2026-09-01
item_type: paper
title: 'Uncovering Understanding-Generation Synergy in Native Unified Multimodal Models: From Representation, Task to System'
abstract: 'While unified multimodal models (UMMs) jointly perform visual understanding and generation within a single model, functional unification does not guarantee learning synergy: the two objectives may reinforce each other, compete for capacity, or merely coexist. We investigate their relationship at the representation, task, and system levels in a controlled, structurally native setting without pretrained vision priors. At the representation level, we find that each objective provides useful signal to the other: generation enriches the visual features learned for understanding, while understanding strengthens vision--language alignment for generation. However, when both objectives are forced through the same computation path, one tends to dominate. A task-decoupled architecture that specializes conflicting visual computation while preserving semantic interaction avoids this asymmetric degradation. At the task level, through three case studies, we find positive bidirectional transfer when understanding and generation tasks rely on shared knowledge. At the system level, we show that an end-to-end UMM outperforms a matched planner--executor pipeline on complex tasks that explicitly require both image understanding and generation. Together, these results show that the value of UMMs extends beyond a unified interface: appropriate specialization, shared task knowledge, and end-to-end optimization can turn coexistence into synergy.'
url: https://arxiv.org/abs/2609.01607v1
pdf_url: https://arxiv.org/pdf/2609.01607.pdf
authors:
- Penghao Wu
- Haiwen Diao
- Weichen Fan
- Lewei Lu
- Dahua Lin
- Ziwei Liu
tags:
- literature
luminexus_slug: uncovering-understanding-generation-synergy-in-native-unified-multimodal-models-94b6c818
paper_id: "arxiv:2609.01607"
artifact_id: sha256:e2649edf34bcb1a69ca7c488e78dbfd7000a693a840e89ae582b47dd35725168
note_id: uncovering-understanding-generation-synergy-in-native-unified-multimodal-models-94b6c818
note_path: /home/yang/docker-com/sliverbullet/space/Literature_Note/uncovering-understanding-generation-synergy-in-native-unified-multimodal-models-94b6c818.md
---

## Questions I Care About

这篇论文 cover 了一个我很关心的方向，没有预训练 image encoder 的 pixel-in/pixel-out 的 unified multimodal model 这部分应该怎么设计？理解与生成是否真的会相互促进，还是会因容量和计算路径竞争而彼此损害？

我直觉上觉得这种 UMM 会是未来的趋势，这个直觉来自于费曼学习法的原则：如果模型不能生成或重建某种视觉结构，它对该结构的「理解」可能是不完整的。同时长时间与当前的 vlm 的交互让我发现对于哪怕能力很强的 VLM ，其实他们的 visual hallucination 都远比我想象的要重。哪怕是 deepseek 新出的 vision expert，或者 GLM 的 5.3 flash ，他们都在 spatial intelligence 这个点上有很大的 hallucination。

但工程上的关键不在于是否统一，而在于 generation，尤其噪音很高的 pixel space reconstruction loss 是否是一个过于细节，以至于损害 understanding 的 objective。

当然想要理解这么大的一个问题，单一 metric 是不可能给你一个 decisive 的结果的，所以论文将 evaluation 分成 representation, task, system 三层：

- **representation level**：理解和生成是否共享有用的 feature，哪里 transfer，哪里 interfere；
- **task level**：当两类任务依赖共同领域知识时，joint training 是否产生双向迁移；
- **system level**：端到端 UMM 在实际任务中，是否优于由理解模型和生成模型串联成的 pipeline。

后两层更能说明模型在使用中的价值；representation level 更接近机制，但也更难给出因果结论。

## Evidence And Claims

**Native setting。** 实验的对象是 encoder free 的 VLM，即图像先通过两层卷积切成 patch token，再送入 transformer；语言底座为 Qwen3-1.7B，pre-buffer 随机初始化；没有预训练视觉 encoder 或 VAE。图像生成使用 flow matching。这个设定的价值是尽量排除外部视觉先验，观察 joint training 自己如何改变视觉表征。

**Dense 与 modality-decoupled MOT 都做了直接实验。** 两者都在 representation-level 的受控设置下，以相同训练协议训练 210k steps。understanding 数据和 generation 数据主要来自 SenseNova-U1，后者包括 text-to-image 和 image-editing 数据。

Table 1 中的 `UND/GEN` 不是一个统一模型，而是同一架构下两个单任务 baseline：

- `UND`：仅用 understanding 数据；
- `GEN`：仅用 generation 数据；
- `UND+GEN`：联合训练。

因此所有结论必须在**同一种架构内**比较，不能将 Dense 与 MOT 的不同表行混为同一因果 baseline。

| Architecture           | Training | General |   OCR | V-centric & SI | GenEval2 |   DPG | HPSv3 | Aesthetic |
| ---------------------- | -------- |--------:|------:|---------------:|---------:|------:|------:|----------:|
| Dense                  | UND/GEN  |   67.82 | 71.96 |          60.72 |    51.16 | 79.11 |  7.05 |      5.12 |
| Dense                  | UND+GEN  |   68.69 | 72.12 |          61.77 |    51.03 | 78.12 |  5.92 |      4.94 |
| modality-decoupled MOT | UND/GEN  |   64.20 | 66.84 |          59.54 |    57.55 | 82.06 |  7.72 |      5.37 |
| modality-decoupled MOT | UND+GEN  |   61.58 | 62.11 |          57.49 |    63.47 | 83.09 |  7.97 |      5.48 |
| task-decoupled MOT     | UND+GEN  |   69.02 | 72.09 |          62.38 |    63.96 | 82.31 |  7.90 |      5.50 |

每个架构行中的 `UND/GEN` 结合两个单任务模型：understanding 列来自 `UND`，generation 列来自 `GEN`，并非一个单一模型。因此，架构内差值为：Dense 的 understanding 为 `+0.87 / +0.16 / +1.05`，generation 为 `−0.13 / −0.99 / −1.13 / −0.18`；modality-decoupled MOT 的 understanding 为 `−2.62 / −4.73 / −2.05`，generation 为 `+5.92 / +1.03 / +0.25 / +0.11`。task-decoupled MOT 未公布同架构的 `UND-only` 或 `GEN-only` 行，因此没有严格的架构内差值。

Dense 中，text clean understanding visual token 和 noised generation visual token 全部经过同一条预训练 LLM path。联合训练改善了 understanding，却让 generation 的四项指标均下降。作者的解释是：预训练语言模型提供了强语义锚点，understanding 在共享 feature space 中占主导；generation 成为一种有益的辅助约束，但自身能力因共享参数竞争而退化。

modality-decoupled MOT 的路由则是：

``` text
text token → pretrained LLM branch
UND-V      → same scratch-trained visual branch
GEN-V      → same scratch-trained visual branch
```

这里将 branch 称为「分支」或「参数路径」只是便于理解；严格说，它不是两座彼此独立运行的 tower。原始 MoT 对每个 modality 使用专属的 Q/K/V/O projection, FFN 和 LayerNorm，再在交错序列上执行一次 global self-attention；本文也明确说明两个 branch 保留 global attention。就本文的 modality-decoupled 路由而言，text 使用预训练 LLM branch，clean understanding token `UND-V` 与 noisy generation token `GEN-V` 都使用同一个从零训练的 visual branch。

在该设置下，joint training 相对 `GEN-only` 明确提升 generation：GenEval2 从 57.55 提升到 63.47，DPG,HPSv3 和 Aesthetic 也都提高。作者还以 5,000 个 COCO 图文对计算 text feature 与 generative visual feature 的 layer-wise linear CKA，发现 joint model 一致高于 `GEN-only`，据此认为 understanding supervision 改善了 generation side 的 vision-language alignment。

但 joint training 同时让理解下降。一个合理解释是：understanding 既失去了 visual token 直接经过预训练语言参数的优势，又要与 noised generation token 共享同一条 scratch visual computation path。论文也指出，MOT-UND 本身已经低于 Dense-UND，尤其在 General 与 OCR 上，说明强的视觉—语言对齐对理解任务很重要。

**Task-decoupled MOT 是第三种设计。**

``` text
text + clean image token for understanding/context, including UND-V/context image → pretrained LLM branch
noisy GEN-V                                                                  → generation-specialized visual branch
```

它按任务或 token 的噪声状态，而不是按模态做分路：理解保留 language-anchored visual computation，生成获得专门化路径；同时两边仍共享文本语义，并在 image-editing / interleaved samples 中通过 global attention 使用 context image 进行条件交互。

它避开了 Dense 的「理解提升、生成下降」以及 modality-decoupled MOT 的「生成提升、理解下降」两种显著 trade-off。不过要保留一个实验上的限定：作者没有报告 task-decoupled MOT 自身的 `UND-only` 与 `GEN-only` 行，因此不能严格计算其同架构内的纯 joint-training gain。它说明的是联合训练后的结果更平衡，而不是完整证明该架构中两个方向都必然相对单任务提升。

## My Conclusions

这篇论文修正了我对 Dense 的默认偏好，我之前一直觉得 MoT 是在开倒车。但这个论文的结果提示共享 representation 并不适合让所有 token 强行经过同一条 transformer path；统一模型不能只靠「一个网络」，而是要取舍参数的共享与 Specialization。

所以从这里导出的最合适的设计是 private generation computation + shared semantic interaction (for image and text).

clean understanding token 与 noised flow-matching generation token 的计算需求可能不同。生成侧可能需要更强的去噪、局部细节和视觉动态建模；理解侧更依赖稳定、锚定的语义和视觉—语言对齐。它们不必共享全部 transformer computation，但仍可以共享文本语义，上下文图像信息和跨支路注意力。

因此，我关于「越接近 pixel-level 的生成越容易 interfere，而 underlying representation / embedding space 仍可共享」的直觉，与论文结果相容，但目前仍只是合理假说。如果真的要做这种方向上的继续探索，我们可能可以设计这些方向的实验：

- layer-wise gradient conflict: 检查两侧 loss 导致 gradient 的 cosine similarity。
- shared/private latent representation: 设计从完全共享，前共享，后共享到完全分开一系列的模型实验，如果前共享 performance 更好，那就支持我们的直觉。
- attention, FFN, norm 分别共享或私有的比较。

虽然不能直接证明 pixel detail 是这种干扰的根源，但我们至少知道这种 performance 上的冲突可能来自 noise state 与 task-specific computation 的差异；可共享的语义表征则可以通过 attention conditioning 与部分共享层保留。

## Related Papers

- 主论文：[Wu et al., *Uncovering Understanding-Generation Synergy in Native Unified Multimodal Models*](https://arxiv.org/abs/2609.01607v1)
- 架构原文：[Liang et al., *Mixture-of-Transformers: A Sparse and Scalable Architecture for Multimodal Foundation Models*](https://arxiv.org/abs/2411.04996)
- Another MoT: [[Literature_Note/cosmos-3-omnimodal-world-models-for-physical-ai-608a0c61|cosmos3]]
- Encoder-free example VLM: [[Literature_Note/emu3-5-native-multimodal-models-are-world-learners-2650d40c|Emu3.5: Native Multimodal Models are World Learners]]

原始 MoT 值得继续读。其核心是 token 按 modality 确定性路由到模态专用参数路径：各 token 使用各自的 Q/K/V/O projection, FFN, LayerNorm，但随后在交错序列上做 global self-attention。需要进一步核对本文的 modality-decoupled variant 在实现上复用了原始 MoT 的哪些细节。

## Open Issues And Next Steps

1. 读原始 MoT 的实现与算法：attention, FFN, norm, QKV 到底在哪些层分开，global attention 如何实现。
2. 进一步区分「视觉—文本分路」和「理解—生成分路」。本文的结果更支持后者，尤其是 clean 与 noisy visual token 应采用不同计算路径的可能性。
3. 若做自己的实验，不应只在 Dense 与两条完全独立的 branch 之间二选一；应尝试 layer-dependent, noise-level-dependent 的 shared/private routing。
4. 设计受控消融：shared depth, attention/FFN sharing, token noise/time, pixel vs latent representation，以及容量与 FLOPs 对齐。
5. 测量 gradient conflict, cross-branch attention 与 layerwise representation，而不仅观察最终 benchmark。
6. 为 task-decoupled MOT 补齐同架构的 `UND-only` 与 `GEN-only` baseline，确认它是真的消除了 trade-off，而不是只在跨架构比较中显得更平衡。
