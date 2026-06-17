import { h } from "preact"

const defaultOptions = {
  title: "Overview",
  items: [
    {
      title: "Notes",
      href: "/notes",
      description: "Pieces I've learned",
    },
    {
      title: "Life",
      href: "/life",
      description: "Life slips away faster if I don't record",
    },
    {
      title: "Posts",
      href: "/posts",
      description: "Systematic output is the real sign of learning",
    },
    {
      title: "Projects",
      href: "/projects",
      description: "Life without project is a life without active structure",
    },
    {
      title: "Papers",
      href: "/papers",
      description: "Scientific Readings that once captured my interest",
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const style = `
.category-overview {
  ul {
    list-style: none;
    margin-top: 1rem;
    padding-left: 0;
  }

  li {
    margin: 1rem 0;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }

  a {
    background-color: transparent;
  }

  i {
    display: block;
    line-height: 1.25rem;
    opacity: 0.75;
  }
}
`

const CategoryOverview = (userOpts) => {
  const opts = {
    ...defaultOptions,
    ...userOpts,
    items: userOpts?.items ?? defaultOptions.items,
  }

  const CategoryOverviewComponent = ({ displayClass }) => {
    return h(
      "nav",
      { class: classNames(displayClass, "category-overview"), "aria-label": "Category overview" },
      opts.title ? h("h3", null, opts.title) : null,
      h(
        "ul",
        null,
        opts.items.map((item) =>
          h(
            "li",
            { key: item.href },
            h("h3", null, h("a", { href: item.href }, item.title)),
            h("i", null, item.description),
          ),
        ),
      ),
    )
  }

  CategoryOverviewComponent.css = style
  return CategoryOverviewComponent
}

export default CategoryOverview
export { CategoryOverview }
