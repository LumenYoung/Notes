---
citation_key: " DisRobIm25"
aliases: [' DisRobIm25', "DisDP"]
date: "2025-08-07"
zotero_key: "EL4RYWUB"
item_type: "conferencePaper"
title: "DisDP: Robust Imitation Learning via Disentangled Diffusion Policies"
abstract: "This work introduces Disentangled Diffusion Policy (DisDP), an Imitation learning method that enhances robustness by integrating multi-view disentanglement into diffusion-based policies. Robots operating in real-world environments rely on multiple sensory inputs to effectively interact with their surroundings. However, sensors are susceptible to noise, calibration errors, failures, and environmental perturbations. Existing Imitation Learning methods struggle to generalize under such conditions, as they typically assume consistent, noise-free inputs. Disentangled Diffusion Policy (DisDP) addresses this limitation by structuring sensory inputs into shared and private representations, preserving task-relevant global features while retaining distinct details from individual sensors. This structured representation improves resilience against sensor dropouts and perturbations. Evaluations on The RoboColosseum and Libero benchmarks demonstrate that DisDP achieves performance on par with baseline methods while exhibiting greater robustness to sensor variations."
url: "https://openreview.net/forum?id=0GSL9VRBib#discussion"
add_date: "2025-08-07T13:05:48Z"
authors: ['Pankhuri Vanjani', 'Paul Mattes', 'Xiaogang Jia', 'Vedant Dave', 'Rudolf Lioutikov']
---

# DisDP: Robust Imitation Learning via Disentangled Diffusion Policies

Learn shared and private feature via contrastive loss. Where shared feature are learnt via maximizing the similarity between different cameras of the same frame, and the private feature are maximizing the feature from the same camera in different time.

Additionally use a orthogonality loss to make sure features learnt are independent from each other.

This is a study mainly on learning multiple view camera feature associations. There is also _an implicit assumption that the view field of all cameras have overlaps_. So when for example in the case of two wrist cameras, sometimes they don’t have shared view field and there is no garuantee that there is shared features.

> 🤔 Is there a time window for the private feature comparison? I don’t think learning private feature in a very long window represents anything

> 🤔 What exactly has been captured from the shared feature? Do we have explaination on what has been learnt from each kind of feature?

> 🤔 Contrastive Learning like CLIP utilizes both associate similar feature as well as punish non similar feature. Why would simply maximizing similarity works as well?

### My Projection: What DisDP actually learns?

The term shared feature and private feature is named from the perspective of **different cameras at the sametime**, but put into the spatial-temporal perspective, the learnt feature are in fact features maximizing (possiblely short-term?) temporal consistency and local spatial consistency. Under the assumption of shared view field the auther propose to self-supervisely learn to distinguish them via contrasting. So both of them are infact actually local consistencies.

> 🤔 Why learning to disentangle local features/cluster similar local features can improve robustness? What exact error has been eliminated? Is it only about acquiring more sparse feature?

This is indeed a clever trick but my impression on this is **a simplified version of world model learning**. I do think this could help further distill the knowledge acquired by the multi-camera VLA. 