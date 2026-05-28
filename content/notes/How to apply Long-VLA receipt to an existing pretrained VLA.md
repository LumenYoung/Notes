---
date: 2025-10-15
title: "How to apply Long-VLA training receipt to a pretrained VLA?"
tags:
 - vla
 - note
---

Below is the shortest “check-list” that theoritically turns a off-the-shelf VLA into a Long-VLA style long-horizon policy.  
Every step is taken from the paper.

1. **Split every demonstration into two contiguous parts**  
   - moving phase: robot travels to the target (≈10–15 frames before the object state changes)
   - interaction phase: robot acts on the object (grasp, push, press …)
   Do it automatically with a simple “object-moved?” detector or by hand for a few hundred demos.

2. **Add a 1-D phase flag to the action vector**
   - moving → set sp = –1  
   - interaction → set sp = +1  
   The flag is simply concatenated to the usual end-effector pose + gripper action, so the diffusion head now outputs 8-D instead of 7-D.

3. **Keep the original VLA weights but rebuild the attention mask**
   - moving step: allow only third-person / static-camera tokens to attend to each other (mask gripper tokens)
   - interaction step: swap mask – only gripper-camera tokens are active
   The mask is applied inside the self-attention softmax; no pixel is dropped, so the tensor shapes stay identical and the pre-trained encoders stay valid.

4. **Train with the same diffusion loss you already have**, just feed the longer action vector.  
   Optional auxiliary: add an InfoNCE goal-alignment loss (weight 0.1) if you also have play data with language goals.

5. **Use your unlabeled robot data “as is”**
   Treat any future frame as a “visual goal” and encode it with the frozen CLIP image encoder; the text encoder is ignored for these clips. This lets you mix labeled and unlabeled trajectories in the same batch.

6. **Fine-tune only the low-rank adapters** (LoRA) or just the action head if you want to keep the base VLA frozen. Training 200–400 trajectories for 800 epochs already gives the full lift reported in the paper, so data scale stays modest.

That is the entire recipe: decompose → tag actions → insert attention mask → keep training. No re-design of the backbone is required, so in theory any existing VLA implementation can be upgraded in an afternoon.