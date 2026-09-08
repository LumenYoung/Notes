import { h } from "preact"

const defaultSections = [
  { title: "Papers", href: "/papers", folder: "papers" },
  { title: "Posts", href: "/posts", folder: "posts" },
  { title: "Notes", href: "/notes", folder: "notes" },
  { title: "Life", href: "/life", folder: "life" },
  { title: "Projects", href: "/projects", folder: "projects" },
]

const defaultOptions = {
  limit: 3,
  tagLimit: 3,
  sections: defaultSections,
}

function pageDate(page) {
  const dates = page.dates
  if (!dates) return undefined
  return dates[page.defaultDateType] ?? dates.published ?? dates.modified ?? dates.created
}

function dateMillis(page) {
  const d = pageDate(page)
  return d ? new Date(d).getTime() : 0
}

function formatDate(page, locale) {
  const d = pageDate(page)
  if (!d) return null
  const date = new Date(d)
  return h(
    "time",
    { datetime: date.toISOString() },
    date.toLocaleDateString(locale ?? "en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
  )
}

function normalizeTags(tags) {
  if (!tags) return []
  return Array.isArray(tags) ? tags : [tags]
}

function isIndexLike(slug, folder) {
  return slug === folder || slug === `${folder}/index` || slug.endsWith("/index")
}

function pagesForSection(allFiles, section, limit) {
  return allFiles
    .filter((page) => {
      const slug = page.slug ?? ""
      return slug.startsWith(`${section.folder}/`) && !isIndexLike(slug, section.folder)
    })
    .sort((a, b) => {
      const dateDiff = dateMillis(b) - dateMillis(a)
      if (dateDiff !== 0) return dateDiff

      const aTitle = a.frontmatter?.title ?? ""
      const bTitle = b.frontmatter?.title ?? ""
      return aTitle.localeCompare(bTitle)
    })
    .slice(0, section.limit ?? limit)
}

function tagLink(tag) {
  return `/tags/${String(tag)}`
}

const style = `
.homepage-sections {
  margin-top: 2rem;
}

.homepage-sections .homepage-section {
  margin-top: 2rem;
}

.homepage-sections .section-heading {
  align-items: baseline;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.homepage-sections .section-heading h2 {
  margin: 0;
}

.homepage-sections .section-heading .section-more {
  font-size: 0.9rem;
  opacity: 0.75;
}

.homepage-sections ul.section-ul {
  list-style: none;
  margin-top: 1rem;
  padding-left: 0;
}

.homepage-sections li.section-li {
  margin-bottom: 1em;
}

.homepage-sections li.section-li > .section {
  display: grid;
  grid-template-columns: fit-content(8em) 3fr 1fr;
}

.homepage-sections li.section-li > .section > .desc > h3 > a {
  background-color: transparent;
}

.homepage-sections li.section-li > .section .meta {
  margin: 0 1em 0 0;
  opacity: 0.6;
}

.homepage-sections .section h3 {
  margin: 0;
}

.homepage-sections .section > .tags {
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 800px) {
  .homepage-sections li.section-li > .section {
    grid-template-columns: fit-content(8em) 1fr;
  }

  .homepage-sections li.section-li > .section > .tags {
    display: none;
  }
}
`

const HomepageSections = (userOpts) => {
  const opts = {
    ...defaultOptions,
    ...userOpts,
    sections: userOpts?.sections ?? defaultOptions.sections,
  }

  const HomepageSectionsComponent = ({ allFiles, cfg, fileData }) => {
    if (fileData.slug !== "index") return null

    const renderedSections = opts.sections
      .map((section) => ({
        section,
        pages: pagesForSection(allFiles, section, opts.limit),
      }))
      .filter(({ pages }) => pages.length > 0)

    if (renderedSections.length === 0) return null

    return h(
      "div",
      { class: "homepage-sections" },
      renderedSections.map(({ section, pages }) =>
        h(
          "section",
          { class: "homepage-section", key: section.folder },
          h(
            "div",
            { class: "section-heading" },
            h("h2", null, h("a", { href: section.href }, section.title)),
            h("a", { class: "section-more", href: section.href }, "view all →"),
          ),
          h(
            "ul",
            { class: "section-ul" },
            pages.map((page) => {
              const tags = normalizeTags(page.frontmatter?.tags).slice(0, opts.tagLimit)
              const title = page.frontmatter?.title ?? page.slug
              return h(
                "li",
                { class: "section-li", key: page.slug },
                h(
                  "div",
                  { class: "section" },
                  h("p", { class: "meta" }, formatDate(page, cfg.locale)),
                  h(
                    "div",
                    { class: "desc" },
                    h(
                      "h3",
                      null,
                      h("a", { class: "internal internal-link", href: `/${page.slug}` }, title),
                    ),
                  ),
                  h(
                    "ul",
                    { class: "tags" },
                    tags.map((tag) =>
                      h(
                        "li",
                        { key: tag },
                        h("a", { class: "internal tag-link", href: tagLink(tag) }, tag),
                      ),
                    ),
                  ),
                ),
              )
            }),
          ),
        ),
      ),
    )
  }

  HomepageSectionsComponent.css = style
  return HomepageSectionsComponent
}

export default HomepageSections
export { HomepageSections }
