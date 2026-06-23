---
aliases: [] 
date: 2026-06-23
tags: [functional-programmming]
title: Polymorphic in Functional Programming
---
```lean
def posOrNegThree (s : Sign) :
    match s with | Sign.pos => Nat | Sign.neg => Int :=
  match s with
  | Sign.pos => (3 : Nat)
  | Sign.neg => (-3 : Int)
```

Lean 的语法虽然第一眼看着非常复杂，甚至我第一眼都没有看懂，但是拆解起来觉得非常有意思。

首先这是一个 Polymorphic 的 example，而拆解最重要的一点是 `:=` 这些符号。这点代表了后方是函数本身的定义，而前方则是一个带有 match 的 declaration。

具体来说：
1. 当 s 的 Sign 为 positive 的时候，这个函数返回的是 Nat（自然数）。
2. 如果是 negative 的时候，则是 Int（整数）。

在理解这一点之后，就可以大致搞清楚这个函数的逻辑。这两个 match 其实各自首先以“等号与大于号”（=>）的形式呈现，类似于每个 branch 报出来的返回值。

区别在于前者是条件的返回类型描述，因为这个 function 会根据传入的数值来决定返回类型，这需要在 declaration 里体现；而后者则是进行具体的逻辑实现。

所以这里的实参设置其实是相对冗余的。

究其原因是，至少到现在为止，我看到的 Lean 只能以 inductive type 的不同 branch 来通过 match 的形式决定 branch。我还没有看到过更复杂、更通用的逻辑来实现这类模式。可能后续会到。