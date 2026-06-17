import type { QuartzTransformerPlugin } from "@quartz-community/types"

interface DateFrontmatterCompatOptions {
  /** Existing/frontmatter convention used by the notes source of truth. */
  sourceField: string
  /** Quartz v5 date field consumed by created-modified-date. */
  targetField: "created" | "modified" | "published"
}

const defaultOptions: DateFrontmatterCompatOptions = {
  sourceField: "date",
  targetField: "published",
}

type FileData = {
  frontmatter?: Record<string, unknown>
}

const DateFrontmatterCompat: QuartzTransformerPlugin<Partial<DateFrontmatterCompatOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "DateFrontmatterCompat",
    markdownPlugins() {
      return [
        () => (_tree: unknown, file: { data: unknown }) => {
          const data = file.data as FileData
          const frontmatter = data.frontmatter
          if (!frontmatter) return

          if (
            frontmatter[opts.targetField] === undefined &&
            frontmatter[opts.sourceField] !== undefined
          ) {
            frontmatter[opts.targetField] = frontmatter[opts.sourceField]
          }
        },
      ]
    },
  }
}

export default DateFrontmatterCompat
export { DateFrontmatterCompat }
