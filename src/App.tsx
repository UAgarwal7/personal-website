import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Work } from './components/Work'

export default function App() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[40rem] px-6 pb-24 sm:px-10">
      <Hero />
      <Work />
      <Experience />
      <Education />
      <Contact />
    </main>
  )
}
