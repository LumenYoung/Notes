---
citation_key: " ReiLeaAc25"
aliases: [' ReiLeaAc25', "qchunking"]
zotero_key: "CYPS2MLW"
item_type: "preprint"
date: "2025-08-15"
published: "2025-08-15"
title: "Reinforcement Learning with Action Chunking"
abstract: "We present Q-chunking, a simple yet effective recipe for improving reinforcement learning (RL) algorithms for long-horizon, sparse-reward tasks. Our recipe is designed for the offline-to-online RL setting, where the goal is to leverage an offline prior dataset to maximize the sample-efficiency of online learning. Effective exploration and sample-efficient learning remain central challenges in this setting, as it is not obvious how the offline data should be utilized to acquire a good exploratory policy. Our key insight is that action chunking, a technique popularized in imitation learning where sequences of future actions are predicted rather than a single action at each timestep, can be applied to temporal difference (TD)-based RL methods to mitigate the exploration challenge. Q-chunking adopts action chunking by directly running RL in a 'chunked' action space, enabling the agent to (1) leverage temporally consistent behaviors from offline data for more effective online exploration and (2) use unbiased $n$-step backups for more stable and efficient TD learning. Our experimental results demonstrate that Q-chunking exhibits strong offline performance and online sample efficiency, outperforming prior best offline-to-online methods on a range of long-horizon, sparse-reward manipulation tasks."
url: "http://arxiv.org/abs/2507.07969"
doi: "10.48550/arXiv.2507.07969"
add_date: "2025-07-16T11:05:39Z"
authors: ['Qiyang Li', 'Zhiyuan Zhou', 'Sergey Levine']
tags: ['Computer Science - Machine Learning', 'Statistics - Machine Learning', 'Computer Science - Artificial Intelligence', 'Computer Science - Robotics', 'literature']
---

# Reinforcement Learning with Action Chunking

The core of Q-Chunking is pretty simple. Given a multi-step policy (or action chunk policy) $pi_psi ( a_(t:t+h) | s_t)$, the critic should be:

$$
Q_theta (s_t, a_(t:t+h)) arrow.l  sum_(t’=t)^(t+h-1) [ gamma^(t’-t)  r_t'] + gamma^h Q_theta (s_(t+h), a_(t+h:t+2h))
$$

The standard version of QC uses an implicit Kullback–Leibler (KL) divergence behavior constraint. This method works as follows:

1.  **Behavior Policy Training**: It first trains a behavior cloning flow policy, denoted as $f_xi (dot.op | s)$, using a flow-matching objective on the offline data. This policy learns to approximate the distribution of action sequences found in the dataset.
2.  **Best-of-N Sampling**: Instead of learning a separate policy, QC uses "**best-of-N**" sampling to implicitly enforce the behavior constraint. At each step, it samples $N$ action chunks from the learned behavior policy $f_xi (dot.op | s)$.
3.  **Action Selection**: It then selects the action chunk that results in the highest value from the Q-function. This chosen action chunk is used to interact with the environment and for the temporal difference (TD) backup.

## Additional

Q-Chunking wasn’t conducting experiment on Pi0, rather on a custom model.
