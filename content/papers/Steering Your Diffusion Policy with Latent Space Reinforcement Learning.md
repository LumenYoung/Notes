---
citation_key: " SteYouDi25"
aliases: [' SteYouDi25']
date: "2025-10-10"
published: "2025-10-10"
zotero_key: "28AZW3S7"
item_type: "preprint"
title: "Steering Your Diffusion Policy with Latent Space Reinforcement Learning"
abstract: "Robotic control policies learned from human demonstrations have achieved impressive results in many real-world applications. However, in scenarios where initial performance is not satisfactory, as is often the case in novel open-world settings, such behavioral cloning (BC)-learned policies typically require collecting additional human demonstrations to further improve their behavior -- an expensive and time-consuming process. In contrast, reinforcement learning (RL) holds the promise of enabling autonomous online policy improvement, but often falls short of achieving this due to the large number of samples it typically requires. In this work we take steps towards enabling fast autonomous adaptation of BC-trained policies via efficient real-world RL. Focusing in particular on diffusion policies -- a state-of-the-art BC methodology -- we propose diffusion steering via reinforcement learning (DSRL): adapting the BC policy by running RL over its latent-noise space. We show that DSRL is highly sample efficient, requires only black-box access to the BC policy, and enables effective real-world autonomous policy improvement. Furthermore, DSRL avoids many of the challenges associated with finetuning diffusion policies, obviating the need to modify the weights of the base policy at all. We demonstrate DSRL on simulated benchmarks, real-world robotic tasks, and for adapting pretrained generalist policies, illustrating its sample efficiency and effective performance at real-world policy improvement."
url: "http://arxiv.org/abs/2506.15799"
doi: "10.48550/arXiv.2506.15799"
add_date: "2025-10-10T10:55:30Z"
authors: ['Andrew Wagenmaker', 'Mitsuhiko Nakamoto', 'Yunchu Zhang', 'Seohong Park', 'Waleed Yagoub', 'Anusha Nagabandi', 'Abhishek Gupta', 'Sergey Levine']
tags: ['Computer Science - Machine Learning', 'Computer Science - Robotics', 'literature']
---

DSRL provides a hint on how initial sampling from the Gaussian distribution affects the eventual trajectory generated. By identifying a sub-Gaussian distribution within the original sampling Gaussian that performs consistently well on a task, DSRL achieves consistent performance without additional fine-tuning.

The interesting part of this work is the finding that **Diffusion Policy effectively encodes trajectory information in the initial noise, even though training starts from randomly sampled noise**. More accurately, what was assumed to be unimportant for performance actually turns out not to be.

While this is a notable finding, I consider it more a discovery about the properties of Diffusion Policy than an efficient control method. This view is based on two main limitations:
1.  **It relies on a restrictive assumption:** The search for a single sub-Gaussian distribution implies a single optimal noise pattern, which may not capture the full, potentially multi-modal, space of good initial states.
2.  **The mechanism is unclear:** Its success might simply be because it finds a noise seed that is already a nearly-denoisable trajectory, rather than truly 'controlling' the diffusion process. The authors have not yet ruled this out.

Overall, it's an interesting work that performs surprisingly well. However, I doubt whether we can make further progress in this direction to 1) find more powerful ways to steer Diffusion Policy accurately, or 2) gain a deeper understanding of its properties.
