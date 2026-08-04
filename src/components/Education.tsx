import { education, skills } from '../content/site'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" label="Education">
      <div className="notes-entry">
        <p className="notes-meta">{education.graduation}</p>

        <h3 className="mt-1 font-serif text-[1.25rem] leading-snug text-ink">
          {education.school}
        </h3>

        <p className="mt-1 text-[0.875rem] text-muted">
          {education.degree} · GPA {education.gpa}
        </p>

        <p className="notes-item mt-3 max-w-[31.25rem]">
          <span className="text-[1.0625rem] leading-[1.6] text-body">
            Relevant coursework: {education.coursework.join(', ').toLowerCase()}.
          </span>
        </p>
      </div>

      {/* Skills read as a key/value table in the meta voice — the group name is
          the key, so it takes the mono treatment and the items stay body copy. */}
      <div className="mt-9 flex flex-col gap-y-4">
        {skills.map((group) => (
          <div key={group.group} className="flex flex-wrap items-baseline gap-x-3">
            <span className="notes-meta w-[8.5rem] shrink-0">{group.group}</span>
            <span className="text-[0.9375rem] text-body">
              {group.items.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}
