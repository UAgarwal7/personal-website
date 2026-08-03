import { classMetrics, headline } from '../content/dashcam'

const num = 'text-right tabular-nums'

export function MetricsTable() {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[30rem] border-collapse text-[0.875rem]">
        <thead>
          <tr className="border-b border-hairline text-left text-[0.75rem] uppercase tracking-wider text-faint">
            <th className="py-2 pr-4 font-medium">Class</th>
            <th className="py-2 pr-4 text-right font-medium">Baseline</th>
            <th className="py-2 pr-4 text-right font-medium">Fine-tuned</th>
            <th className="py-2 pr-4 text-right font-medium">Δ</th>
            <th className="py-2 text-right font-medium">Instances</th>
          </tr>
        </thead>
        <tbody>
          {classMetrics.map((m) => {
            const delta = m.finetuned - m.baseline
            return (
              <tr key={m.name} className="border-b border-hairline/60">
                <td className="py-2 pr-4 text-body">
                  {m.name}
                  {m.lowSupport ? <span className="text-faint"> †</span> : null}
                </td>
                <td className={`${num} py-2 pr-4 text-muted`}>
                  {m.baseline.toFixed(3)}
                </td>
                <td className={`${num} py-2 pr-4 text-ink`}>
                  {m.finetuned.toFixed(3)}
                </td>
                <td className={`${num} py-2 pr-4 ${delta >= 0 ? 'text-body' : 'text-faint'}`}>
                  {delta >= 0 ? '+' : '−'}
                  {Math.abs(delta).toFixed(3)}
                </td>
                <td className={`${num} py-2 text-muted`}>
                  {m.instances.toLocaleString()}
                </td>
              </tr>
            )
          })}
          <tr className="border-t-2 border-ink/20 font-medium">
            <td className="py-2 pr-4 text-ink">mAP@0.5</td>
            <td className={`${num} py-2 pr-4 text-muted`}>
              {headline.before.toFixed(3)}
            </td>
            <td className={`${num} py-2 pr-4 text-ink`}>
              {headline.after.toFixed(3)}
            </td>
            <td className={`${num} py-2 pr-4 text-body`}>
              +{(headline.after - headline.before).toFixed(3)}
            </td>
            <td className="py-2" />
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-faint">
        † Low instance support — these APs carry wide error bars. train has a
        single instance in the subset, so its −0.500 is one missed box, not a
        real regression; excluding it, mAP@0.5 goes 0.333 → 0.583.
      </p>
    </div>
  )
}
