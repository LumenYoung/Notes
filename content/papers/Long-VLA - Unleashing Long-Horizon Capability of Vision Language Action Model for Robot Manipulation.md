---
citation_key: " LonUnlLo25"
aliases:
  - " LonUnlLo25"
  - longvla
date: 2025-10-23
published: 2025-10-23
zotero_key: ETTSM55I
item_type: preprint
title: "Long-VLA: Unleashing Long-Horizon Capability of Vision Language Action Model for Robot Manipulation"
abstract: Vision-Language-Action (VLA) models have become a cornerstone in robotic policy learning, leveraging large-scale multimodal data for robust and scalable control. However, existing VLA frameworks primarily address short-horizon tasks, and their effectiveness on long-horizon, multi-step robotic manipulation remains limited due to challenges in skill chaining and subtask dependencies. In this work, we introduce Long-VLA, the first end-to-end VLA model specifically designed for long-horizon robotic tasks. Our approach features a novel phase-aware input masking strategy that adaptively segments each subtask into moving and interaction phases, enabling the model to focus on phase-relevant sensory cues and enhancing subtask compatibility. This unified strategy preserves the scalability and data efficiency of VLA training, and our architecture-agnostic module can be seamlessly integrated into existing VLA models. We further propose the L-CALVIN benchmark to systematically evaluate long-horizon manipulation. Extensive experiments on both simulated and real-world tasks demonstrate that Long-VLA significantly outperforms prior state-of-the-art methods, establishing a new baseline for long-horizon robotic control.
url: http://arxiv.org/abs/2508.19958
doi: 10.48550/arXiv.2508.19958
add_date: 2025-10-08T00:08:50Z
authors:
  - Yiguo Fan
  - Pengxiang Ding
  - Shuanghao Bai
  - Xinyang Tong
  - Yuyang Zhu
  - Hongchao Lu
  - Fengqi Dai
  - Wei Zhao
  - Yang Liu
  - Siteng Huang
  - Zhaoxin Fan
  - Badong Chen
  - Donglin Wang
tags:
  - Computer Science - Robotics
  - literature
created: 2025-10-23
---

TRAINING RECEIPTS
 - Each demonstration trajectory is automatically split into “moving” and “interaction” phases.  
 - A one-bit phase identifier (–1 / +1) is appended to every action token so the network knows which phase it is in.  
 - During the moving phase only the static/third-person image tokens are kept active; during the interaction phase only the gripper/ego-centric tokens are kept active. This is implemented with a binary attention mask that is multiplied into the self-attention matrix, so no extra network branches are created.  
 - The whole model is trained end-to-end with a single diffusion loss (score-matching) on the continuous 7-DoF action tokens; an auxiliary Info-NCE loss (weight 0.1) aligns visual and language goals. No reinforcement-learning or on-line fine-tuning is used, so training remains purely off-line and data-efficient.

DATASET
 - Experiments are run on the extended L-CALVIN benchmark plus two real-robot tasks.  
 - L-CALVIN re-uses the original CALVIN dataset (~4 M robot frames) but re-labels them with movement-phase instructions; every trajectory is windowed into 64-frame sequences.  
 - Real-robot data: 200 human tele-operated demos per task (≈ 20 min each) plus ~2 h of unlabeled “play” data collected on a single UR5 table-top setup.  
 - The paper does not quote an aggregate “hours” or “episodes” number, but the total labeled demonstrations are on the order of a few hundreds, showing the method is highly data-efficient.

ARCHITECTURE
Long-VLA is built on top of the MDT (Multimodal Diffusion Transformer) policy; the same masking wrapper is also tested with HULC to show architecture-agnostic behaviour.

[[Publish/notes/How to apply Long-VLA receipt to an existing pretrained VLA]] is a checklist of steps that I summarized that could apply Long-VLA’s receipt to an existing VLA such as $pi 0$. I think it is not that generally applicable.

CONCLUSIONS
 - Phase-aware input masking inside a single end-to-end VLA network solves the skill-chaining problem that causes other VLAs to collapse after a few sub-tasks.  
 - The masking module is architecture-agnostic: plugging it into two different VLA backbones (MDT and HULC) gives consistent gains, showing it can be grafted onto existing models without redesign.  
 - Decomposing demonstrations into movement vs. interaction phases and masking accordingly keeps training fully off-line and scalable while greatly reducing error accumulation in long-horizon manipulation.

Compare to [[Publish/papers/OneTwoVLA - A Unified Vision-Language-Action Model with Adaptive Reasoning| OneTwoVLA]] or [[Publish/papers/π0.5 - a Vision-Language-Action Model with Open-World Generalization| Pi05]], Long-VLA is a more domain specific **training trick** instead of a more general solution to the long horizen training. I think it offers insight on how this trick performs (which seems good enough), however I don’t see it as something I want to integrate into my VLA.
