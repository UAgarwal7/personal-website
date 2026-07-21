import { experience } from '../content/site'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <ul className="flex flex-col gap-y-9">
        {experience.map((role) => (
          <li key={role.organization}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-serif text-[1.25rem] leading-snug text-ink">
                {role.organization}
              </h3>
              <span className="text-[0.875rem] text-muted">{role.period}</span>
            </div>

            <p className="mt-1 text-[0.875rem] text-muted">{role.title}</p>

            <ul className="mt-3 flex max-w-[31.25rem] flex-col gap-y-2.5">
              {role.points.map((point) => (
                <li key={point} className="text-[1.0625rem] leading-[1.6] text-body">
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
