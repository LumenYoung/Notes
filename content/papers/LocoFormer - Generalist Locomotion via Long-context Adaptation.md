---
citation_key: " LocGenLo25"
aliases: [' LocGenLo25']
date: "2025-10-27"
zotero_key: "6586M3BY"
item_type: "preprint"
title: "LocoFormer: Generalist Locomotion via Long-context Adaptation"
abstract: "Modern locomotion controllers are manually tuned for specific embodiments. We present LocoFormer, a generalist omni-bodied locomotion model that can control previously unseen legged and wheeled robots, even without precise knowledge of their kinematics. LocoFormer is able to adapt to changes in morphology and dynamics at test time. We find that two key choices enable adaptation. First, we train massive scale RL on procedurally generated robots with aggressive domain randomization. Second, in contrast to previous policies that are myopic with short context lengths, we extend context by orders of magnitude to span episode boundaries. We deploy the same LocoFormer to varied robots and show robust control even with large disturbances such as weight change and motor failures. In extreme scenarios, we see emergent adaptation across episodes, LocoFormer learns from falls in early episodes to improve control strategies in later ones. We believe that this simple, yet general recipe can be used to train foundation models for other robotic skills in the future. Videos at generalist-locomotion.github.io."
url: "http://arxiv.org/abs/2509.23745"
doi: "10.48550/arXiv.2509.23745"
add_date: "2025-10-27T05:55:28Z"
authors: ['Min Liu', 'Deepak Pathak', 'Ananye Agarwal']
tags: ['Computer Science - Artificial Intelligence', 'Computer Science - Robotics', 'literature']
---

>Questions
>1. When considering the fact that [[Publish/papers/Transformers learn in-context by gradient descent]], how can we understand their architecture adaptation? Why it is successful? What problem they avoided?
>2. Like all the works that emphasize the cross embodiment learning, what does the policy learn from those aggressively varying embodiments? What common physics are behind this cross embodiment learning?

LocoFormer adapts the vanilla Transformer by replacing it with Transformer-XL, whose segment-level recurrence and cached hidden states let the policy attend to histories thousands of steps long (≈18 s at 50 Hz) without quadratic-time blow-up, so the model can do in-context, cross-trial adaptation instead of the usual few-hundred-millisecond context. 

It is pretrained with massively-scaled PPO on ≈100 k procedurally-generated robots—bipeds, quadrupeds and wheeled variants whose masses, inertias, gains and joint limits are aggressively randomized—yielding a single unified policy that sees two orders of magnitude more embodiments than prior work. 

The key finding is that this breadth plus long-context memory enables emergent, few-shot omni-bodied control: the same checkpoint zero-shots to 10 unseen real robots (G1, H1, Go2, Go2-W, Spot, AnyMal-C, …) and, when limbs are locked, wheels jammed, mass added or stilts attached, it quickly self-specializes, matching expert-tuned controllers after only 5 s of on-robot experience.