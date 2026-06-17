---
citation_key: " TAVEluDe25"
aliases: [' TAVEluDe25']
date: "2025-10-11"
published: "2025-10-11"
zotero_key: "B22584HH"
item_type: "preprint"
title: "TA-VLA: Elucidating the Design Space of Torque-aware Vision-Language-Action Models"
abstract: "Many robotic manipulation tasks require sensing and responding to force signals such as torque to assess whether the task has been successfully completed and to enable closed-loop control. However, current Vision-Language-Action (VLA) models lack the ability to integrate such subtle physical feedback. In this work, we explore Torque-aware VLA models, aiming to bridge this gap by systematically studying the design space for incorporating torque signals into existing VLA architectures. We identify and evaluate several strategies, leading to three key findings. First, introducing torque adapters into the decoder consistently outperforms inserting them into the encoder.Third, inspired by joint prediction and planning paradigms in autonomous driving, we propose predicting torque as an auxiliary output, which further improves performance. This strategy encourages the model to build a physically grounded internal representation of interaction dynamics. Extensive quantitative and qualitative experiments across contact-rich manipulation benchmarks validate our findings."
url: "http://arxiv.org/abs/2509.07962"
doi: "10.48550/arXiv.2509.07962"
add_date: "2025-09-28T09:09:29Z"
authors: ['Zongzheng Zhang', 'Haobo Xu', 'Zhuo Yang', 'Chenghao Yue', 'Zehao Lin', 'Huan-ang Gao', 'Ziwei Wang', 'Hao Zhao']
tags: ['Computer Science - Robotics', 'literature']
---

> MYTAKE
> I met the poster of the paper on CoRL 2025. I think it is good in the sense that it sufficiently explored the design space of integrating the torque. Also the proposed improvement is minimal and clear, not paying unfair price for the performance boost.

TA-VLA gives a systematic study on _how to integrate torque signal into VLA_, they show that the best way to give a pretrained Vision-Language-Action model a sense of force is 

1. put the torque data into the decoder, not the encoder.
2. compress the whole history of joint torques into one additional token instead of adding many per-frame tokens.

Injecting this single “torque-history” token next to the robot-state input of π0’s flow-matching decoder boosts contact-rich tasks (button pushing, charger/USB plug insertion, etc) from ≤25 % to 85–90 % success, without hurting regular tasks.

A second design choice—training the same diffusion head to denoise both future actions and future torques—further lifts performance to 90–95 % while keeping inference cost almost unchanged (≈90 ms on an RTX 4090). Extending the recipe to a different VLA (RDT-1B) and to another robot arm (ROKAE SR) gives identical gains, confirming that “**decoder-side single-token torque history**” is the most robust and transferable integration strategy.

## Why decoder side better than encoder side?

**Alignment & Covariance**: since the torque signal pattern is more like the robot state signal, they co-varies more naturally. **Therefore the information are naturally utilized** instead of need to extract from the encoder’s conditioning feature.

**Sensitivity**: decoder (action head)'s generation is conditioned on the 1) the robot-state token and 2) the noisy trajectory. Therefore action head in theory would be more sensitive to the changes of token signal here. This is a more direct pathway to condition the action generation than from the VLM’s attention map.

## What modification needed on $pi 0$?

Not much TBH. Only the decoder side needs **additional token that encodes the whole torque information of all frames** prepended. This already gives you the most of the performance boost:

**Adding Torque as Observation (major performance boost):** An MLP adapter was added to process the torque history. The history was aggregated into a single token and then prepended to the state inputs of π0's action decoder.

**Adding Torque as Output (additional performance boost):** The final linear layer of the decoder was expanded to predict both future actions and future torques simultaneously. The model was then trained with a new combined loss function that includes a term for torque prediction error, balanced by a weighting factor (β) . When loading pre-trained weights, the new parts of the weight matrix for torque prediction were initialized with small values to not disrupt the existing action-generation capabilities.

They report only 30k steps of LoRA finetuning would be enough with 4 x L20 GPUs.
