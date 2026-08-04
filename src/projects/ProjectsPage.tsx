import { PageShell } from '../components/PageShell'
import { ProjectList } from '../components/ProjectList'
import { projects } from '../content/site'

export function ProjectsPage() {
  return (
    <PageShell>
      <section>
        <h2 className="label">All projects</h2>
        <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-body">
          Security, machine learning, and real-time systems — the fuller list.
          A few have their own write-ups; the rest link to the code.
        </p>
        <div className="mt-8">
          <ProjectList items={projects} />
        </div>
      </section>

      {/* Mobile gets an explicit way back; on desktop the rail name links home. */}
      <footer className="pt-12 lg:hidden">
        <a
          href="/"
          className="text-[0.9375rem] text-muted underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          ← Back to home
        </a>
      </footer>
    </PageShell>
  )
}
