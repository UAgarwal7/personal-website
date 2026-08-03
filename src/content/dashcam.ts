/**
 * Content for the dashcam deep-dive page, kept as typed data separate from the
 * components that render it.
 *
 * Numbers come from a from-scratch AP@0.5 evaluation over a fixed 500-image
 * BDD100K validation subset (imgsz=640, conf=0.001), with the COCO baseline
 * remapped to BDD's label set so both models are scored through identical code.
 * The delta is the apples-to-apples claim.
 */

export type ClassMetric = {
  name: string
  baseline: number
  finetuned: number
  /** Ground-truth instances of this class in the eval subset. */
  instances: number
  /** True where instance support is too low for the AP to be trustworthy. */
  lowSupport?: boolean
}

export const headline = {
  before: 0.35,
  after: 0.524,
  relative: '+49.7%',
}

/** Sorted by improvement, so the page reads best-to-worst top to bottom. */
export const classMetrics: ClassMetric[] = [
  { name: 'traffic sign', baseline: 0.0, finetuned: 0.66, instances: 1873 },
  { name: 'traffic light', baseline: 0.239, finetuned: 0.628, instances: 1339 },
  { name: 'rider', baseline: 0.0, finetuned: 0.358, instances: 37, lowSupport: true },
  { name: 'truck', baseline: 0.458, finetuned: 0.631, instances: 207 },
  { name: 'car', baseline: 0.612, finetuned: 0.781, instances: 5300 },
  { name: 'bus', baseline: 0.488, finetuned: 0.651, instances: 84 },
  { name: 'bicycle', baseline: 0.292, finetuned: 0.417, instances: 57, lowSupport: true },
  { name: 'person', baseline: 0.516, finetuned: 0.627, instances: 760 },
  { name: 'motorcycle', baseline: 0.395, finetuned: 0.491, instances: 18, lowSupport: true },
  { name: 'train', baseline: 0.5, finetuned: 0.0, instances: 1, lowSupport: true },
]

export type GalleryItem = {
  src: string
  alt: string
  caption: string
}

/** Green = ground truth, red = the fine-tuned model's predictions. */
export const gallery: GalleryItem[] = [
  {
    src: '/dashcam/gallery-day.jpg',
    alt: 'Dense daytime intersection with ground-truth and predicted boxes side by side',
    caption:
      'A dense daytime intersection — 35 labelled objects, and the model recovers the cars, signs, and lights that a COCO detector would have left blank.',
  },
  {
    src: '/dashcam/gallery-night.jpg',
    alt: 'Night driving scene with ground-truth and predicted boxes side by side',
    caption:
      'Night, the hard case. It catches the lit signs and distant lights but misses the dark car on the left — the kind of failure low light actually produces.',
  },
  {
    src: '/dashcam/gallery-failure.jpg',
    alt: 'Highway scene where the model misses several small distant objects',
    caption:
      'A failure case, included on purpose. Only ~37% of the labelled objects are found here; small and distant boxes are where the model still falls short.',
  },
]

export const repoUrl = 'https://github.com/UAgarwal7/dashcam-perception'
