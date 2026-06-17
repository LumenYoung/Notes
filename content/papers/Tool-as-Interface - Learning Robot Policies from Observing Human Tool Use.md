---
citation_key: " TooLeaRo25"
aliases: [' TooLeaRo25']
date: "2025-10-08"
published: "2025-10-08"
zotero_key: "5U46R84K"
item_type: "preprint"
title: "Tool-as-Interface: Learning Robot Policies from Observing Human Tool Use"
abstract: "Tool use is essential for enabling robots to perform complex real-world tasks, but learning such skills requires extensive datasets. While teleoperation is widely used, it is slow, delay-sensitive, and poorly suited for dynamic tasks. In contrast, human videos provide a natural way for data collection without specialized hardware, though they pose challenges on robot learning due to viewpoint variations and embodiment gaps. To address these challenges, we propose a framework that transfers tool-use knowledge from humans to robots. To improve the policy's robustness to viewpoint variations, we use two RGB cameras to reconstruct 3D scenes and apply Gaussian splatting for novel view synthesis. We reduce the embodiment gap using segmented observations and tool-centric, task-space actions to achieve embodiment-invariant visuomotor policy learning. We demonstrate our framework's effectiveness across a diverse suite of tool-use tasks, where our learned policy shows strong generalization and robustness to human perturbations, camera motion, and robot base movement. Our method achieves a 71% improvement in task success over teleoperation-based diffusion policies and dramatically reduces data collection time by 77% and 41% compared to teleoperation and the state-of-the-art interface, respectively."
url: "http://arxiv.org/abs/2504.04612"
doi: "10.48550/arXiv.2504.04612"
add_date: "2025-10-07T23:22:44Z"
authors: ['Haonan Chen', 'Cheng Zhu', 'Shuijing Liu', 'Yunzhu Li', 'Katherine Driggs-Campbell']
tags: ['Computer Science - Machine Learning', 'Computer Science - Artificial Intelligence', 'Computer Science - Robotics', 'literature']
---

The core idea of [Tool as Interface](https://arxiv.org/abs/2504.04612) is to learn how to use a tool, rather than predicting low-level robot actions. This approach should make collecting demonstrations faster as it can be benefit from human video data collection. However, its main challenge is its compatibility—it's not immediately clear how well it fits into existing VLA pipeline, so integrating it quickly into current systems might be difficult.

> To improve the policy's robustness to viewpoint variations, we use two RGB cameras to reconstruct 3D scenes and apply Gaussian splatting for novel view synthesis. We reduce the embodiment gap using segmented observations and tool-centric, task-space actions to achieve embodiment-invariant visuomotor policy learning.