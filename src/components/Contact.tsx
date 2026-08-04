import { LinkRow } from './LinkRow'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id="contact" label="Contact" className="lg:hidden">
      <LinkRow ariaLabel="Contact links" />
    </Section>
  )
}
