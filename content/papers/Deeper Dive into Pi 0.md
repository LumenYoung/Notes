---
id: Deeper Dive into π0
aliases: []
tags:
  - blog
  - vla
  - eai
  - phyiscalintelligence
date: "2024-11-04"
modified: "2024-11-15"
title: Deeper Dive into π0
---

Following up on yesterday's blogpost from Physical Intelligence, I found their [technical report](https://www.314159.com/download/pi0.pdf) about the new π0 foundation model. It's very interesting to see their detailed design decisions. While it doesn't differ much from my speculation in [[π0 from phyiscal intelligence]], it's novel enough to warrant another blog post.

## Double expert system

The VLM is based on PaLiGemma. An additional action expert model with 300M parameters is attached to it. This model also has a similar architecture but with larger MLP width (width=1024, mlp_dim=4096 as stated in the document).

But the integration comes in a surprising way - there is no explicit transfer/passing of image or language embedding to the action expert.

## Communication between expert

Instead of providing image and language as conditioning features to the action expert like diffusion policy does, the bi-directional attention block is responsible for exchanging information between the VLM and the action model.

The attention blocks from both the VLM and the Action Expert can access information from each other (though future information is definitely not available).

<!-- My Question: _Then how many history tokens are available to the model then? Do they do the filtering?_ -->

I think the key advantages are:

1. **Simplicity in design**: It eliminates the complexity of manually deciding what information to pass to the action model.
2. **Bidirectional communication**: It enables two-way communication between the VLM and action model.
3. **Modular design**: The VLM remains independent of action specifications, making it easy to:
   - Update to more powerful backbones
   - Preserve the original VLM capabilities
   - Adapt to different action spaces
4. **Extensible to long-horizon planning**: Since the VLM preserves its language generation capability, it can easily integrate explicit step-by-step planning for longer-horizon tasks.
5. **Adaptable to different action spaces**: The pretraining approach can work with various action spaces and experts, as changing the action expert doesn't affect the VLM itself. (This is a brilliant design choice!)

## Flow matching

As we suspected yesterday, the flow-matching is indeed a faster version of diffusion policy, possibly because they want to achieve higher control rates for smoother control.

Interestingly, the `diffusion horizon` in their flow matching method is 50. This is likely because they increased the control frequency of the policy, so the longer horizon equals roughly the same time span as in the original diffusion policy (predicting and correcting for around 1-2 seconds of future time).

## Wrap it up

I think Physical Intelligence's π0 is really a good work on the VLA foundation model. They are learning from all the frontfields in the recent progresses: 1) they are predicting action sequence instead of action and 2) they are using generative model to handle the trajectory creation and 3) they are using larger pretraining dataset to enhance the generalization ability.

The most brilliant part is this integration between Action Expert and VLM. I think it will be the future standard approach to these kind of VLA for a period of time.
