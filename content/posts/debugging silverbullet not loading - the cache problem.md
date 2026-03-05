---
tags: ["debug", "silverbullet", "infra"]
date: 2026-03-05
title: "Debugging Silverbullet not Loading - How to peel off the onion of cache"
---

SilverBullet is my favorite note-taking app, and I use it as my main system every day for already 2 years.

But I must admit, updating it has often been painful for me. Many times, an update looks broken right after deployment, then mysteriously starts working a day later. I used to treat that as random bad luck.

After a few busy weeks, I finally had time to update again today. But unfortunately, I saw only a white screen when opened, and my heart skipped a beat.

## Symptom

New clients opening `https://my-silverbullet.lumeny.io/` got a blank page.

Browser console logs included:

- `Falling back to cache for .config`
- `TypeError: Cannot set properties of undefined (setting 'enableClientEncryption')`

## First suspect: timeout

The first issue was straightforward: the code used a 1-second timeout, but my server needed about 1.63 seconds to finish that path.

So on paper, this part was easy. Increase or patch timeout behavior, and startup should recover.

But after patching, my clients still failed with the same white screen.

## What was actually happening

So confused as I was, I have to dig deeper and debug in the console. Weirdly I find clients were receiving different versions of `/.client/client.js`.

- some got stale cached frontend code
- some got fresh patched code

That mismatch explained why the bug survived even after server-side changes.

## Fix 1: Cloudflare cache rules

So digging to this point I realize that **cloudflare is not supposed to cache silverbullet editor related stuff**, it was the culprit of the “mysterious recovery overnight” I experienced early. So I added a bypass rule for SilverBullet client assets on `my-silverbullet.lumeny.io`.

```txt
(http.host eq "my-silverbullet.lumeny.io" and starts_with(http.request.uri.path, "/.client/"))
```

I set cache eligibility to `Bypass cache` for this expression to avoid caching.

Then I purged key URLs once:

- `https://my-silverbullet.lumeny.io/.client/client.js`
- `https://my-silverbullet.lumeny.io/.client/client.js.map`
- `https://my-silverbullet.lumeny.io/.client/index.html`

This removed the CDN-side stale bundle issue.

## Fix 2: local browser cache

But nothing comes so smooth, even after Cloudflare rules and purge, my main browser profile still showed the white screen. It was very frustrating, but it seems certain that _this must be caused by a cache somewhere_, and there are only limited places where things are cached.

So that is how I find the the second layer: local browser cache was still serving stale script artifacts.

After closing all Chrome/Chromium windows and clearing local cache directories, everything loaded normally again.

For Chromium:

```bash
rm -rf ~/.cache/chromium/Default/Cache
rm -rf ~/.cache/chromium/Default/Code\ Cache
rm -rf ~/.cache/chromium/Default/GPUCache
```

For Google Chrome:

```bash
rm -rf ~/.cache/google-chrome/Default/Cache
rm -rf ~/.cache/google-chrome/Default/Code\ Cache
rm -rf ~/.cache/google-chrome/Default/GPUCache
```

## Final takeaway

This looked like one bug, but it was really a layered cache issue:

1. timeout too short for my real server response time (1s vs ~1.63s)
2. stale Cloudflare edge cache for frontend assets
3. stale local browser cache after edge fixes

It also explains why old updates sometimes "fixed themselves" a day later: cache expiry was masking the root cause. 

Given my experience, updating SilverBullet knstance is always frustrating, but today I made it more deterministic: I know Cloudflare won't be catching my editor files anymore, and I know where to clean up when the new version doesn't apply. 

When debugging, the more mysterious and frustrating it was, the more rewarding it feels after you solve it, and this is exactly what I feel today.

