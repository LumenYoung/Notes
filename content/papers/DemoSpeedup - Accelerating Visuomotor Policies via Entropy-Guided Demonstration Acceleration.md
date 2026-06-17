---
citation_key: " DemAccVi25"
aliases:
  - " DemAccVi25"
  - "demospeedup"
date: 2025-10-17
published: 2025-10-17
zotero_key: Q9HATAGA
item_type: preprint
title: "DemoSpeedup: Accelerating Visuomotor Policies via Entropy-Guided Demonstration Acceleration"
abstract: "Imitation learning has shown great promise in robotic manipulation, but the policy's execution is often unsatisfactorily slow due to commonly tardy demonstrations collected by human operators. In this work, we present DemoSpeedup, a self-supervised method to accelerate visuomotor policy execution via entropy-guided demonstration acceleration. DemoSpeedup starts from training an arbitrary generative policy (e.g., ACT or Diffusion Policy) on normal-speed demonstrations, which serves as a per-frame action entropy estimator. The key insight is that frames with lower action entropy estimates call for more consistent policy behaviors, which often indicate the demands for higher-precision operations. In contrast, frames with higher entropy estimates correspond to more casual sections, and therefore can be more safely accelerated. Thus, we segment the original demonstrations according to the estimated entropy, and accelerate them by down-sampling at rates that increase with the entropy values. Trained with the speedup demonstrations, the resulting policies execute up to 3 times faster while maintaining the task completion performance. Interestingly, these policies could even achieve higher success rates than those trained with normal-speed demonstrations, due to the benefits of reduced decision-making horizons. Project Page: https://demospeedup.github.io/"
url: http://arxiv.org/abs/2506.05064
doi: 10.48550/arXiv.2506.05064
add_date: 2025-10-15T10:40:25Z
authors:
  - Lingxiao Guo
  - Zhengrong Xue
  - Zijing Xu
  - Huazhe Xu
tags:
  - literature
created: 2025-10-23
---

DemoSpeedup’s main idea is to let a proxy policy trained on ordinary demonstrations “vote” with its own uncertainty: frames on which the policy repeatedly samples tightly-clustered action chunks are tagged as low-entropy/high-precision (important), while frames that yield widely-scattered action samples are high-entropy/casual (expendable).

After HDBSCAN(hierarchical density-based clustering) splits each trajectory into these two sets, the casual parts are down-sampled at a higher ratio (rhigh≈3–4) than the precision parts (rlow≈2) yet every original observation is still kept (replicate-before-down-sample) and the chunk length is halved to keep the geometric distance per chunk unchanged.  

These design choices—entropy-based segmentation, aggressive but observation-preserving acceleration, shorter geometrically-consistent chunks, and a high-gripper controller—are critical for maintaining performance.  Policies retrained on the accelerated data execute 1.7–3× faster than the original ones while matching or raising success rates, eliminating the slowdown that human tele-operation normally imposes on visuomotor policies.
