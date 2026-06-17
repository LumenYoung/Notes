---
citation_key: " MobMobYo25"
Galiases:
  - " MobMobYo25"
date: 2025-10-23
published: 2025-10-23
zotero_key: 3QDQW3HU
item_type: preprint
title: "Mobi-π: Mobilizing Your Robot Learning Policy"
abstract: "Learned visuomotor policies are capable of performing increasingly complex manipulation tasks. However, most of these policies are trained on data collected from limited robot positions and camera viewpoints. This leads to poor generalization to novel robot positions, which limits the use of these policies on mobile platforms, especially for precise tasks like pressing buttons or turning faucets. In this work, we formulate the policy mobilization problem: find a mobile robot base pose in a novel environment that is in distribution with respect to a manipulation policy trained on a limited set of camera viewpoints. Compared to retraining the policy itself to be more robust to unseen robot base pose initializations, policy mobilization decouples navigation from manipulation and thus does not require additional demonstrations. Crucially, this problem formulation complements existing efforts to improve manipulation policy robustness to novel viewpoints and remains compatible with them. We propose a novel approach for policy mobilization that bridges navigation and manipulation by optimizing the robot's base pose to align with an in-distribution base pose for a learned policy. Our approach utilizes 3D Gaussian Splatting for novel view synthesis, a score function to evaluate pose suitability, and sampling-based optimization to identify optimal robot poses. To understand policy mobilization in more depth, we also introduce the Mobi-$pi$ framework, which includes: (1) metrics that quantify the difficulty of mobilizing a given policy, (2) a suite of simulated mobile manipulation tasks based on RoboCasa to evaluate policy mobilization, and (3) visualization tools for analysis. In both our developed simulation task suite and the real world, we show that our approach outperforms baselines, demonstrating its effectiveness for policy mobilization."
url: http://arxiv.org/abs/2505.23692
doi: 10.48550/arXiv.2505.23692
add_date: 2025-10-08T00:09:22Z
authors:
  - Jingyun Yang
  - Isabella Huang
  - Brandon Vu
  - Max Bajracharya
  - Rika Antonova
  - Jeannette Bohg
tags:
  - Computer Science - Machine Learning
  - Computer Science - Computer Vision and Pattern Recognition
  - Computer Science - Robotics
  - literature
created: 2025-10-20
---

TRAINING

Mobi-π never retrains or fine-tunes the original manipulation policy.  

Instead it keeps the policy frozen and, at deployment time, builds a 3-D Gaussian-splatting (3DGS) scene model from 1 000 casually-collected RGB-D images (< 5 min of driving around).  

A hybrid score function K(p) (in-distribution similarity via DINO features + object visibility via MiniCPM-V + collision check) is optimised with Bayesian optimisation to decide where the mobile base should stop so that the *already-trained* policy receives an in-distribution camera view.

DATASET

There is no additional finetune dataset for the pretrained VLA in this work, instead mobi-$pi$ uses 1 000 RGB-D frames per novel room (no manual labelling) to build 3DGS map of the room.

No extra navigation or mobile-manipulation data are collected.

ARCHITECTURE

The mobi-$pi$ policy mobilisation pipeline is policy-agnostic; π₀ (or any other visuo-motor policy) is treated as a black box. The method only asks for the initial camera observations that appeared in its training set so the DINO score can be computed.

CONLUSIONS
- By simply choosing a base pose that keeps the incoming images “in distribution”, a fixed-base manipulation policy can be *mobilised* without extra demonstrations or retraining.  
- In simulation the proposed method beats both non-policy-aware and data-heavy policy-aware baselines on five kitchen tasks and matches the success rate of the same policy executed from its original, studio pose even under 5 cm pose noise.  
- Real-robot experiments (grocery-store mock-up, 6 × 10 m) show 70–100 % task success versus ≤ 40 % for human or BC-w/-Nav baselines, with zero fatal collisions.  
- Policy mobilisation therefore offers a practical, data-efficient route to turn stationary-manipulation policies into reliable mobile-manipulation skills.

My take is that this is a good way to **hardcode** navigation into the manipulation pipeline without any additional training.
