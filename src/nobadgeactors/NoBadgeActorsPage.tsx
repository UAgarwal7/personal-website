import type { ReactNode } from 'react'
import { context, greenScreen, repoUrl, stack } from '../content/nobadgeactors'

const linkStyle =
  'text-muted underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink'

function Label({ children }: { children: string }) {
  return <h2 className="label">{children}</h2>
}

/** Inline monospace token, e.g. a module name or a badge screen string. */
function Code({ children }: { children: string }) {
  return (
    <code className="bg-[#f1efe8] px-1 py-0.5 font-mono text-[0.875em] text-ink">
      {children}
    </code>
  )
}

/** Prose block shared by every section. */
function Body({ children, className = 'mt-6' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`${className} max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body`}
    >
      {children}
    </div>
  )
}

/**
 * A run of points, each led by a short phrase in ink. No bullets: the lead-in
 * marks the item, keeping the column as quiet as the other writeups.
 */
function Points({ items }: { items: { lead: string; body: ReactNode }[] }) {
  return (
    <ul className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
      {items.map((item) => (
        <li key={item.lead}>
          <span className="text-ink">{item.lead}</span> {item.body}
        </li>
      ))}
    </ul>
  )
}

export function NoBadgeActorsPage() {
  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-24 sm:px-10">
      <nav className="pt-10 sm:pt-14">
        <a href="/" className={`text-[0.875rem] ${linkStyle}`}>
          <span className="nav-arrow">←</span> Utsav Agarwal
        </a>
      </nav>

      <header className="pt-10 sm:pt-14">
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          No Badge Actors
        </h1>
        <p className="mt-3 font-mono text-[0.8125rem] leading-[1.5] text-muted">{context}</p>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-body">
          A hardware security key for payments, built on DEF CON badges. It checks
          who you're paying, that they're standing in front of you, and what you're
          actually signing, before a button press releases the signature.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <span className="text-faint">{stack}</span>
        </div>
      </header>

      {/* problem */}
      <section className="pt-14 sm:pt-16">
        <Label>Problem</Label>
        <Body>
          <p>
            Most payment fraud doesn't break cryptography. It fools people. You pay
            an impostor using a real business's name, or you approve something
            different from what you think you're approving. Worse, the screen you
            confirm on is usually the same phone or app the scammer is coaching you
            through.
          </p>
          <p>
            Hardware security keys largely ended phishing for logins. Payments never
            got the equivalent: a device that verifies the payee, not just the user.
          </p>
        </Body>
      </section>

      {/* what we built */}
      <section className="pt-14 sm:pt-16">
        <Label>What we built</Label>
        <Body>
          <p>
            A payment key on the Solana DEF CON 34 badge. Before it will sign
            anything, the badge's firmware checks three things on its own screen, out
            of reach of any app:
          </p>
        </Body>
        <Points
          items={[
            {
              lead: 'Who.',
              body: (
                <>
                  The payee's badge key carries a record signed by Capital One's
                  issuer key and anchored on-chain through the Solana Attestation
                  Service. "Verified" means the bank knows this business.
                </>
              ),
            },
            {
              lead: 'Present.',
              body: (
                <>
                  The payer's badge sends a fresh random challenge over ESP-NOW. The
                  payee's badge has to sign it and answer within a few hundred
                  milliseconds.
                </>
              ),
            },
            {
              lead: 'What.',
              body: (
                <>
                  The badge decodes the actual transaction itself (recipient, exact
                  amount, real token) instead of trusting a description of it.
                </>
              ),
            },
          ]}
        />
        <Body className="mt-5">
          <p>
            Only when all three pass does the screen turn green (
            <Code>{greenScreen}</Code>), and only a physical button press signs.
            Payments move in HACK, our own SPL token on Solana devnet standing in
            for a stablecoin.
          </p>
          <p>
            The demo is built around six beats: verify a merchant, top up, pay, catch
            an impostor using the same name, catch a tampered transfer that displays
            5 but moves 500, then revoke the merchant and watch the next attempt go
            red.
          </p>
        </Body>
      </section>

      {/* my part */}
      <section className="pt-14 sm:pt-16">
        <Label>My part</Label>
        <Body>
          <p>I owned the product spec, the trust model and the backend.</p>
        </Body>
        <Points
          items={[
            {
              lead: 'Specs and scope.',
              body: (
                <>
                  Wrote the PRD, the shared interface contract (wallet API, signing
                  prefixes, radio message formats, registry record, backend routes)
                  and the per-person build packages, so three people could build
                  firmware, test harness and backend in parallel against one
                  contract. Late in the build I wrote the final scope decision that
                  cut a relay-routing feature to protect the core demo.
                </>
              ),
            },
            {
              lead: 'Issuer and registry.',
              body: (
                <>
                  Capital One's issuer key signs one record per verified payee, and
                  the record lands on-chain as a Solana Attestation Service
                  attestation. Bank account numbers never touch the chain: records
                  carry a salted hash, and the salts stay in the backend database.
                  Revocation closes the attestation and turns the payee red on every
                  badge within about 30 seconds.
                </>
              ),
            },
            {
              lead: 'Capital One integration.',
              body: (
                <>
                  Three roles for the bank, all through the Nessie API. It's the
                  identity anchor, it funds judges' badges (a Nessie withdrawal pays
                  out HACK) and it settles merchants (an on-chain payment triggers a
                  matching dollar deposit). The bank never moves money on its own
                  initiative, only after a badge-signed payment has landed on chain.
                </>
              ),
            },
            {
              lead: 'Backend and dashboard.',
              body: (
                <>
                  A Node server with no framework, on <Code>node:http</Code>, plus
                  TimescaleDB and a React panel. It ingests every HACK payment live
                  from devnet, then serves signed payee records to badges and handles
                  settlement and top-ups. The panel has an issuer page for verifying
                  and revoking, a live payment feed with badge refusals, and the
                  attack console that builds the tampered transaction.
                </>
              ),
            },
          ]}
        />
        <Body className="mt-5">
          <p>
            Ayush built the badge firmware wallet core and Raiana built the test
            harness, presence timing and attack tooling. The badge OS underneath is
            Solana OS by spacemandev.
          </p>
        </Body>
      </section>

      {/* design decisions */}
      <section className="pt-14 sm:pt-16">
        <Label>Design decisions</Label>
        <Points
          items={[
            {
              lead: 'Two kinds of keys, like TLS.',
              body: (
                <>
                  Each badge key proves "this device." The issuer key proves "this
                  device belongs to this business." The badge checks both. An
                  impostor can copy the name but can't sign with the merchant's key.
                </>
              ),
            },
            {
              lead: 'Verification below the app layer.',
              body: (
                <>
                  Every check runs in the badge's C core, not the Lua apps, so a
                  compromised app can't draw a fake green screen.
                </>
              ),
            },
            {
              lead: 'Cutting features to keep the demo honest.',
              body: (
                <>
                  We cut relay routing (badges forwarding payments hop by hop for
                  per-hop fees) and a badge-signed bank authorization once it was
                  clear they'd cost the core flow. The relay endpoints stayed built
                  but unused.
                </>
              ),
            },
          ]}
        />
      </section>

      {/* limitations */}
      <section className="pt-14 sm:pt-16">
        <Label>Limitations</Label>
        <Body>
          <p>
            Keys are software keys. The badge's secure element latched the button bus
            on warm resets, so we disabled it.
          </p>
          <p>
            The badge-facing listener has no authentication. That's acceptable on
            devnet, not beyond it.
          </p>
          <p>
            Presence is proven by response timing over short-range radio, not
            distance bounding, so it doesn't defeat a relay attack.
          </p>
          <p>Devnet and a mock bank only, so no real money moved.</p>
        </Body>
      </section>

      {/* result */}
      <section className="pt-14 sm:pt-16">
        <Label>Result</Label>
        <Body>
          <p>Won MLH's Best Use of Solana and the Judged by an LLM track.</p>
        </Body>
      </section>

      <footer className="pt-16">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <a href="/" className={linkStyle}>
            <span className="nav-arrow">←</span> Back to home
          </a>
        </div>
      </footer>
    </main>
  )
}
