---
aliases: [lean-io] 
date: 2026-09-20
title: "Lean Note: IO module and hello world"
tags: [lean, learning, learning-note]
---

Take example of this minimalist hello world in lean:

```lean
def main: IO Unit := IO.println "Hallo World"
```

Unit represents zero bits of information. Boolean represents 1 bits of information, unit represents zero, so when in Lean it has type `IO unit`, it means 
1. it is not a function with side effect, functions would have input and output noted by `<i> -> <o>`.
2. it is a description of the “effect to be carried out” 🤔. Effect I can understand as the whole side effect “the code inside this function” would poduce. So main function, with no input, use its signature to describe only this side effect.

The IO Unit is similar to the C style language `Void` statement, the main function returns nothing.

## Why this IO exists?

On the first glance unit makes sense, but IO is also the important part that constitutes the full picture. It is how lean is combining the pure function programming regime with the real requirements of side effects in a real programming language.

A pure, idealisitic functional programming snippet doesn’t contain any side effects, that includes also printing to the stdout/stderr or write to a file. However this is not possible, as many useful programs need to perform some actions.

So `IO` is the module or return type that helps to achieve this combination. The function that has the return type `IO alpha` would either return either an exception or `alpha` type. So this kind of function could have side effects, which is unlike pure FP signature like `Int -> Int -> Int`.