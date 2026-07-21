import { projects } from '../content/site'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <ul className="flex flex-col gap-y-9">
        {projects.map((project) => (
          <li key={project.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-serif text-[1.25rem] leading-snug text-ink">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              {project.period ? (
                <span className="text-[0.875rem] text-muted">{project.period}</span>
              ) : null}
            </div>

            <p className="mt-2 max-w-[31.25rem] text-[1.0625rem] leading-[1.6] text-body">
              {project.description}
            </p>

            <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted">
              {project.metrics.join(' · ')}
            </p>

            <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">
              {project.stack}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
