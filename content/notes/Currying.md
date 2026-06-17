---
tags: 
- functional-programmming
- concept
title: Currying (FP)
date: 2026-06-17
---

Let's try to explain currying. This is a term in [[Publish/notes/Functional Programing]] that is named after Haskell Curry, the mathematician who proposed it.

The core idea is that we assume every function takes exactly one input and produces one output. This naturally makes one wonder: how do we handle multiple inputs?

Multiple inputs are handled by chaining together several single-input functions—like f(g(x))— to model or translate a two-variable function. This makes the type annotations in functional programming a bit confusing upfront. For example, a type hint for a function that takes two natural numbers as input and outputs one natural number would be denoted as:

`Nat -> Nat -> Nat`

This is used instead of the more traditional:

`(Nat, Nat) -> Nat`