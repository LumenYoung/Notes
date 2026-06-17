---
aliases: []
date: 2025-12-25
published: 2025-12-25
tags:
  - math
title: "Revisit linear algebra: what make Eigenvector special?"
created: 2025-12-25
---
某个矩阵 $M$ 的特征向量 $v$ 是一组在经过矩阵 $M dot a$ 变换之后方向不变的向量，即 $M dot A = lambda dot A$ 成立。虽然这个定义很清晰，但是我并不理解满足这个条件为什么重要。

## 为什么 $M dot a = lambda dot a$ 重要？

知乎上面有一个非常好的[例子](https://www.zhihu.com/question/37615080/answer/1982559561807307059)来自于生态学中的 Lotka–Volterra 模型。他的目的是考虑在生态系统中，狐狸和兔子种群数量的变化。这里这个图非常好笑，我必须要发过来。

![[Meme linear dependency.png]]

所以其实核心是我们选择一个合适的基底。一个矩阵 $M$ 所代表的线性变换是复杂的，他可能带来非常多种变换：拉伸，旋转，压缩，剪切。这些变换在我们自己选择的空间里面 （Standard Basis）可能并不好计算。但如果我们将自己需要的向量投影到这个线性变换内禀的向量空间，那么一切都会变的简单。这个投影到的内禀的向量空间，就是 eigenvector 形成的 eigenbasis。