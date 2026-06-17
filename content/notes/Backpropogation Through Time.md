---
date: 2025-07-16
tags: ["vla", "ucb"]
aliases: ["BPTT"]
---

A concept proposed by UCB people, which is a problem exists in propogating loss in inference time for the Flow based VLA training. The stability of the training is compromised by multiple iterative ODE step.

They propose to solve this problem by distill a one step model that doesn’t solve ODE on inference time. It should have compromised multi-modality on action distribution it learnt, but it should be more easily trained with online RL. This proposed method is called [Flow Q-Learning](https://seohong.me/projects/fql/)

This approach got me thinking a bootstraping of two policies: the flow policy learns to perform the action while the the one-step policy learns from RL and can therefore provide more autonomously collected data.

But this is not that realistic way to use it. Instead people might just want to have a good base policy and then have such one-step policy that works.

## Additional Thing

ConRFT avoids the BPTT problem by using only one step for denoising.