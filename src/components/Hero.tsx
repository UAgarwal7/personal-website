import { profile } from '../content/site'
import { LinkRow } from './LinkRow'

export function Hero() {
  return (
    <header className="pt-16 pb-12 sm:pt-28 sm:pb-16">
      {/* With the headline gone, the name is the only display type on the page
          above the project titles — so it carries the weight the headline did. */}
      <h1 className="font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.375rem]">
        {profile.name}
      </h1>

      <p className="mt-3 max-w-[31.25rem] text-[1.0625rem] leading-[1.5] text-muted">
        {profile.roleTag}
      </p>

      <div className="mt-7">
        <LinkRow ariaLabel="Profiles" />
      </div>
    </header>
  )
}
