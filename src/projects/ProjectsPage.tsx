import { ProjectList } from '../components/ProjectList'
import { projects } from '../content/site'

const linkStyle =
  'text-muted underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink'

export function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[40rem] px-6 pb-24 sm:px-10">
      <nav className="pt-10 sm:pt-14">
        <a href="/" className={`text-[0.875rem] ${linkStyle}`}>
          ← Utsav Agarwal
        </a>
      </nav>

      <header className="pt-10 sm:pt-14">
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          Projects
        </h1>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-body">
          Security, machine learning, and real-time systems — the fuller list.
          A few have their own write-ups; the rest link to the code.
        </p>
      </header>

      <section className="pt-12 sm:pt-14">
        <ProjectList items={projects} />
      </section>

      <footer className="pt-16">
        <a href="/" className={`text-[0.9375rem] ${linkStyle}`}>
          ← Back to home
        </a>
      </footer>
    </main>
  )
}
