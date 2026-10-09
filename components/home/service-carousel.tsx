'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Slide = {
  id: string
  title: string
  short: string
  image: string
  href: string
}

const AUTOPLAY_MS = 4200

export function ServiceCarousel({
  slides,
  className,
  altPrefix = 'Sahara Home Health Care',
}: {
  slides: Slide[]
  className?: string
  altPrefix?: string
}) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = slides.length

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  )

  // Continuous autoplay. Pauses on hover, focus, hidden tab and reduced motion.
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
      className={cn('group relative overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our services"
    >
      {/* Slides — all stacked, only the active one is visible */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== safeIndex}
            className={cn(
              'absolute inset-0 transition-opacity ease-out',
              reduceMotion ? 'duration-300' : 'duration-[1200ms]',
              i === safeIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Image
              src={s.image}
              alt={`${altPrefix} — ${s.title}`}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : 'lazy'}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                'object-cover transition-transform ease-out',
                reduceMotion ? 'duration-0' : 'duration-[8000ms]',
                i === safeIndex ? 'scale-105' : 'scale-100',
              )}
            />
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="pointer-events-none absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== safeIndex}
            className={cn(
              'absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue-dark/55 to-transparent p-6 transition-opacity ease-out sm:p-7',
              reduceMotion ? 'duration-300' : 'duration-700',
              i === safeIndex ? 'opacity-100' : 'opacity-0',
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-light">
              {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
            <h2 className="mt-1.5 font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
              {s.title}
            </h2>
            <p className="mt-1 line-clamp-2 max-w-sm text-sm leading-relaxed text-white/80">{s.short}</p>
            <Link
              href={s.href}
              tabIndex={i === safeIndex ? 0 : -1}
              className="pointer-events-auto mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              Learn more
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {count > 1 && (
        <>
          <CarouselArrow side="left" onClick={() => go(safeIndex - 1)} label="Previous service" />
          <CarouselArrow side="right" onClick={() => go(safeIndex + 1)} label="Next service" />
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 sm:bottom-4 sm:right-5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === safeIndex}
              className={cn(
                'h-1.5 rounded-full bg-white transition-all duration-300',
                i === safeIndex ? 'w-6' : 'w-1.5 opacity-50 hover:opacity-90',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CarouselArrow({
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
        'absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        side === 'left' ? 'left-3' : 'right-3',
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}