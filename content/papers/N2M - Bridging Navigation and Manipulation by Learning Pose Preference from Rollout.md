---
citation_key: " N2MBriNa25"
aliases:
  - " N2MBriNa25"
date: 2025-10-23
zotero_key: NH58Y3IT
item_type: preprint
title: "N2M: Bridging Navigation and Manipulation by Learning Pose Preference from Rollout"
abstract: "In mobile manipulation, the manipulation policy has strong preferences for initial poses where it is executed. However, the navigation module focuses solely on reaching the task area, without considering which initial pose is preferable for downstream manipulation. To address this misalignment, we introduce N2M, a transition module that guides the robot to a preferable initial pose after reaching the task area, thereby substantially improving task success rates. N2M features five key advantages: (1) reliance solely on ego-centric observation without requiring global or historical information; (2) real-time adaptation to environmental changes; (3) reliable prediction with high viewpoint robustness; (4) broad applicability across diverse tasks, manipulation policies, and robot hardware; and (5) remarkable data efficiency and generalizability. We demonstrate the effectiveness of N2M through extensive simulation and real-world experiments. In the PnPCounterToCab task, N2M improves the averaged success rate from 3% with the reachability-based baseline to 54%. Furthermore, in the Toybox Handover task, N2M provides reliable predictions even in unseen environments with only 15 data samples, showing remarkable data efficiency and generalizability."
url: http://arxiv.org/abs/2509.18671
doi: 10.48550/arXiv.2509.18671
add_date: 2025-09-27T00:47:36Z
authors:
  - Kaixin Chai
  - Hyunjun Lee
  - Joseph J. Lim
tags:
  - Computer Science - Robotics
  - literature
created: 2025-10-23
---
The N2M paper proposes an additional **transition module** that relies on the egocentric RGBD camera view to determine the desired pose.

The egocentric RGBD camera view reconstructs a task area point cloud and its own position inside the area. Then the N2M network, a GMM learner, learn the desired pose from the pair of local scene reconstruction $S_i$ and desired pose $p_(pi,i)$, which is $(S_i, p_(pi,i))$. Given a local scene, the N2M randomly sample a pose from the scene and determine whether it is a desired pose via rollout result.

I subscribe to the view that **the critical bottleneck now for manipulation + navigation VLA is the end pose of navigation**. This module can serve as an intermediate layer that helps we gain better long horizen performance. In the meantime such module can also help gather more rollout data that can be use to further refine the performance of the VLA model.

Overall I think this is a good extension to the current VLA models that helps 1) to ensure better long horizon task performance 2) and to gather offline RL data for further policy improvement during rollout. It has minimal requirements on hardware and software, also it is data efficient that can be useful in many fixed posed, industrial use cases. However the training of N2M module still requires additional label on whether the pose is desired now, which is an additional burden.

MY QUESTIONS

Q: *如果在一个 scene 里面很多的 pose 都可以成功的话，那这个模型会学到什么呢？* 这种情况学到的东西确实是 multimodal 的，至少是 non-gaussian 的。

Q: *where is the performance degradation of n2m from?* 比起 oracle baseline ，n2m 还是有一定的 success rate degradation，这让我觉得他肯定包含一部分的 out of distribution case。这可能是来自于数据集的数量，导致一部分 OOD 的 initial pose 进入了 success label 的区域，所以我们需要知道论文 report 的 success rate 是怎么得到的。

![[Publish/att/N2M experiment illu.png]]

This illustrated experiment is very interesting for me. One of the possible enhancement is to let N2M determine which cell is desired now with additional conditioning signals. This is very important for some detailed retrieval case.

## How transition happen between N2M and the policy

> Question: *I still don't understand yet how the policy to N2M module transition take place.* Do we need additional process to monitor on the N2M side whether the robot has enter the task area?

The transition involving the N2M module is a sequential process designed to bridge the gap between navigation and manipulation. Step-by-step breakdown:

1.  **Navigation to the Task Area:** First, a general navigation module guides the robot into the vicinity of the task. The N2M module's process begins once the robot reaches this "navigation end pose" . You don't need an additional process to monitor this; the completion of the initial navigation step triggers the N2M module.
2.  **N2M Pose Adjustment:** Once the initial navigation is complete, the N2M module takes over to find a better starting position for the manipulation task.
    *   It captures a 3D scan (an RGB point cloud) of the environment from the robot's current perspective .
    *   The N2M network uses this scan to predict a distribution of initial poses that are preferable for the manipulation policy .
3.  **Transition to Manipulation:** After N2M predicts the optimal starting spots, the system transitions to the final manipulation policy.
    *   A single, collision-free pose is sampled from the distribution predicted by N2M .
    *   The robot then navigates from its current position to this new, more precise pose .
    *   Once the robot arrives at this ideal starting pose, the pre-trained manipulation policy is executed to perform the task .

In essence, N2M acts as an intelligent intermediate step. It takes the robot from a general location in the task area and moves it to a specific, optimized starting point from which the manipulation policy is most likely to succeed .