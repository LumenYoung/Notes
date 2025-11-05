---
aliases: ["GEN0"] 
date: 2025-11-05
tags: [generalist-ai]
title: "New findings from generalist ai on VLA scaling law"
---
GEN-0 is an embodied foundation-model family trained directly on 270 000+ h of real-world manipulation trajectories (growing at 10 000 h/week) with a new “Harmonic-Reasoning” objective that interleaves continuous-time sensing and acting tokens without any System-1/2 split.  

The key findings I get from their post:  
- A sharp “phase transition” near 7 B parameters below which models ossify under data overload while larger ones keep improving;  
- Clear power-law scaling of downstream post-training error with both model size and pre-training dataset size;  
- Data quality/diversity outweighs sheer volume, and different data mixtures create qualitatively different dexterity vs. generalization behaviors. 

The authors view establishing scaling laws for physical-interaction data—and pushing beyond the 7 B threshold toward 10 B+—as the most important direction.  

In their current regime the optimal size is therefore ≥7 B parameters, and to reach the reported performance this requires on the order of 1 B action trajectories (≈270 k h) with more data continuing to buy predictable gains.

Also they mentioned that model should learn “Harmonic Reasoning”: a single transformer ingests asynchronous continuous-time sensing/acting tokens so thinking and acting co-evolve without explicit System-1/System-2 stages or extra inference guidance. I personally think this is technically too risky and challenging, but perhaps their team has already gain positive result on this direction.

Realistically speaking I concur to start with a unified model that ingest all the modalities, but I would put this asynchronous outputting at lower priority. I think reasoning can just implicitly happen inside the model without the need to complicate the whole stack with the task of async execution.