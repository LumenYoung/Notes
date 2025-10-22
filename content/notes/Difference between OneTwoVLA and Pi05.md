---
aliases: []
tags: []
date: "2025-10-22"
title: Difference between OneTwoVLA and Pi0.5
---

Both [[Publish/papers/OneTwoVLA - A Unified Vision-Language-Action Model with Adaptive Reasoning|OneTwoVLA]] and [[Publish/papers/π0.5 - a Vision-Language-Action Model with Open-World Generalization|Pi05]] decompose long-horizon tasks into shorter sub-tasks and condition low-level action generation on these sub-tasks.  

The similarities stop at the here: the two papers adopt opposite training philosophies and opposite inference schedules for achieving the decomposition.  

## Who produces the sub-task labels and when?

OneTwoVLA  
- Human demonstrators do not utter sub-task names while collecting robot data.  
- After the physical trace is recorded, engineers **manually segment** every demonstration into “reasoning intervals” (≈ the instants where a new sub-task should start) and write a 4-part textual rationale (scene, plan, history, next atomic step) for each segment .  
- At run-time the model itself decides whether the current situation calls for another bout of reasoning; if yes it outputs the textual rationale, otherwise it directly emits actions . This is done via whether the VLM produces `[BOR]` or `[BOA]` at the start of observation.

π0.5  
- During data collection a human speaks each next sub-task aloud (“pick up the plate”, “open the drawer”, …) while tele-operating the robot.  
- These spoken sentences are automatically transcribed and become ground-truth labels that the model is trained to reproduce.  
- At run-time the model is forced to produce a sub-task sentence every N steps (hierarchical inference) before it is allowed to generate the action chunk .

## Training objective for the high-level component

OneTwoVLA  
- Explain Scene and Action: given prefix (images + previous reasoning R) the model learns to output the entire paragraph that explains the scene and names the next step.  
- Loss is ordinary cross-entropy on those language tokens; no special “sub-task token” exists .

π0.5  
- A special `<subtask>` text token is inserted in the prompt; the model must autoregressively predict the single sentence that follows that token.  
- The same transformer is simultaneously trained on a mixture of four data sources (MM, ME, CE, HL, WD) and the HL head is trained only with the HL loss (cross-entropy on sub-task sentence) .

## Data-efficiency vs. annotation effort

OneTwoVLA  
- ≈ 1 100 manual reasoning annotations for ~1 000 demonstrations (≈ 1 annotation every 6–10 s).  
- No spoken language required; cheaper to collect but heavy human post-processing.

π0.5  
- Human speaks every sub-task while collecting; no post-hoc segmentation.  
- 400 h of mobile-manip data + 600 h of other-robot data; spoken labels come “for free” during tele-op .

## Failure-recovery & on-line adaptation

OneTwoVLA  
- Because the model can voluntarily enter “reasoning mode”, it can re-plan when it detects a failure (e.g. bottle slipped, strainer missed) by outputting a new rationale paragraph .

π0.5  
- Hierarchical schedule is fixed; it cannot decide to re-plan on its own.  
- Recovery is encoded implicitly in the low-level policy; no explicit re-planning channel .

## Resulting behaviour

Both papers reach > 80 % success on 5–15 min kitchen/bedroom tasks in completely unseen homes, but they get there via different inductive biases:  
- OneTwoVLA bets on **sparse, explicit, human-written reasoning** that the model itself can request at any moment.  
- π0.5 bets on **dense, spoken sub-task labels** plus heavy co-training to make the same transformer act as both high-level planner and low-level controller.
