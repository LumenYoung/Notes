---
citation_key: " SAIFasEx25"
aliases:
  - " SAIFasEx25"
  - SAIL
date: 2025-10-23
published: 2025-10-23
zotero_key: KB6XYJD6
item_type: preprint
title: "SAIL: Faster-than-Demonstration Execution of Imitation Learning Policies"
abstract: "Offline Imitation Learning (IL) methods such as Behavior Cloning are effective at acquiring complex robotic manipulation skills. However, existing IL-trained policies are confined to executing the task at the same speed as shown in demonstration data. This limits the task throughput of a robotic system, a critical requirement for applications such as industrial automation. In this paper, we introduce and formalize the novel problem of enabling faster-than-demonstration execution of visuomotor policies and identify fundamental challenges in robot dynamics and state-action distribution shifts. We instantiate the key insights as SAIL (Speed Adaptation for Imitation Learning), a full-stack system integrating four tightly-connected components: (1) a consistency-preserving action inference algorithm for smooth motion at high speed, (2) high-fidelity tracking of controller-invariant motion targets, (3) adaptive speed modulation that dynamically adjusts execution speed based on motion complexity, and (4) action scheduling to handle real-world system latencies. Experiments on 12 tasks across simulation and two real, distinct robot platforms show that SAIL achieves up to a 4x speedup over demonstration speed in simulation and up to 3.2x speedup in the real world. Additional detail is available at https://nadunranawaka1.github.io/sail-policy"
url: http://arxiv.org/abs/2506.11948
doi: 10.48550/arXiv.2506.11948
add_date: 2025-10-15T10:32:28Z
authors:
  - Nadun Ranawaka Arachchige
  - Zhenyang Chen
  - Wonsuhk Jung
  - Woo Chul Shin
  - Rohan Bansal
  - Pierre Barroso
  - Yu Hang He
  - Yingyang Celine Lin
  - Benjamin Joffe
  - Shreyas Kousik
  - Danfei Xu
tags:
  - Computer Science - Artificial Intelligence
  - Computer Science - Robotics
  - literature
created: 2025-10-23
---

SAIL propose a mechanism to solve the the [[Publish/notes/problem of diffusion or flow policy dynamic planning|divergence problem of the policy's dynamic inference]]. Essentially it implements a "take or discard" logic based on how large the newly predicted trajectory divergences from the old trajectory. 

The policy can also explicitly condition the next generation based on previous trajectory. At every replan step there is a fixed-length tail of the previous plan (the action sequence $a^c = a_(H^e : H^e + H^f)$ that was left un-executed).

SAIL uses a component called **Error-Adaptive Guidance (EAG)** to manage trajectory deviation and ensure smooth, consistent actions.
   - When the error check says "still on track" it combines the conditional and unconditional score in the usual classifier-free-guidance way and lets the tail strongly bias the newly-generated plan.  
   - When the error check says "too large" it disables guidance on that tail altogether (w = 0) and lets the policy generate purely from the unconditional score, implicitly forgetting the old plan until the next replan.  

![[Publish/att/Policy rollout divergence between iterations.png| 400]]