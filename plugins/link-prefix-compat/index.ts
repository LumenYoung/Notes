import type { QuartzTransformerPlugin } from "@quartz-community/types"

interface LinkPrefixCompatOptions {
  /** Prefix used inside the source Silverbullet space but absent from the published site. */
  prefix: string
}

const defaultOptions: LinkPrefixCompatOptions = {
  prefix: "Publish",
}

function normalizePrefix(prefix: string): string {
  return prefix.replace(/^\/+|\/+$/g, "")
}

function stripPrefix(path: string, prefix: string): string {
  const trimmed = path.trim()
  const normalizedPath = trimmed.replace(/\\/g, "/").replace(/^\/+/, "")
  const normalizedPrefix = normalizePrefix(prefix)

  if (!normalizedPrefix) return trimmed
  if (normalizedPath === normalizedPrefix) return ""
  if (!normalizedPath.startsWith(`${normalizedPrefix}/`)) return trimmed

  return normalizedPath.slice(normalizedPrefix.length).replace(/^\/+/, "")
}

function splitOnce(value: string, separator: string): [string, string] {
  const index = value.indexOf(separator)
  if (index === -1) return [value, ""]
  return [value.slice(0, index), value.slice(index)]
}

function rewriteWikilinkInner(inner: string, prefix: string): string {
  const [targetAndAnchor, aliasPart] = splitOnce(inner, "|")
  const [targetPath, anchorPart] = splitOnce(targetAndAnchor, "#")
  const strippedTarget = stripPrefix(targetPath, prefix)

  return `${strippedTarget}${anchorPart}${aliasPart}`
}

function rewriteWikilinks(src: string, prefix: string): string {
  return src.replace(/(!?\[\[)([^\]]+?)(\]\])/g, (_match, open: string, inner: string, close: string) => {
    return `${open}${rewriteWikilinkInner(inner, prefix)}${close}`
  })
}

const LinkPrefixCompat: QuartzTransformerPlugin<Partial<LinkPrefixCompatOptions>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "LinkPrefixCompat",
    textTransform(_ctx, src) {
      return rewriteWikilinks(src, opts.prefix)
    },
  }
}

export default LinkPrefixCompat
export { LinkPrefixCompat }
