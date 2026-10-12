'use client'

import { useEffect } from 'react'
import { useLenis } from '@/components/lenis-provider'

/**
 * Freezes page scrolling while `active`.
 *
 * Setting `body { overflow: hidden }` is not enough: Lenis drives the scroll
 * position itself and keeps running, so the page still scrolls behind the
 * overlay. We stop the Lenis instance and, as a fallback for when smooth
 * scrolling is disabled, lock the body too.
 */
export function ScrollLock({ active }: { active: boolean }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!active) return

    lenis?.stop()

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    // Compensate for the removed scrollbar to stop the layout shifting.
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      lenis?.start()
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [active, lenis])

  return null
}