---
aliases: [] 
date: 2025-08-11
tags: [typst]
title: "Tryout Typst"
---
Recently I've tried to use typst for the technical writing and I also tried to use [typst-preview plugin on neovim](https://github.com/chomosuke/typst-preview.nvim) to integrate it into my workflow. It surprises me even more that without any tweak, the infrastructure for using typst with neovim is as mature as the old, stable latex tool like vimtex.

It has very nice syntax that is more compact than the obscure Latex. Also a huge plus is the math syntax like `sum_(i in NN) 1 + i` for rendering $sum_(i in NN) 1 + i$. This would make my math related writing even more enjoyable. 

I must admit that this is such a good type-setting system that is clean, easy to write and have modern and great infrastructure for the whole pipeline.

## ## Difference between Inline and Block Math in Typst

This blog itself uses Typst for math rendering, thanks to [Typst support in the Quartz "Latex" plugin](https://quartz.jzhao.xyz/plugins/Latex). While most of the integration is straightforward, there's a key difference in how native Typst and Markdown handle math blocks.

In a standard `.typ` file, the only distinction between inline and block math is spacing. Inline math is tight against the dollar signs (`$<math>$`), whereas block math has spaces on the inside (`$ <math> $`).

However, when using Typst as a rendering engine within Markdown (as we are here), you must conform to Markdown's widely-accepted syntax:
*   **Inline math:** `$<math>$`
*   **Block math:** `$$<math>$$`

This is a small but important detail to remember.
