import {
  castUrl,
  imdsLine,
  metadataDiff,
  repoUrl,
  transcriptCreds,
  transcriptHardened,
  transcriptPrivesc,
} from '../content/mirage'

const linkStyle =
  'text-muted underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink'

function Label({ children }: { children: string }) {
  return <h2 className="label">{children}</h2>
}

/** Inline monospace token, e.g. an endpoint or IAM action. */
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

export function MiragePage() {
  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-24 sm:px-10">
      <nav className="pt-10 sm:pt-14">
        <a href="/" className={`text-[0.875rem] ${linkStyle}`}>
          <span className="nav-arrow">←</span> Utsav Agarwal
        </a>
      </nav>

      <header className="pt-10 sm:pt-14">
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          Metadata Mirage
        </h1>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-body">
          An intentionally vulnerable AWS lab that chains a web-app SSRF into
          instance-credential theft and a single-API-call privilege escalation to
          administrator — and the one instance-metadata flag (enforcing IMDSv2)
          that severs the entire chain. Reproducible end to end with Terraform.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <a href={castUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            Recorded demo
          </a>
          <span className="text-faint">AWS · IAM · Terraform · cloud security</span>
        </div>
      </header>

      {/* threat model */}
      <section className="pt-14 sm:pt-16">
        <Label>Threat model</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            A single <code className="font-mono text-[0.9em]">t3.micro</code> runs
            a Flask app with a naive link-preview endpoint —{' '}
            <Code>/fetch?url=</Code> — that issues a server-side <Code>GET</Code>{' '}
            to any URL it is handed, with no allow-list. The instance role looks
            like an ordinary app role, and the box still accepts IMDSv1. The trust
            assumption is that an app bug stays an app bug: a request forgery
            should not become an account takeover.
          </p>
        </div>
      </section>

      {/* the vulnerability */}
      <section className="pt-14 sm:pt-16">
        <Label>The vulnerability</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Three misconfigurations line up. The fetch endpoint is a
            textbook <span className="text-ink">SSRF</span>: it will reach the
            link-local metadata address <Code>169.254.169.254</Code> on the
            attacker's behalf. Because IMDSv1 is allowed (<Code>http_tokens = "optional"</Code>),
            a bare <Code>GET</Code> to that address returns the instance role's
            temporary credentials — no session token required.
          </p>
          <p>
            And the role that looks scoped isn't. Alongside some benign S3 reads it
            holds <Code>iam:CreatePolicyVersion</Code> and{' '}
            <Code>iam:SetDefaultPolicyVersion</Code> on the very policy attached to
            it. That is one self-referential permission too many: the role can
            rewrite its own grants. The impact is full-account compromise reached
            from an unauthenticated web request.
          </p>
        </div>
      </section>

      {/* reproduction */}
      <section className="pt-14 sm:pt-16">
        <Label>Reproduction</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Two commands — <Code>make deploy</Code> then <Code>make attack</Code> —
            stand up the vulnerable lab and run the full chain. The SSRF reads the
            role name, then the credentials one path deeper;{' '}
            <Code>sts get-caller-identity</Code> confirms the pivot:
          </p>
        </div>
        <Pre>{transcriptCreds}</Pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Acting as the role, the natural next move is to read the attached
            policy — and that is <span className="text-ink">denied</span>. The role
            is scoped so tightly it cannot even enumerate its own permissions. It
            doesn't matter: writing a new policy version needs no read, so the
            escalation goes ahead <span className="text-ink">blind</span>. One call
            publishes an <Code>Action: "*"</Code> document as the new default, and
            the <Code>iam list-users</Code> that was denied moments earlier now
            succeeds:
          </p>
        </div>
        <Pre>{transcriptPrivesc}</Pre>
        <p className="mt-3 max-w-[34rem] text-[0.875rem] leading-relaxed text-muted">
          Output from the{' '}
          <a href={castUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            recorded run
          </a>
          . A scoped app role became an administrator via one SSRF and one IAM call.
        </p>
      </section>

      {/* the fix */}
      <section className="pt-14 sm:pt-16">
        <Label>The fix</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            <Code>make harden</Code> flips one metadata flag as an in-place update —
            the box is not rebuilt:
          </p>
        </div>
        <pre className="mt-4 overflow-x-auto border border-hairline bg-[#f4f2ec] p-4 font-mono text-[0.8125rem] leading-relaxed">
          {metadataDiff.map((l) => (
            <div
              key={l.text}
              className={
                l.sign === '+'
                  ? 'text-ink'
                  : l.sign === '-'
                    ? 'text-faint line-through'
                    : 'text-muted'
              }
            >
              <span className="select-none text-faint">{l.sign} </span>
              {l.text}
            </div>
          ))}
        </pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>That single line is the entire defense:</p>
        </div>
        <Pre>{imdsLine}</Pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            IMDSv2 is session-oriented: a client must first <Code>PUT</Code> to
            obtain a token and then present it on the <Code>GET</Code>. A basic SSRF
            can only issue the <Code>GET</Code>, so the credential read fails — and
            with no credentials there is no pivot, no enumeration, and no privesc.
          </p>
        </div>
      </section>

      {/* verification */}
      <section className="pt-14 sm:pt-16">
        <Label>Verification</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            The identical attack — same script, unchanged — runs against the
            hardened instance:
          </p>
        </div>
        <Pre>{transcriptHardened}</Pre>
        <div className="mt-5 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Worth being precise about what IMDSv2 does and doesn't fix. The
            over-broad role and the unfiltered fetch are both still present — the
            harden step touches neither. What changes is that the chain never
            reaches them: the plain <Code>GET</Code> to the metadata endpoint is
            rejected, so step two returns nothing and the attack dies at credential
            theft.
          </p>
          <p>
            The attack's invariance across both runs is the whole point. Nothing
            about the attacker changed — only one metadata flag — so that flag is
            unambiguously the control.
          </p>
        </div>
      </section>

      {/* takeaway */}
      <section className="pt-14 sm:pt-16">
        <Label>Takeaway</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            A role that cannot even read its own permissions is still one write away
            from admin. The escalation only works because{' '}
            <Code>CreatePolicyVersion</Code> targets a{' '}
            <span className="text-ink">customer-managed</span> policy attached to
            the caller — AWS-managed policies can't be versioned, which is why the
            realistic misconfiguration is a narrow, self-referential grant that
            reads like a benign app role until you look closely.
          </p>
          <p>
            The root cause is the same one the{' '}
            <a href="/mqtt" className={linkStyle}>
              MQTT lab
            </a>{' '}
            demonstrates: broken access control — an authorization boundary assumed
            rather than enforced. There it's a topic ACL that was never written;
            here it's an IAM policy that grants one permission too many. Least
            privilege is the same control in both, and the exploitable gap is almost
            never the exotic vulnerability — it's the boundary nobody scoped.
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
