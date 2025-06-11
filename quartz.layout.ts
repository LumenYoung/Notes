import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { endsWith } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      MyGitHub: "https://github.com/LumenYoung",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.DesktopOnly(Component.Links()),
    // Component.DesktopOnly(
    //   Component.RecentNotes({
    //     filter: (file) => {
    //       const slug = file.slug ?? ""
    //       return !(
    //         slug.endsWith("/") ||
    //         endsWith(slug, "index") ||
    //         endsWith(slug, "index.md") ||
    //         endsWith(slug, "index.html")
    //       )
    //     },
    //     limit: 5,
    //     showTags: true,
    //   }),
    // ),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.RecentNotes({
      filter: (file) => {
        const slug = file.slug ?? ""
        return !(
          slug.endsWith("/") ||
          endsWith(slug, "index") ||
          endsWith(slug, "index.md") ||
          endsWith(slug, "index.html")
        )
      },
      limit: 5,
      showTags: true,
    }),
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "LumenYoung/Notes",
        // from data-repo-id
        repoId: "R_kgDONDxfsA",
        // from data-category
        category: "Comments",
        // from data-category-id
        categoryId: "DIC_kwDONDxfsM4Cj7Qu",
        mapping: "pathname",
        reactionsEnabled: true,
        inputPosition: "top",
      },
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "LumenYoung/Notes",
        // from data-repo-id
        repoId: "R_kgDONDxfsA",
        // from data-category
        category: "Comments",
        // from data-category-id
        categoryId: "DIC_kwDONDxfsM4Cj7Qu",
        mapping: "pathname",
        reactionsEnabled: true,
        inputPosition: "top",
      },
    }),
    Component.RecentNotes({
      filter: (file) => {
        const slug = file.slug ?? ""
        return !(
          slug.endsWith("/") ||
          endsWith(slug, "index") ||
          endsWith(slug, "index.md") ||
          endsWith(slug, "index.html")
        )
      },
      limit: 5,
      showTags: true,
    }),
  ],
}
