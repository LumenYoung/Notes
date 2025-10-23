---
aliases:
  - What I find interesting on CoRL 2025
date: 2025-10-23
tags:
  - research
  - conference
title: What I find interesting on CoRL 2025
created: 2025-10-11
---
## Topics that are useful to me

### On flow-based Policy speedup

Execution of VLA is slow and also from time to time clumpsy. The clumpsiness is from the nature of action chunk generation, one inference step produces several actions. The slowness however is the natural of the teleoperation.

There are two major directions for solving this problem. First is **stream/concatenate** the policy, instead of letting flow matching head generate the trajectory from the random noise, it starts from the previous trajectory and then creates the new trajectory based on previous one, on this direction we find [[Publish/papers/SAIL - Faster-than-Demonstration Execution of Imitation Learning Policies|SAIL]] and [[Literature_Note/Streaming Flow Policy - Simplifying diffusionflow-matching policies by treating action trajectories as flow trajectories|Stream Flow Policy]]. On another direction is simply train the model on the _accelerated trajectories_, this you find [[Literature_Note/DemoSpeedup - Accelerating Visuomotor Policies via Entropy-Guided Demonstration Acceleration|DemoSpeedup]], which tries to find which part of the demonstration can be accelerated.

The most mature and sound way to integrate into existing pipeline is [[Publish/papers/SAIL - Faster-than-Demonstration Execution of Imitation Learning Policies|SAIL]], which requires minimal architecture change and also handles the problem of _drifting movement_ very gracefully.

### On long horizon task / On combining navigation and manipuation

There are several works aiming to address the problem of the long horizon task execution. Their approaches are very distinct, 

long horizen solutions:
- [[Publish/papers/π0.5 - a Vision-Language-Action Model with Open-World Generalization|π0.5]]
- [[Publish/papers/N2M - Bridging Navigation and Manipulation by Learning Pose Preference from Rollout|N2M]]
- [[Publish/papers/OneTwoVLA - A Unified Vision-Language-Action Model with Adaptive Reasoning|OneTwoVLA]]
- [[Publish/papers/Long-VLA - Unleashing Long-Horizon Capability of Vision Language Action Model for Robot Manipulation|LongVLA]]
- [[Publish/papers/Mobi-π - Mobilizing Your Robot Learning Policy|Mobi-π]]
- Learning Long-Context Diffusion Policies via Past-Token Prediction|Past Token Prediction
- SPIN: distill skill rrt for long horizen

### On Efficient Data Curation and Selection

### Alternative Data Collection Pipeline

## Topics that are interesting to me

### DSRL

![[Publish/papers/Steering Your Diffusion Policy with Latent Space Reinforcement Learning]] 

### World Modeling

### On finding the generalizable component of LLM Components


### ToddlerBot: Humanoid toy from scratch

Stanford 的一位朋友自己从头开始搓出来的一个开源的小的人形机器人。从 PhD 功利的想要获得毕业的角度来看这个工作肯定是有点吃力不讨好的，但是我感觉这位朋友真的只是沉浸于从中学到的东西。更何况在北美做这种硬件的工作远没有在中国做方便。

Demo 是真的很酷，围在他的 poster 旁边看了好久这个 toddler 做引体向上。

## Torque Integration into VLA

Torque is definitely a must-have for finegrain manipulation, even it is not yet inside the current VLA architectures.

TODO: [[Literature_Note/TA-VLA - Elucidating the Design Space of Torque-aware Vision-Language-Action Models| TA-VLA]]

### Dyna Robotics Demo

Dyna was undoubtedly one of the highlights of the conference. While they revealed almost nothing about their technical approach, people were still more than willing to crowd around their booth to watch their policy fold clothes for a long time. The level of robustness on display was something I had never seen before.

Here is the information I managed to gather from them:
1.  **Larger Policies:** Jason Ma mentioned he believes a 2B parameter policy is too small to acquire complex behaviors, so their policy is larger than $pi 0$. I suspect it is only possible to be a 7B model.
2.  **Single-Step Recovery:** Their policy still operates on a single observation step, but it demonstrates a remarkable ability to recover from local minima—situations where a task has failed, and the system returns to a previous observation state.
3.  **Not Too Much Data:** Jason indicated that their policy was not trained on an excessively large dataset.
4.  **Strong Pretraining Transfer:** Although the policy shown at the booth required fine-tuning on a task-specific dataset to fold cloth, Jason mentioned they have seen positive results where a well-pretrained policy can perform downstream tasks directly. This claim seems to align with what Google has stated about their Gemini Robotics VLA.

### Discussion on the ideal action space

This raise from the DexUmi Oral session. I raised the question about their ideal task/action space and their answer has never been changed: relative action in the joint space. Unlike the stance they had on diffusion policy, where the absolute joint value and relative joint value had similar performance, they found that absolute joint action as the action space is much worst compare to the relative joint action in the case of the dexterous manipulation.

I am a bit not sure about this, so maybe need to check their paper on their claims.

### On learning Energy-Efficient RL Policies  

![[Publish/papers/Non-conflicting Energy Minimization in Reinforcement Learning based Robot Control]]

### Tool as Interface

![[Publish/papers/Tool-as-Interface - Learning Robot Policies from Observing Human Tool Use]]