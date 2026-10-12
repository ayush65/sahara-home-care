'use client'

import { useEffect } from 'react'
import { useLenis } from '@/components/lenis-provider'

/**
 * Freezes page scrolling while `active`.
 *
 * Why this does NOT simply set `body { overflow: hidden }`:
 *
 * Giving an element `overflow: hidden` makes it a **scroll container**. The
 * site header is `position: sticky`, and sticky resolves against the nearest
 * ancestor scrollport — so the moment body became the scrollport, the header
 * stopped sticking to the viewport and scrolled away with the page. That is why
 * the logo vanished the instant the mobile menu opened.
 *
 * When Lenis is running, `lenis.stop()` is enough: it halts wheel, touch and
 * keyboard scrolling without touching layout-affecting styles, so sticky keeps
 * working. The `overflow` hack is only used as a fallback for when Lenis is
 * absent (reduced-motion users), where we also pin the body so iOS Safari does
 * not rubber-band behind the overlay.
 */
export function ScrollLock({ active }: { active: boolean }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!active) return

    if (lenis) {
      lenis.stop()
      return () => lenis.start()
    }

    const { body } = document
    const scrollY = window.scrollY
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
      // Un-pin without letting the page jump back to the top.
      window.scrollTo(0, scrollY)
    }
  }, [active, lenis])

  return null
}