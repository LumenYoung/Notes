---
date: 2025-10-21
tags:
  - thoughts
  - regression
---

Regression is formulated as $P(y | x; theta)$, where $theta$ is the parameter estimated from the training data $(X, Y)$.

Autoregression is formulated very similarly: $P(x_t | x_0 ... x_(t-1))$. The time $t$ replaces $x$ to *indicate which value to predict*, Also a strict contagious order of previous data is enforced that provides as context for the prediction.

Hence we can view autoregression as a special case of more general regression task.