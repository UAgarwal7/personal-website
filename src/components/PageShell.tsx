import type { ReactNode } from 'react'
import { CursorField } from './CursorField'
import { Sidebar } from './Sidebar'

/**
 * The site's outer layout: block flow (single column) on mobile, a two-column
 * grid with a sticky left rail at lg+. Shared by the homepage and /projects so
 * the two can't drift. The grid track is minmax(0,…) and main is min-w-0 so
 * long content can't force horizontal overflow.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[62rem] px-6 sm:px-10 lg:grid lg:grid-cols-[15rem_minmax(0,38rem)] lg:gap-x-16 xl:gap-x-24">
      {/* Lives here rather than in App so it covers both rail pages, and only
          those: it reveals the `body.fieldnotes` dot grid, which the long-form
          write-ups don't have. */}
      <CursorField />
      <Sidebar />
      <main className="min-w-0 pb-20 lg:pb-24 lg:pt-20">{children}</main>
    </div>
  )
}
