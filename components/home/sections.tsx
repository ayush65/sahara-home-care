import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, HeartHandshake, Quote, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading, ServiceCard } from '@/components/shared'
import { careHighlights, services } from '@/lib/site'

export function HighlightsStrip() {
  const items = [...careHighlights, ...careHighlights]
  return (
    <section aria-label="Care we provide" className="overflow-hidden border-y border-border bg-surface py-5">
      <ul className="flex w-max animate-marquee items-center gap-10 pr-10">
        {items.map((h, i) => (
          <li key={`${h}-${i}`} className="flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-foreground/75">
            <span className="size-2 rounded-full bg-brand-green" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AboutPreview() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <Reveal className="relative order-2 lg:order-1">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/team.png"
            alt="The Sahara Home Health Care team of nurses and caregivers"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -right-2 -top-6 rounded-2xl bg-brand-green px-5 py-4 text-white shadow-lg sm:-right-6">
          <p className="font-display text-3xl font-semibold">24/7</p>
          <p className="text-xs font-medium text-white/85">Live-in & shift care</p>
        </div>
      </Reveal>
      <div className="order-1 flex flex-col gap-6 lg:order-2">
        <SectionHeading
          eyebrow="About Sahara"
          title="Compassionate, professional & reliable care."
          description="Sahara Home Health Care is a trusted home healthcare service dedicated to providing compassionate, professional and reliable care in the comfort of your home."
        />
        <Reveal delay={0.1}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {careHighlights.slice(0, 6).map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm font-medium">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="/about"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            More about us
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export function ServicesPreview() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our services"
            title="Complete home healthcare, under one roof."
            description="From skilled nursing to everyday companionship — choose the support your family needs."
          />
          <Reveal>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue"
            >
              View all services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Verified professionals',
    body: 'Every nurse and caregiver is background-checked, trained and supervised.',
  },
  {
    icon: HeartHandshake,
    title: 'Care with dignity',
    body: 'We treat every patient with the warmth and respect we’d give our own family.',
  },
  {
    icon: Sparkles,
    title: 'Personalised plans',
    body: 'Care plans tailored to medical needs, routines and family preferences.',
  },
  {
    icon: Users,
    title: 'Family kept in the loop',
    body: 'Regular updates and a dedicated coordinator you can always reach.',
  },
]

export function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow="Why families choose us"
        title="Peace of mind for you. Comfort for them."
        align="center"
      />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <StaggerItem key={r.title} className="flex flex-col gap-4 rounded-3xl bg-surface p-7">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-green shadow-sm">
              <r.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold">{r.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

const steps = [
  { title: 'Tell us your needs', body: 'Call or message us. A care coordinator understands the patient’s condition.' },
  { title: 'Get a care plan', body: 'We recommend the right nurse, caregiver or service and share a clear plan.' },
  { title: 'Care begins at home', body: 'Your matched professional arrives — often within 24 hours.' },
  { title: 'Ongoing support', body: 'We monitor, review and adjust care as your loved one recovers.' },
]

export function Process() {
  return (
    <section className="bg-brand-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-light">How it works</span>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Getting care is simple.
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="flex flex-col gap-4 bg-brand-blue-dark p-7">
              <span className="font-display text-5xl font-semibold text-brand-green-light">0{i + 1}</span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote:
      'After my father’s surgery, the Sahara nurse cared for him like her own. His recovery at home was faster and far more comfortable.',
    name: 'Ritika S.',
    role: 'Daughter of patient',
  },
  {
    quote:
      'Living abroad, I worried constantly about my mother. Their caregiver and daily updates gave our family real peace of mind.',
    name: 'Arjun M.',
    role: 'Son, living overseas',
  },
  {
    quote:
      'The physiotherapist was patient and encouraging. Within weeks, my husband was walking confidently again after his knee replacement.',
    name: 'Meena K.',
    role: 'Wife of patient',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading eyebrow="Stories" title="Words from the families we care for." />
      <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-border p-7">
              <Quote className="size-8 text-brand-green" aria-hidden="true" />
              <blockquote className="flex-1 text-pretty font-display text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
