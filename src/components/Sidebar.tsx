import { profile } from '../content/site'
import { LinkRow } from './LinkRow'

const nav = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

/**
 * The left rail. On wide screens it's a sticky, full-height column holding the
 * name, role, section nav, and links; on mobile it collapses to a normal
 * stacked header at the top of the page (name, role, links).
 */
export function Sidebar() {
  return (
    <header className="pt-16 pb-10 sm:pt-20 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-20">
      <div>
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink">
          <a href="/" className="transition-colors hover:text-body">
            {profile.name}
          </a>
        </h1>

        <p className="mt-3 max-w-[31.25rem] text-[1.0625rem] leading-[1.5] text-muted">
          {profile.roleTag}
        </p>

        {/* Section nav — desktop only; on mobile the sections sit right below. */}
        <nav aria-label="Sections" className="mt-10 hidden lg:block">
          <ul className="flex flex-col gap-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 lg:mt-0">
        <LinkRow ariaLabel="Profiles" />
      </div>
    </header>
  )
}
