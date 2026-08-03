import { gallery, headline, repoUrl } from '../content/dashcam'
import { MetricsDumbbell } from './MetricsDumbbell'
import { MetricsTable } from './MetricsTable'

const linkStyle =
  'text-muted underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink'

function Label({ children }: { children: string }) {
  return <h2 className="label">{children}</h2>
}

export function DashcamPage() {
  return (
    <main className="mx-auto w-full max-w-[44rem] px-6 pb-24 sm:px-10">
      {/* back to home */}
      <nav className="pt-10 sm:pt-14">
        <a href="/" className={`text-[0.875rem] ${linkStyle}`}>
          ← Utsav Agarwal
        </a>
      </nav>

      {/* header */}
      <header className="pt-10 sm:pt-14">
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          dashcam-perception
        </h1>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-body">
          Fine-tuning YOLOv8 for dashcam perception on BDD100K — and building the
          evaluation framework to prove, class by class, that it worked.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <span className="text-faint">Python · PyTorch · YOLOv8</span>
        </div>
      </header>

      {/* problem */}
      <section className="pt-14 sm:pt-16">
        <Label>The problem</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            A YOLOv8 model pretrained on COCO already knows car, person, and bus.
            But a dashcam has to read the road, and two of the classes that matter
            most — <span className="text-ink">traffic sign</span> and{' '}
            <span className="text-ink">rider</span> — have no COCO equivalent at
            all. The pretrained model scores exactly zero on them, not because it
            is bad, but because it was never taught they exist.
          </p>
          <p>
            Traffic lights are worse than nothing: COCO has them, so the model is
            confident, but at driving distances it detects them poorly. A detector
            that misses signs and misreads lights is not much use on a road.
          </p>
        </div>
      </section>

      {/* approach */}
      <section className="pt-14 sm:pt-16">
        <Label>Approach</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            Fine-tune YOLOv8m on 70,000 BDD100K images across its 10-class
            detection set, then measure the gain honestly. The measurement was the
            harder half: I wrote an AP@0.5 evaluator from scratch — IoU matching,
            per-class precision/recall, VOC all-point interpolation — so the COCO
            baseline and the fine-tuned model are scored through identical code on
            the same images. The delta that produces is the claim I actually trust.
          </p>
        </div>
      </section>

      {/* results */}
      <section className="pt-14 sm:pt-16">
        <Label>Results</Label>
        <div className="mt-6">
          <p className="font-serif text-[2rem] leading-tight tracking-[-0.01em] text-ink sm:text-[2.5rem]">
            {headline.before.toFixed(3)} → {headline.after.toFixed(3)}
          </p>
          <p className="mt-1 text-[0.9375rem] text-muted">
            {headline.relative} mAP@0.5 over the COCO baseline
          </p>
        </div>

        <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-body">
          The two classes COCO cannot see go from nothing to 0.66 and 0.36, and the
          largest gains land exactly where a dashcam needs them — signs, lights, and
          riders. Every class but one improves.
        </p>

        <MetricsDumbbell />
        <MetricsTable />
      </section>

      {/* gallery */}
      <section className="pt-14 sm:pt-16">
        <Label>Predictions vs. ground truth</Label>
        <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-body">
          <span className="text-[#16a34a]">Green</span> is the ground truth,{' '}
          <span className="text-[#dc2626]">red</span> is the fine-tuned model —
          including a case where it falls short.
        </p>
        <div className="mt-8 space-y-10">
          {gallery.map((g) => (
            <figure key={g.src}>
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full border border-hairline"
              />
              <figcaption className="mt-3 max-w-[36rem] text-[0.875rem] leading-relaxed text-muted">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* engineering notes */}
      <section className="pt-14 sm:pt-16">
        <Label>Engineering notes</Label>
        <div className="mt-6 max-w-[34rem] space-y-4 text-[1.0625rem] leading-[1.65] text-body">
          <p>
            <span className="text-ink">The evaluator is the point.</span> Reading
            mAP off the trainer would have measured the fine-tuned model against
            itself. Writing the metric by hand meant the baseline and the fine-tune
            were graded the same way, which is the only reason the before/after is
            trustworthy.
          </p>
          <p>
            <span className="text-ink">Baseline remapping.</span> To grade a COCO
            model against BDD labels at all, its predictions are mapped onto BDD's
            10 classes and out-of-vocabulary detections dropped — otherwise the
            comparison would be apples to oranges.
          </p>
          <p>
            <span className="text-ink">Trained on an M-series Mac.</span> Batch
            size and image resolution were tuned to fit unified-memory limits
            (batch 32, imgsz 416) rather than a datacenter GPU's headroom.
          </p>
          <p>
            <span className="text-ink">The bug that cost the most.</span> An early
            run trained on silently mismatched image/label paths and learned
            nothing useful. Fixing the data plumbing — not the model — was what
            unlocked the result.
          </p>
        </div>
      </section>

      {/* footer */}
      <footer className="pt-16">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className={linkStyle}>
            GitHub repo
          </a>
          <a href="/" className={linkStyle}>
            ← Back to home
          </a>
        </div>
      </footer>
    </main>
  )
}
