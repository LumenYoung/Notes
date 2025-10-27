---
citation_key: " TAVEluDe25"
aliases: [' TAVEluDe25']
date: "2025-10-11"
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

TA-VLA gives a systematic study on _how to integrate torque signal into VLA_, they show that the best way to give a pretrained Vision-Language-Action model a sense of force is 

1. put the torque data into the decoder, not the encoder
2. compress the whole history of joint torques into one additional token instead of adding many per-frame tokens.

Injecting this single “torque-history” token next to the robot-state input of π0’s flow-matching decoder boosts contact-rich tasks (button pushing, charger/USB plug insertion, etc.) from ≤25 % to 85–90 % success, without hurting regular tasks. 

A second design choice—training the same diffusion head to denoise both future actions and future torques—further lifts performance to 90–95 % while keeping inference cost almost unchanged (≈90 ms on an RTX 4090). Extending the recipe to a different VLA (RDT-1B) and to another robot arm (ROKAE SR) gives identical gains, confirming that “**decoder-side single-token torque history**” is the most robust and transferable integration strategy.

