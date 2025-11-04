---
aliases: [] 
date: 2025-11-04
tags: [reinforcement-learning]
title: difference between on policy and off policy
---
On policy is learning from the current experience, it is judged online. Therefore it is less sample efficient since each sample is only used once. 

In contrast off policy would maintain the replay buffer and reuse the experiences multiple times. So compare to the online learning it is more sample efficient.

However, the way to use the data doesn’t make the most important difference, the most important question is: **are the samples you are using to estimate the expectation coming from the same distribution that the expectation is defined over?** This leads to the definition of behavior policy and the target policy. Where behavior policy $mu$ produces the action and the target policy $pi$ is the one that is updated, estimating the expectation is not necessarily the same between these two policies.

So in online policy, behavior policy $mu$ is just the $pi$ policy, therefore it is an unbiased estimation. However this is not true for off-policy.
