---
citation_key: " VarDisDi"
aliases: [' VarDisDi', "VDD"]
date: "2025-08-07"
published: "2025-08-07"
zotero_key: "JQQZJE74"
item_type: "journalArticle"
title: "Variational Distillation of Diffusion Policies into Mixture of Experts"
abstract: "This work introduces Variational Diffusion Distillation (VDD), a novel method that distills denoising diffusion policies into Mixtures of Experts (MoE) through variational inference. Diffusion Models are the current state-of-the-art in generative modeling due to their exceptional ability to accurately learn and represent complex, multi-modal distributions. This ability allows Diffusion Models to replicate the inherent diversity in human behavior, making them the preferred models in behavior learning such as Learning from Human Demonstrations (LfD). However, diffusion models come with some drawbacks, including the intractability of likelihoods and long inference times due to their iterative sampling process. The inference times, in particular, pose a significant challenge to real-time applications such as robot control. In contrast, MoEs effectively address the aforementioned issues while retaining the ability to represent complex distributions but are notoriously difficult to train. VDD is the first method that distills pre-trained diffusion models into MoE models, and hence, combines the expressiveness of Diffusion Models with the benefits of Mixture Models. Specifically, VDD leverages a decompositional upper bound of the variational objective that allows the training of each expert separately, resulting in a robust optimization scheme for MoEs. VDD demonstrates across nine complex behavior learning tasks, that it is able to: i) accurately distill complex distributions learned by the diffusion model, ii) outperform existing state-of-the-art distillation methods, and iii) surpass conventional methods for training MoE. The code and videos are available at https://intuitive-robots.github.io/vdd-website."
add_date: "2025-08-07T13:12:38Z"
authors: ['Hongyi Zhou', 'Xiaogang Jia', 'Gerhard Neumann', 'Rudolf Lioutikov']
---

# Variational Distillation of Diffusion Policies into Mixture of Experts

Distill MoE from pretrained diffusion model. VDD optimized via reverse KL divergence to route 

> 🤔 When using MoE, how to route the inference to different Experts?

> 🤔 How is this approach different compare to the one step policy proposed by UCB? [[Publish/papers/Flow Q-Learning]]

FQL is single network while VDD is using MoE. 
