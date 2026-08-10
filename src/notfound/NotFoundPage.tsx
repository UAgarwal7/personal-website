import { LinkRow } from '../components/LinkRow'
import { profile } from '../content/site'

/**
 * Served by Vercel for any unmatched route. Kept in the field-notes voice and
 * deliberately short: the job is to say what happened and hand back a route
 * into the site, not to be clever about it.
 */
export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[34rem] flex-col justify-center px-6 py-24 sm:px-10">
      <p className="label-notes">404</p>

      <h1 className="mt-6 font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink">
        No page here
      </h1>

      <p className="mt-4 text-[1.0625rem] leading-[1.6] text-body">
        That address doesn't match anything on the site. It may have moved, or
        the link that brought you here may be out of date.
      </p>

      <nav aria-label="Site" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[0.9375rem] text-muted underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="mt-12 border-t border-hairline pt-6">
        <p className="notes-meta">{profile.name}</p>
        <div className="mt-3">
          <LinkRow ariaLabel="Profiles" />
        </div>
      </div>
    </main>
  )
}
