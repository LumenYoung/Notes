---
citation_key: " VGGVisGe25"
aliases: [' VGGVisGe25']
zotero_key: "Q4N96T9W"
date: "2025-07-14"
item_type: "preprint"
title: "VGGT: Visual Geometry Grounded Transformer"
abstract: "We present VGGT, a feed-forward neural network that directly infers all key 3D attributes of a scene, including camera parameters, point maps, depth maps, and 3D point tracks, from one, a few, or hundreds of its views. This approach is a step forward in 3D computer vision, where models have typically been constrained to and specialized for single tasks. It is also simple and efficient, reconstructing images in under one second, and still outperforming alternatives that require post-processing with visual geometry optimization techniques. The network achieves state-of-the-art results in multiple 3D tasks, including camera parameter estimation, multi-view depth estimation, dense point cloud reconstruction, and 3D point tracking. We also show that using pretrained VGGT as a feature backbone significantly enhances downstream tasks, such as non-rigid point tracking and feed-forward novel view synthesis. Code and models are publicly available at https://github.com/facebookresearch/vggt."
url: "http://arxiv.org/abs/2503.11651"
doi: "10.48550/arXiv.2503.11651"
add_date: "2025-07-09T11:34:35Z"
authors: ['Jianyuan Wang', 'Minghao Chen', 'Nikita Karaev', 'Andrea Vedaldi', 'Christian Rupprecht', 'David Novotny']
tags: ['Computer Science - Computer Vision and Pattern Recognition', 'literature']
---

# VGGT: Visual Geometry Grounded Transformer

Trained on 2d image - 3d info pair. Tries to compute the 3d information: camera parameter, point cloud and depth. 

My interest is it is also a multiple loss training scheme. Seems that the secret of the success is carefully balance the loss.

### The VGGT Encoder
The component preserved as the "VGGT encoder" or "feature backbone" for downstream tasks is the **DINOv2 tokenizer combined with the main Alternating-Attention (AA) transformer**. This core part of the model is responsible for extracting powerful, general-purpose 3D features from input images, which can then be reused or fine-tuned for other applications like novel view synthesis and dynamic point tracking.

### Model Components and Training Process
The model is trained end-to-end, meaning all its components are trained simultaneously. The text does not mention any components being frozen during this process.

1.  **Image Tokenization**: Input images are first converted into a set of tokens using a pretrained **DINOv2** model. This method was chosen over a standard convolutional layer as it provided more stable training and better performance.
2.  **Feature Backbone (Encoder)**: The core of the model is a large transformer consisting of 24 layers. It uses a custom **Alternating-Attention (AA)** mechanism, which alternates between:
    *   **Frame-wise self-attention**: Attends to tokens within each single frame.
    *   **Global self-attention**: Attends to tokens across all frames jointly.
3.  **Prediction Heads**: The output tokens from the transformer backbone are fed into several specialized heads to produce the final outputs:
    *   **Camera Head**: Predicts camera intrinsics and extrinsics.
    *   **Dense Prediction Head (DPT)**: Predicts dense outputs like depth maps and point maps. It also generates dense features used for tracking.
    *   **Tracking Head**: Implemented using the CoTracker2 architecture, it takes the dense features to predict point tracks across images.

The entire model is trained for 160,000 iterations on 64 A100 GPUs.

### Loss Function
VGGT is trained with a multi-task loss function that combines losses from four different prediction tasks:

$ \mathcal{L} = \mathcal{L}_{\text{camera}} + \mathcal{L}_{\text{depth}} + \mathcal{L}_{\text{pmap}} + \lambda \mathcal{L}_{\text{track}} $

*   **Camera Loss ($ \mathcal{L}_{\text{camera}} $)**: A Huber loss between the predicted and ground-truth camera parameters.
*   **Depth Loss ($ \mathcal{L}_{\text{depth}} $)**: An aleatoric-uncertainty loss that weighs the difference between predicted and ground-truth depths by a predicted uncertainty map. It also includes a gradient-based term.
*   **Point Map Loss ($ \mathcal{L}_{\text{pmap}} $)**: Defined analogously to the depth loss, but for 3D point maps.
*   **Tracking Loss ($ \mathcal{L}_{\text{track}} $)**: Measures the distance between predicted and ground-truth 2D point correspondences, supplemented by a visibility loss. This component is down-weighted by a factor of $ \lambda = 0.05 $.

### Training Datasets
VGGT is trained on a large and diverse collection of publicly available datasets featuring 3D annotations. This combination spans various domains, including indoor and outdoor environments, as well as synthetic and real-world scenarios. The datasets include:
*   Co3Dv2
*   BlendMVS
*   MegaDepth
*   Kubric
*   ScanNet
*   Habitat
*   Replica
*   PointOdyssey
*   Virtual KITTI
*   And several others.


