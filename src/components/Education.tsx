import { education, skills } from '../content/site'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" label="Education">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-serif text-[1.25rem] leading-snug text-ink">
          {education.school}
        </h3>
        <span className="text-[0.875rem] text-muted">{education.graduation}</span>
      </div>

      <p className="mt-1 text-[0.875rem] text-muted">
        {education.degree} · GPA {education.gpa}
      </p>

      <p className="mt-3 max-w-[31.25rem] text-[1.0625rem] leading-[1.6] text-body">
        Relevant coursework: {education.coursework.join(', ').toLowerCase()}.
      </p>

      <div className="mt-9 flex flex-col gap-y-4">
        {skills.map((group) => (
          <div key={group.group} className="flex flex-wrap items-baseline gap-x-3">
            <span className="w-[8.5rem] shrink-0 text-[0.875rem] text-muted">
              {group.group}
            </span>
            <span className="text-[0.9375rem] text-body">
              {group.items.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}
