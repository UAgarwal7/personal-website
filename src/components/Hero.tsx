import { profile } from '../content/site'
import { LinkRow } from './LinkRow'

export function Hero() {
  return (
    <header className="pt-12 pb-10 sm:pt-20 sm:pb-14">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-[0.9375rem] font-medium text-ink">{profile.name}</span>
        <span className="text-[0.9375rem] text-muted">{profile.roleTag}</span>
      </div>

      <h1 className="mt-12 max-w-[34rem] font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:mt-16 sm:text-[2.625rem]">
        {profile.headline}
      </h1>

      <p className="mt-7 max-w-[31.25rem] text-[1.0625rem] leading-[1.65] text-body">
        {profile.intro}
      </p>

      <div className="mt-8">
        <LinkRow ariaLabel="Profiles" />
      </div>
    </header>
  )
}
