---
aliases: ["General Value Leanring","In-Context Value Leanring"] 
date: 2025-07-04
published: 2025-07-04
tags: ["vision-language","model-training","temporal-understanding"]
---
# Vision Language Models are In-Context Value Learners
Value prediction on shuffled frames from the demonstration. These values could be the progress of the demonstration. If the end of the video is the success, then it can also be interpreted as the success progress of the task.

This stems from the fact that the VLM now fail to associate the temporal information from different image inputs. When presented with shuffled frames from the video, a VLM cannot reliablely determine the order of the frames rather just produce random numbers.

So this work creates such **prompting scheme** (they name it as General Value Learning, GVL for short) that request the VLM to produce correct progress value for each of the frames they present in the context. This force the VLM to associate information from different frames. 

> 🤔 ==How can they make VLM focus on the relevant part of the context==? Any ablation on this?

==They yield better performance on the downstream robotic tasks==, prove that this approach can help VLM to learn meaningful temporal information that can be generalized to the robotics field.

### _Why this is important?_  
Current VLAs are one frame predictor most of the time, but it will extend to multiple frames very soon. A pretraining phase in which the model learns such temporal information is crucial for the VLA to grab correct context from the image features.

Another important usecase is the failure detection and the reward predictor. This visual based method can easily pretrain a model that helps to create dense reward for the RL training scheme.