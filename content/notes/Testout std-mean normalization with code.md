---
id: Testout std-mean normalization with code
aliases: []
tags:
  - math
  - tryout
  - normalization
  - 中文
---

一直以来我对于 std-mean normalization 带有两种不一样的直觉：一方面我在课堂上知道如果 input 只是单纯的 scale 上的不同，那么两者在 mean-std normalization 之后的值应该是一样的；另一方面在图像化的去想象这个过程中的时候，我总是会在心里面打鼓：“这两者真的会是一样的么？不应该是 min-max 的 normalization 才是一样的么？”。

这个问题今天又一次在我写代码的时候出现了，我在考虑我的 0 - 1 化的 image 和 255 的 image 图像在同样的 normalization 过后是否是一致的。这次我们用以下代码来解决这个问题：

## 代码

```python
import torch

def mean_std_normalize(tensor):
mean = tensor.mean()
std = tensor.std()
return (tensor - mean) / std

# Step 1: Generate a random PyTorch tensor

original_tensor = torch.randn(100)

# Step 2: Scale the tensor by a factor of 2

scaled_tensor = original_tensor \* 2

# Step 3: Normalize both tensors using mean-std normalization

normalized_original_tensor = mean_std_normalize(original_tensor)
normalized_scaled_tensor = mean_std_normalize(scaled_tensor)

# Step 4: Compare the normalized tensors

are_same = torch.allclose(normalized_original_tensor, normalized_scaled_tensor)

print(f"Original tensor: {original_tensor}")
print(f"Scaled tensor: {scaled_tensor}")
print(f"Normalized original tensor: {normalized_original_tensor}")
print(f"Normalized scaled tensor: {normalized_scaled_tensor}")
print(f"Are the normalized tensors the same? {are_same}")
```

## 结果

```bash
$ python experiment.py
Are the normalized tensors the same? True
```

