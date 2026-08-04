import { experience } from '../content/site'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <ul className="flex flex-col gap-y-9">
        {experience.map((role) => (
          <li key={role.organization} className="notes-entry">
            {/* The date leads in the mono meta voice; the organisation stays the
                serif headline, since that's what a reader scans for. */}
            <p className="notes-meta">{role.period}</p>

            <h3 className="mt-1 font-serif text-[1.25rem] leading-snug text-ink">
              {role.organization}
            </h3>

            <p className="mt-1 text-[0.875rem] text-muted">{role.title}</p>

            <ul className="mt-3 flex max-w-[31.25rem] flex-col gap-y-2.5">
              {role.points.map((point) => (
                <li key={point} className="notes-item">
                  <span className="text-[1.0625rem] leading-[1.6] text-body">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
