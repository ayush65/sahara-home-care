import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { EnquireButton } from '@/components/enquiry-modal'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { site, type Service } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={cn('flex max-w-2xl flex-col gap-4', align === 'center' && 'mx-auto items-center text-center')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-dark text-white">
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-green-light/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal className="flex max-w-3xl flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-light">
            <span className="size-1.5 rounded-full bg-brand-green-light" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/80">{description}</p>
        </Reveal>
      </div>
    </section>
  )
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_20px_40px_-20px_rgba(22,119,184,0.35)]">
      <Link
        href={`/services/${service.slug}`}
        aria-label={service.title}
        className="relative block aspect-[16/10] overflow-hidden bg-surface"
      >
        <Image
          src={service.image || '/placeholder.svg'}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-display text-xs font-semibold text-foreground backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Link>
      <div className="relative flex flex-1 flex-col gap-4 p-6 pt-0 sm:p-7 sm:pt-0">
        <span className="-mt-6 flex size-12 items-center justify-center rounded-2xl border-4 border-white bg-brand-blue text-white shadow-sm transition-colors duration-300 group-hover:bg-brand-green">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug text-foreground">
            <Link href={`/services/${service.slug}`} className="transition-colors hover:text-brand-blue">
              {service.title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{service.short}</p>
        </div>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green"
        >
          Learn more
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        <div className="flex gap-2 border-t border-border pt-4">
          <a
            href={site.phoneHref}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call now
          </a>
          <EnquireButton className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light">
            Enquire now
          </EnquireButton>
        </div>
      </div>
    </article>
  )
}

export function CtaBand() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-blue px-6 py-12 text-white sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-brand-green-light/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Need care for a loved one? We&apos;re here, day and night.
            </h2>
            <p className="text-pretty text-white/80">
              Talk to our care coordinator for a free consultation. We&apos;ll help you choose the right caregiver or
              nurse — often within 24 hours.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-brand-blue transition-colors hover:bg-white/90"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call now
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-green-light"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
