---
id: Troubleshoot gpg key connection
aliases: []
tags:
  - gpg
  - archlinux
date: "2025-01-01"
published: "2025-01-01"
modified: "2025-01-01"
title: "Troubleshoot: GPG keyserver receive failed"
---

I just discovered that Arch Linux also uses public keys from the [ubuntu key server](https://keyserver.ubuntu.com) for signing packages.

The error `gpg: keyserver receive failed: Server indicated a failure` occurred when I was trying to install `python312` from AUR. Some mysterious problem prevented me from connecting to the ubuntu keyserver, likely due to the notorious GFW in China.

Thanks to the [archlinux bbs](https://bbs.archlinux.org/viewtopic.php?id=259473) thread, I found the solution proposed from the community: 1) manually download the keyfile from keyserver and 2) then import it using `gpg --import <key file>`.
