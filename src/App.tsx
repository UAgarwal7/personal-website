import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Sidebar } from './components/Sidebar'

export default function App() {
  return (
    // Block flow (single column) on mobile; a two-column grid only at lg. The
    // grid's content track is minmax(0,…) and main is min-w-0 so long content
    // can't force horizontal overflow.
    <div className="mx-auto min-h-dvh w-full max-w-[62rem] px-6 sm:px-10 lg:grid lg:grid-cols-[15rem_minmax(0,38rem)] lg:gap-x-16 xl:gap-x-24">
      <Sidebar />
      <main className="min-w-0 pb-20 lg:pb-24 lg:pt-20">
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
