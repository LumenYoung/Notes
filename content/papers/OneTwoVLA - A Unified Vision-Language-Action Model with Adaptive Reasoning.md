---
citation_key: " OneUniVi25"
aliases: [' OneUniVi25']
date: "2025-10-08"
zotero_key: "352A2A2X"
item_type: "preprint"
title: "OneTwoVLA: A Unified Vision-Language-Action Model with Adaptive Reasoning"
abstract: "General-purpose robots capable of performing diverse tasks require synergistic reasoning and acting capabilities. However, recent dual-system approaches, which separate high-level reasoning from low-level acting, often suffer from challenges such as limited mutual understanding of capabilities between systems and latency issues. This paper introduces OneTwoVLA, a single unified vision-language-action model that can perform both acting (System One) and reasoning (System Two). Crucially, OneTwoVLA adaptively switches between two modes: explicitly reasoning at critical moments during task execution, and generating actions based on the most recent reasoning at other times. To further unlock OneTwoVLA's reasoning and generalization capabilities, we design a scalable pipeline for synthesizing embodied reasoning-centric vision-language data, used for co-training with robot data. We validate OneTwoVLA's effectiveness through extensive experiments, highlighting its superior performance across four key capabilities: long-horizon task planning, error detection and recovery, natural human-robot interaction, and generalizable visual grounding, enabling the model to perform long-horizon, highly dexterous manipulation tasks such as making hotpot or mixing cocktails."
url: "http://arxiv.org/abs/2505.11917"
doi: "10.48550/arXiv.2505.11917"
add_date: "2025-06-16T06:56:37Z"
authors: ['Fanqi Lin', 'Ruiqian Nai', 'Yingdong Hu', 'Jiacheng You', 'Junming Zhao', 'Yang Gao']
tags: ['Computer Science - Robotics', 'literature']
---

TRAINING PIPELINE
- Real-robot data: every demonstration is sliced into “reasoning intervals” (where the model is taught to output a textual scene description, plan, history summary and next-step instruction) and “acting intervals” (where it predicts the low-level action chunk conditioned on that reasoning).
- Synthetic co-training: 16 k vision-language (VL) image/reasoning pairs are automatically generated (Gemini 2.5 Pro text → FLUX images → paired captions).
- Multi-task loss: a single model receives either `[BOR]` (enter reasoning) or `[BOA]` (enter acting) token and is trained with (i) cross-entropy on generated text, (ii) flow-matching on continuous actions, and (iii) a binary token-classification loss on the decision token. This keeps both modes inside one network and lets VL data improve reasoning while real data teaches acting.

DATASET
- 2 k expert demonstrations on a Franka arm and a dual-arm ARX rig, plus 600–1 200 pick-place/open-close/pour clips per long-horizon task.
- 16 k synthetic vision-language samples (6 000 for visual-grounding tasks, 10 000 for long-horizon planning) used for co-training.

ADAPTATIONS TO π0
- π0’s VLM is kept but its autoregressive head is extended to emit `[BOR]/[BOA]` decision tokens.
- Input now carries two RGB views: current wrist/base camera image + a “reference” image at the time of the last reasoning step, plus the latest textual reasoning R.
- During acting we append proprioceptive history (poses at t − 0.25 s and t − 0.05 s) to make the flow-matching head smoother.
- All modules share the same vision encoder; only the action expert is flow-matched, all text is cross-entropy supervised.

KEY CONCLUSIONS
- A single unified VLA can interleave explicit reasoning and closed-loop acting without splitting into two slow/fast modules, removing mutual-misunderstanding and latency issues.
- Reasoning-aware training and large-scale VL co-training together boost long-horizon planning success by ~30% over π0 and ~24% over a Gemini/π0 cascade, while also enabling error recovery, fluent human interaction and strong open-world visual grounding—even on objects never seen in robot demos.