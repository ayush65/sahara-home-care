'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Clock, Phone, Star } from 'lucide-react'
import { Eyebrow } from '@/components/shared'
import { useLiteMotion } from '@/components/motion'
import { ServiceCarousel } from '@/components/home/service-carousel'
import { services, site } from '@/lib/site'

const ease = [0.22, 1, 0.36, 1] as const

const carouselSlides = services.map((s) => ({
  id: s.slug,
  title: s.title,
  short: s.short,
  image: s.image,
  href: `/services/${s.slug}`,
}))

export function Hero() {
  const lite = useLiteMotion()

  /**
   * The <h1> is the LCP element. Animating it from `opacity: 0` delays the
   * paint that LCP measures, so it now animates `y` only. Everything below the
   * fold of the fold keeps the fade, where it costs nothing.
   */
  const rise = (delay: number) => ({
    initial: { y: lite ? 0 : 20 },
    animate: { y: 0 },
    transition: { duration: lite ? 0.3 : 0.7, delay: lite ? 0 : delay, ease },
  })

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: lite ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: lite ? 0.3 : 0.7, delay: lite ? 0 : delay, ease },
  })

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <motion.div {...fade(0)}>
            <Eyebrow>Trusted Home Healthcare</Eyebrow>
          </motion.div>
          <motion.h1
            {...rise(0.05)}
            className="text-balance font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Care that feels like <span className="text-brand-green">family</span>,{' '}
            <span className="relative isolate inline-block">
              right at home.
              <span
                className="absolute inset-x-0 bottom-[0.12em] -z-10 h-[0.28em] rounded-full bg-brand-green-light/35"
                aria-hidden="true"
              />
            </span>
          </motion.h1>
          <motion.p
            {...fade(0.14)}
            className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Trained nurses, caregivers and attendants for elderly people, patients recovering from illness or
            surgery, and anyone who needs help with daily living — available 24/7.
          </motion.p>
          <motion.div {...fade(0.22)} className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-4 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(18,165,42,0.7)] transition-colors hover:bg-brand-green-dark"
            >
              <Phone className="size-4" aria-hidden="true" />
              Book a free consultation
            </a>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 font-semibold text-foreground transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
            >
              Explore services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.dl {...fade(0.3)} className="mt-2 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { k: '24/7', v: 'Care available' },
              { k: '11+', v: 'Care services' },
              { k: '100%', v: 'Verified staff' },
            ].map((s) => (
              <div key={s.v} className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground sm:text-sm">{s.v}</dt>
                <dd className="font-display text-2xl font-semibold text-brand-green sm:text-3xl">{s.k}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: lite ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: lite ? 0.4 : 1, ease }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <ServiceCarousel slides={carouselSlides} className="size-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: lite ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: lite ? 0.1 : 0.6, ease }}
            className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-xl sm:left-6"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-green text-white">
              <BadgeCheck className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">Trained & verified</p>
              <p className="text-xs text-muted-foreground">Background-checked caregivers</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: lite ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: lite ? 0.1 : 0.75, ease }}
            className="absolute right-4 top-4 hidden items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 shadow-lg backdrop-blur sm:flex"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <Clock className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex gap-0.5 text-brand-green" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-xs font-medium">Round-the-clock support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
