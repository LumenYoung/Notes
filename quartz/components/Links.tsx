import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/links.scss"

interface Options {
  title: string
}

const defaultOptions: Options = {
  title: "",
}

export default ((userOpts?: Partial<Options>) => {
  function Links({ displayClass }: QuartzComponentProps) {
    const opts = { ...defaultOptions, ...userOpts }

    return (
      <div class={`links ${displayClass ?? ""}`}>
        <h3>{opts.title}</h3>
        <ul>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/notes">Notes</a>
            </h3>
            <i>Pieces I've learned</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/life">Life</a>
            </h3>
            <i>Life slips away faster if I don't record</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/posts">Posts</a>
            </h3>
            <i>Systematic output is the real sign of learning</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/projects">Projects</a>
            </h3>
            <i>Life without project is a life without active structure</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/papers">Papers</a>
            </h3>
            <i>Scientific Readings that once captured my interest</i>
          </li>
        </ul>
      </div>
    )
  }

  Links.css = style
  return Links
}) satisfies QuartzComponentConstructor<Partial<Options> | undefined>
