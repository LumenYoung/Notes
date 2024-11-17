---
id: OpenVLA, a good systematic exploration of Vision Language Action Models
aliases: []
tags:
  - openvla
  - vla
date: "2024-11-04"
modified: "2024-11-17"
title: OpenVLA, a good systematic exploration of Vision Language Action Models
---

Listened to the OpenVLA author's [talk](https://www.bilibili.com/video/BV13zpQemEdo/) on the way today. It was very informative, and I gained even more than from Cheng Chi's previous [[Talk from Cheng Chi|talk]].

## Design Choices

I hadn't delved deeply into OpenVLA's paper before, but this talk covered many design details I was interested in.

**ABOUT MODEL**: Based on Prismatic-7B VLM, the vision encoder is based on DinoV2 and SigLIP features. (I don't quite understand why these two backbones were chosen, but I might look into the original Prismatic-7B paper later.)

**ABOUT ACTIONS**

- Action encoding and decoding: OpenVLA is specifically designed for end-effector cartesian space. Therefore, it has seven outputs: three for displacement, three for rotation, and one for the end-effector. Each action is discretized into 256 outputs.
- Tokenizer modification: To enable the VLM to express these actions, they replaced the 256 least frequently used tokens in the llama tokenizer to encode these actions.
- Single step action and observation: As a result, OpenVLA's input and output are both single step actions. (It's impressive that such a large model can perform well with such unfavorable input and output conditions)

<!-- Why these two models? -->

## Conclusions

**ABOUT PERFORMANCE**:

- OpenVLA's performance is roughly equivalent to RT-2, with similar parameter counts. The performance of rt-1 and octo is also similar, with comparable parameter counts. My conclusion is that this represents the scaling law at work to some extent. Bigger is indeed better.

**ABOUT FINETUNING**:

- If resources are sufficient, using a combination of text-image datasets and robotic datasets for finetuning is the correct approach. Using only robotic datasets, OpenVLA may forget some infrequently occurring concepts in the dataset, resulting in weaker instruction following (compared to RT-2, which the author suspects has been co-finetuned).
- LORA finetuning works well, better than just finetuning the last layer of the LLM and the Vision backbone. Unfortunately, they did not show what the performance would be without any finetuning, so we can see how much difference there is between setups without finetuning.
- Vision backbone matters: If the vision backbone is not finetuned, the model's performance will be significantly worse (30% success rate, compared to LORA which can achieve <60%).

**ABOUT QUANTIZATION**: In summary, data from the bridge eval indicates that the capabilities of a 4-bit Quantized model are not reduced. This means you can run OpenVLA inference on a GPU with 8GB of VRAM without a significant drop in performance (though inference speed may still be slower compared to remote machines, so there will be some impact).

## Summary

[[Deeper Dive into π0|π0]] and OpenVLA are the two most recent advancements in VLA that I have come across. Although OpenVLA is certainly not as meticulously designed as π0, it provides good research results and insights. I admire the author's open-source spirit; BTW he is a first-year Ph.D. student at Stanford, and he is probably even younger than me, which is quite humbling.
