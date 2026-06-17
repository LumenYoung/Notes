---
citation_key: " GoaImiLe23a"
aliases: [' GoaImiLe23a', "Beso"]
date: "2025-08-07"
published: "2025-08-07"
zotero_key: "XGIR6FFS"
item_type: "preprint"
title: "Goal-Conditioned Imitation Learning using Score-based Diffusion Policies"
abstract: 'We propose a new policy representation based on score-based diffusion models (SDMs). We apply our new policy representation in the domain of Goal-Conditioned Imitation Learning (GCIL) to learn general-purpose goal-specified policies from large uncurated datasets without rewards. Our new goal-conditioned policy architecture "$textbf{BE}$havior generation with $textbf{S}$c$textbf{O}$re-based Diffusion Policies" (BESO) leverages a generative, score-based diffusion model as its policy. BESO decouples the learning of the score model from the inference sampling process, and, hence allows for fast sampling strategies to generate goal-specified behavior in just 3 denoising steps, compared to 30+ steps of other diffusion based policies. Furthermore, BESO is highly expressive and can effectively capture multi-modality present in the solution space of the play data. Unlike previous methods such as Latent Plans or C-Bet, BESO does not rely on complex hierarchical policies or additional clustering for effective goal-conditioned behavior learning. Finally, we show how BESO can even be used to learn a goal-independent policy from play-data using classifier-free guidance. To the best of our knowledge this is the first work that a) represents a behavior policy based on such a decoupled SDM b) learns an SDM based policy in the domain of GCIL and c) provides a way to simultaneously learn a goal-dependent and a goal-independent policy from play-data. We evaluate BESO through detailed simulation and show that it consistently outperforms several state-of-the-art goal-conditioned imitation learning methods on challenging benchmarks. We additionally provide extensive ablation studies and experiments to demonstrate the effectiveness of our method for goal-conditioned behavior generation. Demonstrations and Code are available at https://intuitive-robots.github.io/beso-website/'
url: "http://arxiv.org/abs/2304.02532"
doi: "10.48550/arXiv.2304.02532"
add_date: "2025-08-07T13:01:52Z"
authors: ['Moritz Reuss', 'Maximilian Li', 'Xiaogang Jia', 'Rudolf Lioutikov']
tags: ['Computer Science - Machine Learning', 'Computer Science - Robotics', 'literature']
---

# Goal-Conditioned Imitation Learning using Score-based Diffusion Policies

> 🤔 Why use the score based diffusion instead of DDPM when DDPM is theoritically more grounded and simplier to implement? What did they learn when they were exploring the SDM (Score-based Diffusion Model).
