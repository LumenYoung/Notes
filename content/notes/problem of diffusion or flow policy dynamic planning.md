---
created: 2025-10-23
date: 2025-10-23
title: Problem when trying to remove the replanning lag of flow/diffusion policy
tags:
  - diffusion-policy
  - flow-policy
  - problem
  - robotics
---
Naive diffusion policy rollout has a problem during real world rollout which is the **lag between each policy inference iteration**. The policy can only plan accurately the next action chunk when the last action chunk has been executed and the robot is stopped.

One way naturally to solve this problem is making a dynamic planning. Meaning that the next inference starts between the last action chunk has been fully executed. But that is problematic since **there is no guarantee that the trajectory between two inference are consistent**, as shown from the drawing (a) from [[Publish/papers/SAIL - Faster-than-Demonstration Execution of Imitation Learning Policies|SAIL]] paper.

![[Publish/att/Policy rollout divergence between iterations.png | 600]]