import { useEffect, useRef } from 'react'

/**
 * The page's own dot grid, redrawn in the accent and revealed only within a
 * radius of the pointer — the paper registers where your attention is, rather
 * than a light source being laid over it.
 *
 * One fixed layer at z-index -1: above the body's background, beneath every
 * word, so nothing ever renders on top of text. The pointer position is written
 * to custom properties inside a rAF loop and consumed by a mask, so there is no
 * layout and no repaint of the content — only compositing.
 *
 * Deliberately absent on touch devices: there is no pointer to follow, so this
 * is a desktop-only flourish and never the page's only sign of life.
 */

/** Must match the `body.fieldnotes` background-size in index.css. */
const GRID = 22
const RADIUS = 210
const INTENSITY = 0.5
/** How far the reveal lags the cursor. 0 pins it; higher reads as weight. */
const TRAIL = 0.45
/** Below this, the reveal has caught up and the loop can stop. */
const SETTLED = 0.05

export function CursorField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // No pointer, no effect — and nothing to clean up.
    if (!matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    // Honour reduced motion by dropping the easing: the reveal still follows the
    // cursor, it just never trails or glides.
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = still ? 1 : 1 - TRAIL * 0.88

    let x = -9999
    let y = -9999
    let tx = -9999
    let ty = -9999
    let inside = false
    let frame = 0

    const draw = () => {
      el.style.setProperty('--x', `${x}px`)
      el.style.setProperty('--y', `${y}px`)
    }

    const tick = () => {
      x += (tx - x) * ease
      y += (ty - y) * ease
      draw()
      // Idle out once the reveal has caught up, so an untouched tab isn't
      // holding a rAF loop open forever.
      if (Math.abs(tx - x) < SETTLED && Math.abs(ty - y) < SETTLED) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!inside) {
        // Appear where the cursor entered rather than sweeping across the page.
        inside = true
        x = tx
        y = ty
        el.style.opacity = '1'
        draw()
      }
      wake()
    }

    const leave = () => {
      inside = false
      el.style.opacity = '0'
    }

    // The resting grid scrolls with the document while this layer is fixed to
    // the viewport; offsetting by scroll modulo the tile keeps the accent dots
    // sitting exactly on the grey ones instead of drifting between them.
    const align = () => {
      el.style.setProperty('--bgy', `${-(window.scrollY % GRID)}px`)
    }

    align()
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', align, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', align)
      document.removeEventListener('pointerleave', leave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 220ms ease',
        backgroundImage:
          'radial-gradient(var(--color-accent) 0.5px, transparent 0.5px)',
        backgroundSize: `${GRID}px ${GRID}px`,
        backgroundPosition: '0 var(--bgy, 0px)',
        filter: `opacity(${INTENSITY})`,
        maskImage: `radial-gradient(circle ${RADIUS}px at var(--x) var(--y), #000 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${RADIUS}px at var(--x) var(--y), #000 0%, transparent 100%)`,
      }}
    />
  )
}
