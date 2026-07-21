import { useEffect, useRef, useState } from 'react'
import { email, links } from '../content/site'

const RESET_MS = 2000

const linkStyle =
  'text-[0.9375rem] text-muted underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), RESET_MS)
    } catch {
      // Clipboard is unavailable outside secure contexts and in some embedded
      // browsers. Fall back to the behaviour the button replaced.
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        // Sighted users get the label swap; screen readers get this plus the
        // live region below, which otherwise have no signal the click did
        // anything at all.
        aria-label={`Copy email address, ${email}`}
        className={`${linkStyle} cursor-pointer text-left`}
      >
        {/* Fixed width so the row doesn't reflow when the label changes. */}
        <span className="inline-block min-w-[3.75rem]">
          {copied ? 'Copied' : 'Email'}
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `Copied ${email} to clipboard` : ''}
      </span>
    </>
  )
}

export function LinkRow({ ariaLabel }: { ariaLabel: string }) {
  return (
    <nav
      aria-label={ariaLabel}
      className="flex flex-wrap items-baseline gap-x-6 gap-y-2"
    >
      <CopyEmail />
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className={linkStyle}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
