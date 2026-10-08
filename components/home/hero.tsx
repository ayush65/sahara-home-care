'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, Clock, Phone, Star } from 'lucide-react'
import { Eyebrow } from '@/components/shared'
import { useLiteMotion } from '@/components/motion'
import { site } from '@/lib/site'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const lite = useLiteMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', lite ? '0%' : '12%'])

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: lite ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: lite ? 0.4 : 0.8, delay: lite ? 0 : delay, ease },
  })

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <motion.div {...fadeUp(0)}>
            <Eyebrow>Trusted Home Healthcare</Eyebrow>
          </motion.div>
          <motion.h1
            {...fadeUp(0.08)}
            className="text-balance font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Care that feels like <span className="italic text-brand-blue">family</span>,{' '}
            <span className="relative isolate inline-block">
              right at home.
              <span
                className="absolute inset-x-0 bottom-[0.12em] -z-10 h-[0.28em] rounded-full bg-brand-green-light/35"
                aria-hidden="true"
              />
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Trained nurses, caregivers and attendants for elderly people, patients recovering from illness or
            surgery, and anyone who needs help with daily living — available 24/7.
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-7 py-4 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(7,87,185,0.7)] transition-colors hover:bg-brand-blue-dark"
            >
              <Phone className="size-4" aria-hidden="true" />
              Book a free consultation
            </a>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 font-semibold text-foreground transition-colors hover:border-brand-green hover:text-brand-green"
            >
              Explore services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.dl {...fadeUp(0.32)} className="mt-2 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { k: '24/7', v: 'Care available' },
              { k: '11+', v: 'Care services' },
              { k: '100%', v: 'Verified staff' },
            ].map((s) => (
              <div key={s.v} className="flex flex-col gap-1">
                <dt className="sr-only">{s.v}</dt>
                <dd className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl">{s.k}</dd>
                <dd className="text-xs text-muted-foreground sm:text-sm">{s.v}</dd>
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
            <motion.div style={{ y: imageY }} className="absolute inset-0 -bottom-[12%]">
              <Image
                src="/images/hero.png"
                alt="A Sahara home nurse holding the hand of an elderly man in his living room"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
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
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
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
