---
citation_key: " TraAttLa19"
aliases: [' TraAttLa19']
date: "2025-11-03"
zotero_key: "NIIXTQWV"
item_type: "preprint"
title: "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context"
abstract: "Transformers have a potential of learning longer-term dependency, but are limited by a fixed-length context in the setting of language modeling. We propose a novel neural architecture Transformer-XL that enables learning dependency beyond a fixed length without disrupting temporal coherence. It consists of a segment-level recurrence mechanism and a novel positional encoding scheme. Our method not only enables capturing longer-term dependency, but also resolves the context fragmentation problem. As a result, Transformer-XL learns dependency that is 80% longer than RNNs and 450% longer than vanilla Transformers, achieves better performance on both short and long sequences, and is up to 1,800+ times faster than vanilla Transformers during evaluation. Notably, we improve the state-of-the-art results of bpc/perplexity to 0.99 on enwiki8, 1.08 on text8, 18.3 on WikiText-103, 21.8 on One Billion Word, and 54.5 on Penn Treebank (without finetuning). When trained only on WikiText-103, Transformer-XL manages to generate reasonably coherent, novel text articles with thousands of tokens. Our code, pretrained models, and hyperparameters are available in both Tensorflow and PyTorch."
url: "http://arxiv.org/abs/1901.02860"
doi: "10.48550/arXiv.1901.02860"
add_date: "2025-11-02T18:05:21Z"
authors: ['Zihang Dai', 'Zhilin Yang', 'Yiming Yang', 'Jaime Carbonell', 'Quoc V. Le', 'Ruslan Salakhutdinov']
tags: ['Computer Science - Machine Learning', 'Statistics - Machine Learning', 'Computer Science - Computation and Language', 'literature']
---

This is an 2019 paper on extending the context length of Transformers. 6 year old paper in the filed of deep learning is ancient. However I think it is still quiet impressive as someone from SkildAI is building some cool stuff ( [[Publish/papers/LocoFormer - Generalist Locomotion via Long-context Adaptation]] ) on top of the TransformerXL proposed from this paper. Therefore I want to understand more about this.

## Most Important Contribution: how to extend the Context Length on Segment Level

Ideally your LLM would attend every token from the start of your article to the current token. But in fact you were constraint by the memory and computation cost, thus we have _segments_. Transformers attend your data in segments and therefore you have to introduce an additional level called segment between your entire curpus and the tokens given how capable your model is and how much compute resource you have.

Although it is straight forward to think that you can prepend the hidden state (or kv cache) from the previous segment directly to your current context, and do stop graident to make it less computational expensive, it is still blocked by the problem of the _positional embedding_.

Transformer learns the positional relationship between tokens via positional embedding. Modern LLMs use [[RoPE]] (Rotetary Positional Embedding) as a simple, powerful way to embed relative positional information, it was not there yet in the time of this paper. Directly reuse the previous hidden state from previous segment would _confuse Transformer on where this token locates_ .

So they propose a relative positional embedding scheme, that positional embeds based on the distance between key $i$ and the query $j$. This is the first contribution from the paper. Since this positional embedding is also simple sinusoid, it is not hard for model to generalize to longer context during eval.

Next with the correct and extensible positional embedding, they propose the segment level recurrence. Which in simple term is cache the hidden state of each token in each layer of the previous segment, then use the $W_k$ and $W_v$ to reconstruct the key and value of the previous token. Then a contextually subsequent segment (that is the next segment of inference of text) would just use this KV cache from the previous segment as the context for its training. with only the difference that it is not having gradient propogation.

This makes the context length effectively multiplied with $N$ segments you want to prepend into the training. What this offers is a way to efficiently train transformer to learn very long horizen dependencies, which suits the need in LocoFormer.

## Remaining Questions of Mine

- [ ] Subsequent question: what has improved from 2019 to now that enables such context length growth on Transformers? RoPE, Flash Attention and also sheer size. Sparse Attention.