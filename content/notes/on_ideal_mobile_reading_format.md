---
aliases: [Markdown is a more ideal format for mobile book] 
date: 2025-08-18
published: 2025-08-18
tags: [thoughts]
title: Markdown is a more ideal format for mobile e-book
---
Recently, I've had trouble reading e-books on my Kindle. I want to read some physic book which contains a lot of math expressions but both epub and pdf are ugly to me.

Apparently, EPUB and PDF are the primary solutions for reading on a Kindle, and they represent two extremes. PDF is rigorously formatted, while EPUB is designed to reflow its content freely based on the desired font and screen size.

A PDF is perfect if you have a large enough screen, but the text is often too small when presented on a mobile device; even my 10.4-inch Kindle Scribe feels a bit small for a standard PDF book. Meanwhile, EPUB becomes a formatting disaster when there are plenty of equations inside. The equations in an EPUB are converted into static images, so they are incapable of adapting to the background (like in dark mode) or rendering cleanly with the surrounding text.

This whole issue stems from a clash between two opposing philosophies: the strict, print-oriented formatting of systems like LaTeX (used to generate those beautifully formatted PDFs) and the loose, reflowable nature of formats like EPUB, which lack a native math-rendering engine like MathJax. Both fall short when you need technical material to be well-formatted on mobile devices with their varied screen sizes.

I can't help but think that in an alternative history, if Markdown and other lightweight markup languages had become popular *before* the e-book industry took shape, we would have better-formatted e-books that are more versatile and better at handling mathematical equations. As a proof, we can see `README.md` from GitHub nicely rendered on the GitHub mobile app or web app, better than most of the math related e-book.