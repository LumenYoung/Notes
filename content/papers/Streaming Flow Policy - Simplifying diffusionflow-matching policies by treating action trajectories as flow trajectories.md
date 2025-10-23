---
citation_key: " StrFloPo25"
aliases:
  - " StrFloPo25"
date: 2025-10-23
zotero_key: KVXJME46
item_type: preprint
title: "Streaming Flow Policy: Simplifying diffusion$/$flow-matching policies by treating action trajectories as flow trajectories"
abstract: "Recent advances in diffusion$/$flow-matching policies have enabled imitation learning of complex, multi-modal action trajectories. However, they are computationally expensive because they sample a trajectory of trajectories: a diffusion$/$flow trajectory of action trajectories. They discard intermediate action trajectories, and must wait for the sampling process to complete before any actions can be executed on the robot. We simplify diffusion$/$flow policies by treating action trajectories as flow trajectories. Instead of starting from pure noise, our algorithm samples from a narrow Gaussian around the last action. Then, it incrementally integrates a velocity field learned via flow matching to produce a sequence of actions that constitute a single trajectory. This enables actions to be streamed to the robot on-the-fly during the flow sampling process, and is well-suited for receding horizon policy execution. Despite streaming, our method retains the ability to model multi-modal behavior. We train flows that stabilize around demonstration trajectories to reduce distribution shift and improve imitation learning performance. Streaming flow policy outperforms prior methods while enabling faster policy execution and tighter sensorimotor loops for learning-based robot control. Project website: https://streaming-flow-policy.github.io/"
url: http://arxiv.org/abs/2505.21851
doi: 10.48550/arXiv.2505.21851
add_date: 2025-06-16T10:50:36Z
authors:
  - Sunshine Jiang
  - Xiaolin Fang
  - Nicholas Roy
  - Tomás Lozano-Pérez
  - Leslie Pack Kaelbling
  - Siddharth Ancha
tags:
  - Computer Science - Machine Learning
  - Computer Science - Artificial Intelligence
  - Computer Science - Robotics
  - literature
created: 2025-10-23
---

Streaming Flow Policy (SFP) differs from prior flow-matching diffusion policies by turning the trajectory space into the flow space itself: integration begins from the robot’s last executed action (or measured state) rather than from unstructured noise, so every ODE step immediately yields an executable action that is streamed on-the-fly while the rest of the trajectory is still being generated. The key modifications that make this work are:

1. redesigning the neural velocity field $v_theta (a, t |h)$ to map scalar action/time/history inputs instead of whole action sequences,
2. adding a stabilizing term $-k(a- xi(t))$ to each demonstration’s conditional velocity field so the learned marginal flow stays close to training data and resists integration drift.
3. supporting deterministic or latent-variable stochastic inference so actions can be sampled deterministically at test time while still capturing multimodal behaviour.

Across Push-T, RoboMimic lift/can/square and real-robot tests, SFP matches or exceeds the success rates of 100-step diffusion and 10-step DDIM baselines while cutting action latency by an order of magnitude (3–5 ms vs 30–127 ms) and enabling tight sensorimotor loops for reactive control.

I think this is a very good improvement to the current flow policy. But this requires complete retrain of the existing policy which makes it not applicable in the short term. But I would like to get my hands on it when I got time for it. Compare to other approaches to reduce [[Publish/notes/problem of diffusion or flow policy dynamic planning|the lag between inferences]] like [[Publish/papers/SAIL - Faster-than-Demonstration Execution of Imitation Learning Policies|SAIL]], this is a more elegant and foundamental approach. 

However, no experiments has been done yet to show whether the similar performance can be maintained when scaling up. So I don’t know whether it is justified or not to follow up on this.


