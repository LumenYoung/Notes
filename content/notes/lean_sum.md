---
aliases: [] 
date: 2026-06-29
tags: [lean, programming, learning]
title: "Uncomprehensive Lean Problem (and Solution)"
---

今天在 Lean 的学习过程中遇到了这个题设：

> Using the analogy between types and arithmetic, write a function that distributes products over sums. In other words, it should have type `α × (β ⊕ γ) → (α × β) ⊕ (α × γ)`.

说实话，这个题设我是完全没有看明白，哪怕看了两三遍之后也还是没明白。

从事后的角度来讲，这里尝试类比分配律（Distributive Law）的是 sum type 和 product type。这里的分配律是在类型运算上的分配律：

1. 加号代表着逻辑运算中的“或”（Sum 类型）
2. 乘号则代表着一个 pair（Product 类型）

虽然我并不知道它是怎么严格对应到加法运算上的，但我们最后获得的这个解如下：

```lean
def distribute (x : α × (β ⊕ γ)) : (α × β) ⊕ (α × γ) :=
  match x with
  | (a, Sum.inl b) => Sum.inl (a, b)
  | (a, Sum.inr c) => Sum.inr (a, c)

#eval distribute ("1", (Sum.inl 8 : Nat ⊕ Float))
```

哪怕是写出来了这个解，我其实也不是特别理解。其实最核心的点是，`Sum.inr` 和 `Sum.inl` 并不是运算符，而是 `Sum` type 的两个 constructor。

1. 在 match 的前半部分：
   它是一个 pattern matching 的符号，用来表示当 branch 提供进来的 pair 中，第二部分是右侧指示还是左侧指示，从而实现分段。

2. 在 return 的返回侧：
   这里的返回值同样让人感到奇怪。它的 denote 更多是因为在题设中，我们想要分解出来的其实是要么为 α × β（即 α 和 β 的 pair），或者是 α × γ 的 pair。
   但对于 Lean 来说，如果你不用 `Sum.inr` 或 `Sum.inl` 去 denote 它，它便不知道这里返回的究竟是哪一个 branch。

因此，`Sum.inr` 在 return 这一侧确实起到了告诉 Lean 这里具体是哪一个 branch 的作用。但更准确地说，它并不只是一个 type hint，而是在构造一个 sum type 的值。

更加严谨地讲，这里 `Sum.inr` 是一个 constructor。它将我们 `a` 和 `c` 的这个 pair 包装成了 constructor 的一个右侧分支，从而构造出一个类型为 `(α × β) ⊕ (α × γ)` 的值。

## 为什么 Sum type 对应加法？

可以考虑：如果 `β` 有 `m` 个可能的值，而 `γ` 有 `n` 个可能的值，那么 `β ⊕ γ` 的值要么来自于 `β`，要么来自于 `γ`，因此总共有 `m + n` 个可能的值。这就是为什么它可以类比于加法的原因。
