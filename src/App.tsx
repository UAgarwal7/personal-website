import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { PageShell } from './components/PageShell'
import { Projects } from './components/Projects'

export default function App() {
  return (
    <PageShell>
      <Experience />
      <Projects />
      <Education />
      {/* Contact is mobile-only: on desktop the sticky rail already shows the
          links, so the section would just duplicate them. */}
      <Contact />
    </PageShell>
  )
}
