import type { Project } from '../content/site'

/**
 * The stacked list of project cards, shared by the homepage teaser and the
 * full /projects page so the two never drift.
 */
export function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="flex flex-col gap-y-9">
      {items.map((project) => {
        // Internal links (case studies) open in the same tab and get a
        // read-more affordance; external repo links open in a new tab.
        const internal = project.href?.startsWith('/')
        return (
          <li key={project.name} className="notes-entry">
            {/* Not every project carries a period; when it does it leads the
                entry the way a date leads a note. */}
            {project.period ? (
              <p className="notes-meta">{project.period}</p>
            ) : null}

            <h3
              className={`font-serif text-[1.25rem] leading-snug text-ink ${
                project.period ? 'mt-1' : ''
              }`}
            >
              {project.href ? (
                <a
                  href={project.href}
                  className="underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
                  {...(internal
                    ? {}
                    : { target: '_blank', rel: 'noreferrer noopener' })}
                >
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </h3>

            <p className="notes-item mt-2 max-w-[31.25rem]">
              <span className="text-[1.0625rem] leading-[1.6] text-body">
                {project.description}
              </span>
            </p>

            <p className="notes-meta mt-2.5">{project.metrics.join(' · ')}</p>

            <p className="notes-meta mt-1">{project.stack}</p>

            {internal ? (
              <a
                href={project.href}
                className="mt-2 inline-block text-[0.875rem] text-muted underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                Read the write-up →
              </a>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
