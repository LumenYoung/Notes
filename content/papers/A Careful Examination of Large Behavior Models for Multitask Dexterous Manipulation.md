---
citation_key: " CarExaLa25"
aliases: [' CarExaLa25']
zotero_key: "LC92WKIH"
item_type: "preprint"
date: "2025-07-13"
title: "A Careful Examination of Large Behavior Models for Multitask Dexterous Manipulation"
abstract: "Robot manipulation has seen tremendous progress in recent years, with imitation learning policies enabling successful performance of dexterous and hard-to-model tasks. Concurrently, scaling data and model size has led to the development of capable language and vision foundation models, motivating large-scale efforts to create general-purpose robot foundation models. While these models have garnered significant enthusiasm and investment, meaningful evaluation of real-world performance remains a challenge, limiting both the pace of development and inhibiting a nuanced understanding of current capabilities. In this paper, we rigorously evaluate multitask robot manipulation policies, referred to as Large Behavior Models (LBMs), by extending the Diffusion Policy paradigm across a corpus of simulated and real-world robot data. We propose and validate an evaluation pipeline to rigorously analyze the capabilities of these models with statistical confidence. We compare against single-task baselines through blind, randomized trials in a controlled setting, using both simulation and real-world experiments. We find that multi-task pretraining makes the policies more successful and robust, and enables teaching complex new tasks more quickly, using a fraction of the data when compared to single-task baselines. Moreover, performance predictably increases as pretraining scale and diversity grows. Project page: https://toyotaresearchinstitute.github.io/lbm1/"
url: "http://arxiv.org/abs/2507.05331"
doi: "10.48550/arXiv.2507.05331"
add_date: "2025-07-10T06:31:38Z"
authors: ['TRI LBM Team', 'Jose Barreiros', 'Andrew Beaulieu', 'Aditya Bhat', 'Rick Cory', 'Eric Cousineau', 'Hongkai Dai', 'Ching-Hsin Fang', 'Kunimatsu Hashimoto', 'Muhammad Zubair Irshad', 'Masha Itkina', 'Naveen Kuppuswamy', 'Kuan-Hui Lee', 'Katherine Liu', 'Dale McConachie', 'Ian McMahon', 'Haruki Nishimura', 'Calder Phillips-Grafflin', 'Charles Richter', 'Paarth Shah', 'Krishnan Srinivasan', 'Blake Wulfe', 'Chen Xu', 'Mengchao Zhang', 'Alex Alspach', 'Maya Angeles', 'Kushal Arora', 'Vitor Campagnolo Guizilini', 'Alejandro Castro', 'Dian Chen', 'Ting-Sheng Chu', 'Sam Creasey', 'Sean Curtis', 'Richard Denitto', 'Emma Dixon', 'Eric Dusel', 'Matthew Ferreira', 'Aimee Goncalves', 'Grant Gould', 'Damrong Guoy', 'Swati Gupta', 'Xuchen Han', 'Kyle Hatch', 'Brendan Hathaway', 'Allison Henry', 'Hillel Hochsztein', 'Phoebe Horgan', 'Shun Iwase', 'Donovon Jackson', 'Siddharth Karamcheti', 'Sedrick Keh', 'Joseph Masterjohn', 'Jean Mercat', 'Patrick Miller', 'Paul Mitiguy', 'Tony Nguyen', 'Jeremy Nimmer', 'Yuki Noguchi', 'Reko Ong', 'Aykut Onol', 'Owen Pfannenstiehl', 'Richard Poyner', 'Leticia Priebe Mendes Rocha', 'Gordon Richardson', 'Christopher Rodriguez', 'Derick Seale', 'Michael Sherman', 'Mariah Smith-Jones', 'David Tago', 'Pavel Tokmakov', 'Matthew Tran', 'Basile Van Hoorick', 'Igor Vasiljevic', 'Sergey Zakharov', 'Mark Zolotas', 'Rares Ambrus', 'Kerri Fetzer-Borelli', 'Benjamin Burchfiel', 'Hadas Kress-Gazit', 'Siyuan Feng', 'Stacie Ford', 'Russ Tedrake']
tags: ['Computer Science - Robotics', 'literature']
---

## A Careful Examination of Large Behavior Models for Multitask Dexterous Manipulation

由 TRI Large Behavior Model 团队带来的，系统的对比多任务的 VLA (They use a more general term called Large Behavior Model) 和单任务的 Action Model 之间的性能差异。

Takeaway Points from their Website:

*   Deliver consistent performance improvements relative to from-scratch policies;
*   Enable new tasks to be learned with **3-5× less data** in challenging settings requiring robustness to a variety of environmental factors;
*   Improve steadily as pretraining data increases. 

论文的结论是在 1700 个小时的内部数据集（500 个不同 task）上获得的。

除了 main takeaway 之外，他们比较有意思的实验就是尝试 **Filtering Low-Motion Data**  - An experiment was run to filter out the initial "low-motion" frames from the training data.

  *   **Positive Effect:** Policies trained on this filtered data began executing tasks much faster.
  *   **Negative Effect:** These policies also made more mistakes, frequently committing to the *wrong*kk task. The hypothesis is that these initial static frames are important for the model to use the language instruction to distinguish between visually similar starting scenes.

 他们尝试这种操作的原因是因为观察到 LBM 在任务开始时往往会有比较明显的「迟疑」。

> We observe that the *filtered-pretrained* LBM very quickly commits to a task, whereas the *unfilteredpretrained* LBM would often take a long time to initiate any motion.
> 
> We observed that *filtered-pretrained and finetuned* LBMs quickly initiate motions, whereas the *unfiltered-pretrained and finetuned* LBMs can take excessively long to start any motion.
