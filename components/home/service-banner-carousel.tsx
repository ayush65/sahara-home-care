'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BannerSlide = {
  id: string
  title: string
  short: string
  image: string
  href: string
}

const AUTOPLAY_MS = 4500

/**
 * Wide 16:9 auto-playing photo carousel of every service.
 * Clicking "Learn more" jumps straight to that service section.
 */
export function ServiceBannerCarousel({
  slides,
  className,
  eyebrow = 'Our services',
  altPrefix = 'Sahara Home Health Care',
}: {
  slides: BannerSlide[]
  className?: string
  eyebrow?: string
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

  if (count === 0) return null

  return (
    <div
      className={cn('group relative overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${eyebrow} photo carousel`}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={cn(
            'absolute inset-0 transition-opacity ease-out',
            reduceMotion ? 'duration-300' : 'duration-[1100ms]',
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <Image
            src={s.image}
            alt={`${altPrefix} — ${s.title}`}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              'object-cover transition-transform ease-out',
              reduceMotion ? 'duration-0' : 'duration-[9000ms]',
              i === index ? 'scale-105' : 'scale-100',
            )}
          />
        </div>
      ))}

      {/* Scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-dark/92 via-brand-blue-dark/45 to-brand-blue-dark/10"
        aria-hidden="true"
      />

      {/* Caption */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={cn(
              'w-full p-6 transition-opacity ease-out sm:p-10 lg:p-14',
              reduceMotion ? 'duration-300' : 'duration-700',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-light">
                {eyebrow}
                <span className="h-px w-8 bg-brand-green-light/60" aria-hidden="true" />
                <span className="tabular-nums">
                  {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
              </p>
              <h2 className="mt-2.5 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                {s.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {s.short}
              </p>
              <Link
                href={s.href}
                tabIndex={i === index ? 0 : -1}
                className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              >
                Learn more
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {count > 1 && (
        <>
          <BannerArrow side="left" onClick={() => go(index - 1)} label="Previous service" />
          <BannerArrow side="right" onClick={() => go(index + 1)} label="Next service" />
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === index}
              className={cn(
                'h-1.5 rounded-full bg-white transition-all duration-300',
                i === index ? 'w-7' : 'w-1.5 opacity-50 hover:opacity-90',
              )}
            />
          ))}
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
        'absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        side === 'left' ? 'left-3 sm:left-5' : 'right-3 sm:right-5',
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}