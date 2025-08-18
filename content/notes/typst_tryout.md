---
aliases: [] 
date: 2025-08-11
tags: [typst]
title: "Tryout Typst"
---
Recently I've tried to use typst for the technical writing and I also tried to use [typst-preview plugin on neovim](https://github.com/chomosuke/typst-preview.nvim) to integrate it into my workflow. It surprises me even more that without any tweak, the infrastructure for using typst with neovim is as mature as the old, stable latex tool like vimtex.

It has very nice syntax that is more compact than the obscure Latex. Also a huge plus is the math syntax like `sum_(i in NN) 1 + i` for rendering $sum_(i in NN) 1 + i$. This would make my math related writing even more enjoyable. 

I must admit that this is such a good type-setting system that is clean, easy to write and have modern and great infrastructure for the whole pipeline.

## Difference between Inline and Block Math in Typst

As you can see, we are already using typst in this blog, since there is [already typst math support on Quartz](https://quartz.jzhao.xyz/plugins/Latex). Most of this support is straight forward except the syntax difference of inline and block math.

There is no difference betwen inline math and block math except the space to `$ $`. Inline is `$<math>$` and block is `$ <math> $`. However if we use typst as the latex engine in markdown, we are conforming to the latex format in markdown to use inline as `$<math>$` and `$$ <math> $$` for math block.
