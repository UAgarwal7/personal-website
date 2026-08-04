import { projects } from '../content/site'
import { ProjectList } from './ProjectList'
import { Section } from './Section'

const featured = projects.filter((p) => p.featured)

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <ProjectList items={featured} />

      <a
        href="/projects"
        className="mt-9 inline-block text-[0.9375rem] text-muted underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
      >
        See all projects <span className="nav-arrow">→</span>
      </a>
    </Section>
  )
}
