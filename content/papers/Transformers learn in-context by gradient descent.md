---
citation_key: " Traleain23"
aliases: [' Traleain23']
date: "2025-10-26"
zotero_key: "CMK8XQSZ"
item_type: "preprint"
title: "Transformers learn in-context by gradient descent"
abstract: "At present, the mechanisms of in-context learning in Transformers are not well understood and remain mostly an intuition. In this paper, we suggest that training Transformers on auto-regressive objectives is closely related to gradient-based meta-learning formulations. We start by providing a simple weight construction that shows the equivalence of data transformations induced by 1) a single linear self-attention layer and by 2) gradient-descent (GD) on a regression loss. Motivated by that construction, we show empirically that when training self-attention-only Transformers on simple regression tasks either the models learned by GD and Transformers show great similarity or, remarkably, the weights found by optimization match the construction. Thus we show how trained Transformers become mesa-optimizers i.e. learn models by gradient descent in their forward pass. This allows us, at least in the domain of regression problems, to mechanistically understand the inner workings of in-context learning in optimized Transformers. Building on this insight, we furthermore identify how Transformers surpass the performance of plain gradient descent by learning an iterative curvature correction and learn linear models on deep data representations to solve non-linear regression tasks. Finally, we discuss intriguing parallels to a mechanism identified to be crucial for in-context learning termed induction-head (Olsson et al., 2022) and show how it could be understood as a specific case of in-context learning by gradient descent learning within Transformers. Code to reproduce the experiments can be found at https://github.com/google-research/self-organising-systems/tree/master/transformers_learn_icl_by_gd ."
url: "http://arxiv.org/abs/2212.07677"
doi: "10.48550/arXiv.2212.07677"
add_date: "2025-10-20T15:09:42Z"
authors: ['Johannes von Oswald', 'Eyvind Niklasson', 'Ettore Randazzo', 'João Sacramento', 'Alexander Mordvintsev', 'Andrey Zhmoginov', 'Max Vladymyrov']
tags: ['Computer Science - Machine Learning', 'Computer Science - Artificial Intelligence', 'Computer Science - Computation and Language', 'literature']
---

> MYTAKE
> 这样的结论太神奇了。看起来这就是 scaling law 能够 work 的来源。Transformers 在学习的是一个更复杂的任务，而不是单纯的在 fit 已有的，只有这样才能解释为什么 Transformers 在大量的数据中能够学习到强大的先验。🤔这个结论对于 VLA 的设计又有什么启发呢？

The authers shows that transformer learns in context **on regression tasks** via simulating the gradient descent on their forward pass.  To demonstrate this, the authors construct a single linear self-attention layer and prove that the weights a Transformer learns after training match those required to perform one step of GD on a meta-learning regression task.

So this suggests a two-timescale learning process of Transformers: _during training_ is the slow loop (SGB on parameter $theta$), in which transformers slowly learn an mesa-optimizer inside their weight. _During the inference time_, a single forward acts as a fast Gradient Descent on the in-context example, effectively implementing a learned optimization procedure, like Gradient Descent, that is for the current task.

## Only for linear regression?

No. Once an MLP is inserted before the attention layer, the network first embeds the tokens non-linearly and **then** applies GD in the learned feature space, so the story generalises beyond raw linear regression.
