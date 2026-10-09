'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BannerSlide = {
  id: string
  title: string
  image: string
  href: string
}

const AUTOPLAY_MS = 5000

/**
 * Wide 16:9 auto-playing carousel of pre-designed service creatives.
 *
 * The artwork in each slide already carries its own headline, service list and
 * contact details, so this carousel deliberately renders **no** overlay text —
 * only arrows, dots and a full-slide link to the matching service section.
 */
export function ServiceBannerCarousel({
  slides,
  className,
  frameClassName,
}: {
  slides: BannerSlide[]
  className?: string
  frameClassName?: string
}) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = slides.length

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  )

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [count, paused, reduceMotion])

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Guard against the slide list shrinking (HMR, config change) while mounted.
  const safeIndex = count > 0 ? Math.min(index, count - 1) : 0

  useEffect(() => {
    if (index > count - 1) setIndex(Math.max(0, count - 1))
  }, [count, index])

  if (count === 0) return null

  return (
    <div
      className={cn('group', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Service highlights"
    >
      {/* Frame */}
      <div
        className={cn(
          'relative overflow-hidden rounded-[1.5rem] bg-brand-green-dark shadow-[0_30px_60px_-30px_rgba(18,165,42,0.45)] sm:rounded-[2rem]',
          frameClassName ?? 'aspect-[4/3] sm:aspect-[16/9]',
        )}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== safeIndex}
            className={cn(
              'absolute inset-0 transition-opacity ease-out',
              reduceMotion ? 'duration-300' : 'duration-[900ms]',
              i === safeIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Link
              href={s.href}
              tabIndex={i === safeIndex ? 0 : -1}
              aria-label={`Learn more about ${s.title}`}
              className="absolute inset-0 block focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
            >
              <Image
                src={s.image}
                alt={`${s.title} — Sahara Home Health Care`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </Link>
          </div>
        ))}

        {/* Arrows — kept small and tucked into the edges so the artwork stays readable */}
        {count > 1 && (
          <>
            <BannerArrow side="left" onClick={() => go(safeIndex - 1)} label="Previous highlight" />
            <BannerArrow side="right" onClick={() => go(safeIndex + 1)} label="Next highlight" />
          </>
        )}
      </div>

      {/* Dots + caption live below the artwork so nothing covers the design */}
      {count > 1 && (
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{slides[safeIndex].title}</span>
            <span className="mx-2 text-border">|</span>
            Tap the image or use the arrows to explore
          </p>
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${s.title}`}
                aria-current={i === safeIndex}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === safeIndex ? 'w-8 bg-brand-green' : 'w-2 bg-border hover:bg-brand-green/40',
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BannerArrow({
  side,
  onClick,
  label,
}: {
  side: 'left' | 'right'
  onClick: () => void
  label: string
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'absolute top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-green shadow-md backdrop-blur transition hover:bg-white hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green sm:size-11',
        side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4',
      )}
    >
      <Icon className="size-4 sm:size-5" aria-hidden="true" />
    </button>
  )
}