import {
  aclLine,
  castUrl,
  configDiff,
  repoUrl,
  transcriptHardened,
  transcriptVulnerable,
} from '../content/mqtt'

const linkStyle =
  'text-muted underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink'

function Label({ children }: { children: string }) {
  return <h2 className="label">{children}</h2>
}

/** Inline monospace token, e.g. a topic or directive. */
function Code({ children }: { children: string }) {
  return (
    <code className="bg-[#f1efe8] px-1 py-0.5 font-mono text-[0.875em] text-ink">
      {children}
    </code>
  )
}

/** Monospace panel for transcripts and config. */
function Pre({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto border border-hairline bg-[#f4f2ec] p-4 font-mono text-[0.8125rem] leading-relaxed text-body">
      {children}
    </pre>
  )
}

export function MqttPage() {
  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-24 sm:px-10">
      <nav className="pt-10 sm:pt-14">
        <a href="/" className={`text-[0.875rem] ${linkStyle}`}>
          <span className="nav-arrow">←</span> Utsav Agarwal
        </a>
      </nav>

      <header className="pt-10 sm:pt-14">
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          MQTT tenant isolation
        </h1>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-body">
          A clone-and-run lab that makes cross-tenant message disclosure on a
          multi-tenant MQTT broker executable — then contains it with one line of
          Mosquitto ACL. The same attack runs before and after; only the broker
          config changes.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <a href={castUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            Recorded demo
          </a>
          <span className="text-faint">Mosquitto · Docker · security</span>
        </div>
      </header>

      {/* threat model */}
      <section className="pt-14 sm:pt-16">
        <Label>Threat model</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            A single MQTT broker serves multiple tenants on shared infrastructure.
            Each tenant works under its own topic namespace — <Code>tenant_a/#</Code>,{' '}
            <Code>tenant_b/#</Code> — and the trust assumption holding the whole
            thing together is simple: one tenant cannot read another's traffic.
          </p>
        </div>
      </section>

      {/* the vulnerability */}
      <section className="pt-14 sm:pt-16">
        <Label>The vulnerability</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Authentication is not authorization. The broker has auth switched on —{' '}
            <Code>allow_anonymous false</Code>, real credentials — so this is not an
            open broker. But with no <Code>acl_file</Code> configured, Mosquitto
            grants every authenticated user full topic access by default. Any tenant
            can subscribe to the wildcard <Code>#</Code> and receive every other
            tenant's messages.
          </p>
          <p>
            The impact is cross-tenant message disclosure: one authenticated tenant
            reading another's private telemetry, on a broker that looks secured
            because it asks for a password.
          </p>
        </div>
      </section>

      {/* reproduction */}
      <section className="pt-14 sm:pt-16">
        <Label>Reproduction</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            One command — <Code>./run_demo.sh</Code> — stands up the vulnerable
            broker and runs the attack. <Code>tenant_b</Code> publishes a secret to{' '}
            <Code>tenant_b/telemetry</Code>; <Code>tenant_a</Code>, subscribed to{' '}
            <Code>#</Code>, receives it:
          </p>
        </div>
        <Pre>{transcriptVulnerable}</Pre>
        <p className="mt-3 max-w-[34rem] text-[0.875rem] leading-relaxed text-muted">
          Output from the{' '}
          <a href={castUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            recorded run
          </a>
          . <Code>ISOLATION BROKEN</Code> — a tenant just read another tenant's data.
        </p>
      </section>

      {/* the fix */}
      <section className="pt-14 sm:pt-16">
        <Label>The fix</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            The hardened broker is byte-for-byte the same setup plus a single
            directive — an <Code>acl_file</Code>:
          </p>
        </div>
        <pre className="mt-4 overflow-x-auto border border-hairline bg-[#f4f2ec] p-4 font-mono text-[0.8125rem] leading-relaxed">
          {configDiff.map((l) => (
            <div
              key={l.text}
              className={l.sign === '+' ? 'text-ink' : 'text-muted'}
            >
              <span className="select-none text-faint">{l.sign} </span>
              {l.text}
            </div>
          ))}
        </pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>That file is the entire defense. One load-bearing line:</p>
        </div>
        <Pre>{aclLine}</Pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            <Code>%u</Code> expands to the authenticated username at connect time,
            scoping each user to their own subtree — <Code>tenant_a</Code> can only
            touch <Code>tenant_a/#</Code>. ACLs are default-deny, so anything a rule
            doesn't explicitly permit is refused.
          </p>
        </div>
      </section>

      {/* verification */}
      <section className="pt-14 sm:pt-16">
        <Label>Verification</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            The identical attack — same scripts, same credentials, unchanged — runs
            against the hardened broker:
          </p>
        </div>
        <Pre>{transcriptHardened}</Pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Worth being precise about what happens here. The broker doesn't reject
            the <Code>#</Code> subscription — it's still <Code>Granted QoS 1</Code>.
            The default-deny ACL filters <span className="text-ink">delivery</span>:{' '}
            <Code>tenant_a</Code>'s subscription succeeds, but the broker never hands
            it any topic outside <Code>tenant_a/#</Code>, so <Code>tenant_b</Code>'s
            secret is simply never delivered. The eavesdropper captures nothing.
          </p>
          <p>
            The attack's invariance across both runs is the whole point. Nothing
            about the attacker changed — only the broker config — so the config is
            unambiguously the control.
          </p>
        </div>
      </section>

      {/* takeaway */}
      <section className="pt-14 sm:pt-16">
        <Label>Takeaway</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Auth and ACL are one control, not two. Authentication without
            authorization is what leaks here; authorization without authentication
            is meaningless, because <Code>%u</Code> scoping needs an authenticated
            identity to bind to — which is why <Code>allow_anonymous false</Code> is
            load-bearing, not incidental.
          </p>
          <p>
            And wildcard containment lives broker-side. A client can always{' '}
            <span className="text-ink">request</span> <Code>#</Code>; the broker just
            has to refuse to <span className="text-ink">deliver</span> beyond that
            user's rules. Trusting the client to ask nicely was never the control.
          </p>
        </div>
      </section>

      <footer className="pt-16">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <a href={castUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            Recorded demo
          </a>
          <a href="/" className={linkStyle}>
            <span className="nav-arrow">←</span> Back to home
          </a>
        </div>
      </footer>
    </main>
  )
}
