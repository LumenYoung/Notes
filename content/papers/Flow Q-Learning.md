---
citation_key: " FloQLe25"
aliases: [' FloQLe25', "FQL", "One-step Policy"]
zotero_key: "JFTT7HDI"
item_type: "preprint"
title: "Flow Q-Learning"
abstract: "We present flow Q-learning (FQL), a simple and performant offline reinforcement learning (RL) method that leverages an expressive flow-matching policy to model arbitrarily complex action distributions in data. Training a flow policy with RL is a tricky problem, due to the iterative nature of the action generation process. We address this challenge by training an expressive one-step policy with RL, rather than directly guiding an iterative flow policy to maximize values. This way, we can completely avoid unstable recursive backpropagation, eliminate costly iterative action generation at test time, yet still mostly maintain expressivity. We experimentally show that FQL leads to strong performance across 73 challenging state- and pixel-based OGBench and D4RL tasks in offline RL and offline-to-online RL. Project page: https://seohong.me/projects/fql/"
url: "http://arxiv.org/abs/2502.02538"
doi: "10.48550/arXiv.2502.02538"
add_date: "2025-07-02T12:45:15Z"
authors: ['Seohong Park', 'Qiyang Li', 'Sergey Levine']
tags: ['Computer Science - Machine Learning', 'Computer Science - Artificial Intelligence', 'literature']
---
 
 # Flow Q-Learning
 
I want to read this because there is no solution in my mind on **how to model the reward from multiple steps of action**. This is crucial for my design of the incorporation of the Pi0 model into the HIL. But in fact Q-Chunking is the solution for that. FQL instead is trying to address the gradient stability problem exists in the flow matching based RL.

### BackPropogation Through Time

> Why multiple step generation would be harmful for the BPTT?

**There is no BPTT when training in imitation learning**. BPTT means when you need to perform a loss given the multiple steps of generation from the flow matching, and this is **an inevitable step when training Reinforcement Learning on a Flow Policy**. When the flow matching policy was trained, it was trained on each individual generation step not on the ODE inference outcome. So RL objective introduces another problem, which is the gradient stability and the training cost when training on the iterative result from the flow policy, and they are **not intending to solve this complicated problem rather they want to distill a one step policy from the multiple step flow generation**.

The time in BPTT is the simulation time that is introduced in the flow matching generation, not the physical time we expect between actions from the action chunk.
