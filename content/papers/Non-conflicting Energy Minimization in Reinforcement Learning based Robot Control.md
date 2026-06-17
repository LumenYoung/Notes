---
citation_key: " NonEneMi25"
aliases: [' NonEneMi25']
date: "2025-10-08"
zotero_key: "AGEKLSM5"
item_type: "preprint"
title: "Non-conflicting Energy Minimization in Reinforcement Learning based Robot Control"
abstract: "Efficient robot control often requires balancing task performance with energy expenditure. A common approach in reinforcement learning (RL) is to penalize energy use directly as part of the reward function. This requires carefully tuning weight terms to avoid undesirable trade-offs where energy minimization harms task success. In this work, we propose a hyperparameter-free gradient optimization method to minimize energy expenditure without conflicting with task performance. Inspired by recent works in multitask learning, our method applies policy gradient projection between task and energy objectives to derive policy updates that minimize energy expenditure in ways that do not impact task performance. We evaluate this technique on standard locomotion benchmarks of DM-Control and HumanoidBench and demonstrate a reduction of 64% energy usage while maintaining comparable task performance. Further, we conduct experiments on a Unitree GO2 quadruped showcasing Sim2Real transfer of energy efficient policies. Our method is easy to implement in standard RL pipelines with minimal code changes, is applicable to any policy gradient method, and offers a principled alternative to reward shaping for energy efficient control policies."
url: "http://arxiv.org/abs/2509.01765"
doi: "10.48550/arXiv.2509.01765"
add_date: "2025-10-07T23:24:56Z"
authors: ['Skand Peri', 'Akhil Perincherry', 'Bikram Pandit', 'Stefan Lee']
tags: ['Computer Science - Robotics', 'literature']
---

[The paper](http://arxiv.org/abs/2509.01765) has a neat idea: when you simultaneously update the task reward and the energy reward in RL, the cleanest trick is to project the energy reward gradient onto the vector orthogonal to the task-reward gradient.  

They also show that an adaptive scaling factor is indispensable: without it, the energy term swamps the task term and performance collapses. The scaling simply enforces the prior “task first, energy second”.  

I like the solution because it is elegant: the only thing it commits to is that gradient updates coming from task completion dominate those coming from efficiency; it enforces this commitment by separately tuning the direction and the magnitude of the energy-gradient contribution.