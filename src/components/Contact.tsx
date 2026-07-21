import { LinkRow } from './LinkRow'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <p className="max-w-[31.25rem] text-[1.0625rem] leading-[1.6] text-body">
        I’m looking for summer 2027 internships in security, machine learning, or
        systems. The fastest way to reach me is email.
      </p>

      <div className="mt-6">
        <LinkRow ariaLabel="Contact links" />
      </div>
    </Section>
  )
}
