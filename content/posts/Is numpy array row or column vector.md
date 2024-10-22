---
aliases: []
tags: [python, numpy, learning]
title: Is numpy array row or column vector
date: 2024-02-05 15:42:22
category: English
updated: 2024-02-11 09:22:30
slug: ""
description: ""
noteId_x: 39
create_time: 2/5/2024, 3:42:22 PM
update_time: 2/11/2024, 12:45:17 AM
publish_time: 2/5/2024, 8:25:18 PM
---

**tldr**: it is row vector, just automatically expanded/converted when doing matrix multiplication with the proper dimension.

I was constantly bothered by the question of “is numpy array row or column vector”? I know for a single dimensional vector, it is neither row nor column, as already pointed out by [others](https://stackoverflow.com/a/53744890). But without a proper understanding of this question, I’m not confident enough everytime I try to imageine what would happen when I’m implementing my own algebra, and this unconfidence is really annoying cause I will always be anxious that I might be writing something wrong.

I view this question as, when a 2-D numpy array(which is a matrix) and a 1-D numpy array multiplies, **in which dimension of that 2-D numpy array does the matrix multiplication happen**. This is not trivial since both side can work in theory but they yield completely different results. So today I’m using simple python interactive shell to solve this question in one fell swoop.

## Simple experiment

Define a matrix `m`:

```
>>> m = np.array([[1,2,3],[2,3,4],[3,4,5]])
>>> m
array([[1, 2, 3],
       [2, 3, 4],
       [3, 4, 5]])
```

Define a vector `v`:

```
>>> v = np.array([1,2,3])
>>> v
array([1, 2, 3])
```

Doing element-wise multiplication:

```
>>> m * v
array([[ 1,  4,  9],
       [ 2,  6, 12],
       [ 3,  8, 15]])
```

This is quiet intuitive to understand: all the smallest element (a 3 dim array) in both components are multiplied element-wise.

Doing a matrix multiplication directly:

```
>>> m @ v
array([14, 20, 26])
>>> v @ m
array([14, 20, 26])
```

It is interesting that in both direction they have the same result. Because commutative rule doesn’t apply to matrix multiplication, not only shouldn’t `m @ v` and `v @ m` have the same output, but also at least one side should not be valid operation. So the result suggests that **an implicit conversion happened in the numpy operation @**.

This kind of implicit conversion is both smart and dumb — smart in the sense that it makes the interpreter inference the shape so that **they can guess what you want to write**. But that also means if you made a logic mistake in your code and happens to be inferenced properly, the interpreter will perceed without throwing error and don’t give you proper warning even if you were doing the wrong computation. It also the culprit hinders me to be confident on what is really happening underneath.

### Eliminate the implicit conversion

So in order to eliminate space for such ambiguity, we just manually boardcast the vector to the same 2-d array and see what happens. As expected, this time we can see how they are treated differently:

```
>>> v[None,:]
array([[1, 2, 3]])

# left multiply this vector
>>> v[None,:] @ m
array([[14, 20, 26]])

# right multiply this vector
>>> m @ v[None,:]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 1 is different from 3)
```

The other side works the same as well:

```
>>> v[:,None]
array([[1],
       [2],
       [3]])
>>> m @ v[:,None]
array([[14],
       [20],
       [26]])
>>> v[:, None] @ m
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 3 is different from 1)
```

## Conclusion

So finally the answer is clear, a single vector is at its core treated as a row vector in the matrix. No need to worry, the numpy world now is perfectly ordered in my mind ;). I would wish such implicit conversion were never implemented in the first place, then I might learn this fact way earlier with just a few runtime errors.
