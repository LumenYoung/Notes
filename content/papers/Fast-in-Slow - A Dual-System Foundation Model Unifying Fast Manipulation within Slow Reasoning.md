---
citation_key: " FasDuaFo25"
aliases: [' FasDuaFo25']
date: "2025-10-20"
published: "2025-10-20"
zotero_key: "7HPYQDIZ"
item_type: "webpage"
title: "Fast-in-Slow: A Dual-System Foundation Model Unifying Fast Manipulation within Slow Reasoning"
abstract: "Generalized policy and execution efficiency constitute the two critical challenges in robotic manipulation. While recent foundation policies benefit from the common-sense reasoning capabilities of internet-scale pretrained vision-language models (VLMs), they often suffer from low execution frequency. To mitigate this dilemma, dual-system approaches, inspired by Kahneman's theory, have been proposed to leverage a VLM-based System 2 model handling high-level reasoning and a separate System 1 action model ensuring real-time control. However, existing designs maintain both systems as separate models, limiting System 1 from fully leveraging the rich pretrained knowledge from the VLM-based System 2. In this work, we propose Fast-in-Slow (FiS), a unified dual-system vision-language-action (VLA) model that embeds the System 1 execution module within the VLM-based System 2 by partially sharing parameters. This innovative paradigm not only enables high-frequency execution in System 1 but also facilitates coordination between the reasoning and execution components within a single foundation model of System 2. Given their fundamentally distinct roles within FiS-VLA, we design the two systems to incorporate heterogeneous modality inputs alongside asynchronous operating frequencies, enabling both fast and precise manipulation. To enable coordination between the two systems, a dual-aware co-training strategy is proposed that equips System 1 with action generation capabilities while preserving System 2's contextual reasoning representation. For evaluation, FiS-VLA outperforms previous state-of-the-art methods by 8% in simulation and 11% in real-world tasks in terms of average success rate, while achieving a 117.7 Hz control frequency with action chunk set to eight. Project web page: fast-in-slow.github.io."
url: "https://arxiv.org/abs/2506.01953v1"
add_date: "2025-06-16T07:02:03Z"
authors: ['Hao Chen', 'Jiaming Liu', 'Chenyang Gu', 'Zhuoyang Liu', 'Renrui Zhang', 'Xiaoqi Li', 'Xiao He', 'Yandong Guo', 'Chi-Wing Fu', 'Shanghang Zhang', 'Pheng-Ann Heng']
---

Fast-in-Slow repurposes the final transformer blocks of a 7-B VLM (LLAMA-2) to act as a ligh-weight, asynchronously executing system 1 (action head) while keeping the rest of the VLM as the system 2 that outputs the latent action.

This is a single, unified Transformer but just running asynchronously when inferencing. System-2 ingests 2-D images + text every 4-th timestep and emits a latent plan; System-1 receives that latent vector plus fresh 30-Hz 2-D images, robot state and 3-D point-cloud tokens and produces diffusion-denoised 8-step action chunks.

A dual-aware co-training objective jointly minimizes (i) the diffusion loss for continuous end-effector poses on noisy action chunks (`Lf_ast`) and (ii) the autoregressive cross-entropy loss for discrete action tokens or language plans (`Ls_low`), preventing catastrophic forgetting of the pretrained VLM weights.

## Connection to Other works

Like [[Literature_Note/FLOWER - Democratizing Generalist Robot Policies with Efficient Vision-Language-Action Flow Policies|FLOWER]], the act that they repurpose the last few blocks in llama 2 make it conditioned on the intermediate feature from the VLM instead of the final feature.

This is exactly similiar to the [[Publish/papers/generalist-gen0-findings|GEN-0 proposed from Generalist AI]].

In this kind of framework, it might no longer be necessary to have the bridging method like [[Publish/papers/SAIL - Faster-than-Demonstration Execution of Imitation Learning Policies|SAIL]] that tries to bridge the latency between action chunks. Instead since the most time consuming part (the VLM) is running asynchronously, the latency between action chunks could be minimal.

However, I think it is possible to adopt continous flow adaptation like described in [[Publish/papers/Streaming Flow Policy - Simplifying diffusionflow-matching policies by treating action trajectories as flow trajectories|Stream Flow Policy]] that helps on maintain the continuous representation of the async reasoning token.

## Training Dataset & Reported Performance

The model is first pretrained on 860-k open-source trajectories (Open-X, DROID, RoboMIND, etc.) and then fine-tuned on self-collected real-world dual-arm data with 3-camera views. 

Across RLBench simulation FiS-VLA raises success rate from 0.55 ($pi 0$) to 0.69 with >20 Hz control, on real dual-arm robots it achieves 68-74 % success versus 59-61 % for $pi 0$, generalizes to unseen objects, cluttered backgrounds and lighting, and reaches 117 Hz when action-chunk size is set to 8, demonstrating that embedding a fast execution module inside a frozen VLM yields both high speed and strong spatial reasoning. 