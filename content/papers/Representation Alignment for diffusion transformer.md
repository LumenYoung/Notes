---
id: Representation Alignment for diffusion transformer
aliases: []
tags:
  - diffusion
  - representation-learning
arxiv: https://sihyun.me/REPA/
date: "2024-11-19"
published: "2024-11-19"
modified: "2024-11-19"
title: Representation Alignment for diffusion transformer
---

The authors propose a method called REPresentation Alignment (REPA), which is a simple regularization technique designed to improve the performance of diffusion transformer architectures. Here's a summary of the key aspects of REPA:

**CORE IDEA**

REPA aims to distill the pretrained self-supervised visual representation of a clean image into the diffusion transformer representation of a noisy input. It aligns patch-wise projections of the model's hidden states with pretrained self-supervised visual representations. More specifically, Let $f$ be a pretrained encoder, $x^*$ a clean image, and $y^* = f(x^*)$ the encoder output. REPA aligns $h_phi(h_t)$ with $y^*$, where $h_phi(h_t)$ is a projection of the diffusion transformer encoder output.

**OBJECTIVE FUNCTION**

REPA maximizes patch-wise similarities between the pretrained representation $y^*$ and the hidden state $h_t$:

$
L_("REPA")(theta, phi) := -E_(x^*, epsilon, t)[
  1/N sum_(n=1)^N "sim"(y^("*[n]"), h_phi(h_t^("[n]")))
]
$

Where $n$ is a patch index and $"sim"(dot.op, dot.op)$ is a predefined similarity function. This term is added to the original diffusion-based objectives, with a hyperparameter $lambda$ controlling the trade-off: $L := L_"velocity" + lambda L_"REPA"$

**FINDING**

- Partial Alignment: Interestingly, the authors found that aligning only the first few transformer blocks (e.g., 8 layers) is sufficient and can even enhance generation performance.

## My takeaway

Not that helpful on my side. The title was a click-bite to me but the subject of the paper is actually different from what I'm interested at. It looks like another use of dino's idea of self-supervised learning with image augmentation, but using them on image diffusion. Just that self-supervised patch-wise alignment seems to be a good self-supervised learning paradigm.

For me the more interesting topic is the connection between diffusion's internal representation and the used visual representation for conditioning, so they are completely different. 