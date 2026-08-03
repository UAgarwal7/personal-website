import { classMetrics, type ClassMetric } from '../content/dashcam'

// AP runs 0–1, but nothing here exceeds ~0.78, so an 0.8 domain fills the plot.
const DOMAIN = 0.8
const TICKS = [0, 0.2, 0.4, 0.6, 0.8]

const pct = (v: number) => `${(v / DOMAIN) * 100}%`

function Row({ m }: { m: ClassMetric }) {
  const delta = m.finetuned - m.baseline
  const lo = Math.min(m.baseline, m.finetuned)
  const hi = Math.max(m.baseline, m.finetuned)
  const deltaLabel = `${delta >= 0 ? '+' : '−'}${Math.abs(delta).toFixed(3)}`

  return (
    <div className="group relative flex items-center py-1.5">
      <div className="w-28 shrink-0 pr-3 text-right text-[0.8125rem] leading-tight text-muted">
        {m.name}
      </div>

      <div className="relative h-4 grow">
        {/* connector between the two states */}
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-faint/60"
          style={{ left: pct(lo), width: pct(hi - lo) }}
        />
        {/* baseline: hollow */}
        <span
          className="absolute top-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-faint bg-paper"
          style={{ left: pct(m.baseline) }}
        />
        {/* fine-tuned: solid ink */}
        <span
          className="absolute top-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          style={{ left: pct(m.finetuned) }}
        />
      </div>

      {/* hover tooltip */}
      <div
        role="tooltip"
        className="pointer-events-none absolute -top-1 left-28 z-10 ml-2 hidden -translate-y-full whitespace-nowrap border border-hairline bg-paper px-3 py-2 text-[0.75rem] leading-relaxed text-body shadow-sm group-hover:block"
      >
        <span className="font-medium text-ink">{m.name}</span>
        {m.lowSupport ? (
          <span className="text-faint"> · {m.instances} instances</span>
        ) : (
          <span className="text-faint"> · {m.instances.toLocaleString()} instances</span>
        )}
        <br />
        baseline {m.baseline.toFixed(3)} → fine-tuned {m.finetuned.toFixed(3)}{' '}
        <span className={delta >= 0 ? 'text-ink' : 'text-body'}>({deltaLabel})</span>
      </div>
    </div>
  )
}

export function MetricsDumbbell() {
  return (
    <figure className="mt-6">
      {/* legend */}
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.8125rem] text-muted">
        <span className="flex items-center gap-2">
          <span className="size-[11px] rounded-full border border-faint bg-paper" />
          COCO baseline
        </span>
        <span className="flex items-center gap-2">
          <span className="size-[11px] rounded-full bg-ink" />
          Fine-tuned
        </span>
      </figcaption>

      <div className="flex flex-col">
        {classMetrics.map((m) => (
          <Row key={m.name} m={m} />
        ))}
      </div>

      {/* x-axis */}
      <div className="relative mt-2 flex items-center">
        <div className="w-28 shrink-0" />
        <div className="relative h-5 grow">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute top-0 -translate-x-1/2 text-[0.6875rem] text-faint"
              style={{ left: pct(t) }}
            >
              {t.toFixed(1)}
            </span>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="w-28 shrink-0" />
        <div className="grow text-[0.6875rem] tracking-wide text-faint">AP@0.5</div>
      </div>
    </figure>
  )
}
