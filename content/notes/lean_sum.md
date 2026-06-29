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

哪怕是写出来了这个解，我其实也不是特别理解。最让我困惑的是：`Sum.inl` 和 `Sum.inr` 在代码里出现了两次，但它们看起来好像在做两件不同的事情。

1. 在 match 的前半部分（条件部分）：

   ```lean
   | (a, Sum.inl b) => ...
   | (a, Sum.inr c) => ...
   ```

   这里的 `Sum.inl` 和 `Sum.inr` 出现在 pattern 里。它们的作用是把传进来的 `β ⊕ γ` 拆开：如果这个值是左侧分支，就进入 `Sum.inl b` 这一支；如果是右侧分支，就进入 `Sum.inr c` 这一支。

2. 在 match 每个分支的后半部分（返回部分）：

   ```lean
   => Sum.inl (a, b)
   => Sum.inr (a, c)
   ```

   这里一开始让我非常困惑。我原本以为 `Sum.inr (a, c)` 是在对 `(a, c)` 这个 pair 做某种操作，所以就会觉得很奇怪：为什么输入里是右侧分支，输出就一定也要用右侧分支？这里的“左”和“右”到底是在算什么？

后来我才意识到，返回侧的 `Sum.inl` / `Sum.inr` 不是在对 pair 做计算，而是在说明返回值属于 sum type 的哪一个分支，类似于一个 type hint。因为返回类型是 `(α × β) ⊕ (α × γ)`，所以 Lean 必须知道我们返回的是左侧的 `(α × β)`，还是右侧的 `(α × γ)`。

再进一步说，它也不只是一个 type hint。更准确地讲，`Sum.inl` 和 `Sum.inr` 是 `Sum` type 的 constructor。也就是说，`Sum.inr (a, c)` 是把 `(a, c)` 包装进 sum type 的右侧分支里，从而构造出一个类型为 `(α × β) ⊕ (α × γ)` 的值。

## 为什么 Sum type 对应加法？

可以考虑：如果 `β` 有 `m` 个可能的值，而 `γ` 有 `n` 个可能的值，那么 `β ⊕ γ` 的值要么来自于 `β`，要么来自于 `γ`，因此总共有 `m + n` 个可能的值。这就是为什么它可以类比于加法的原因。
