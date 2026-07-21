import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  label: string
  children: ReactNode
}

/**
 * A titled section. Sections own their own spacing and never assume anything
 * about the page around them, so one can be lifted onto its own route later
 * without touching what's inside it.
 */
export function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="py-10 sm:py-14">
      <h2 className="label">{label}</h2>
      <div className="mt-6 sm:mt-8">{children}</div>
    </section>
  )
}
