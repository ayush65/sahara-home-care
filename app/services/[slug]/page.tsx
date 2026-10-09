import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Phone } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import { CtaBand, Eyebrow, ServiceCard } from '@/components/shared'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { siteConfig } from '@/lib/seo'
import { services, site } from '@/lib/site'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}

  const title = service.title
  const description = service.short
  const url = `${siteConfig.url}/services/${service.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: service.image,
          alt: service.title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [service.image],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = services.findIndex((s) => s.slug === slug)
  if (index === -1) notFound()
  const service = services[index]
  const Icon = service.icon
  const related = services.filter((s) => s.slug !== slug).slice(index % 8, (index % 8) + 3)
  const pageUrl = `${siteConfig.url}/services/${service.slug}`

  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src={service.image}
              alt={`${service.title} provided by Sahara Home Health Care`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal className="flex flex-col gap-6">
            <Link
              href="/services"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand-green"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All services
            </Link>
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-green text-white">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{service.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 font-semibold text-white hover:bg-brand-green-dark"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call to book
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello Sahara Home Health Care, I'd like to know more about ${service.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 font-semibold text-white hover:bg-brand-green-light"
              >
                <WhatsAppIcon className="size-4" />
                Enquire on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Our Services', url: `${siteConfig.url}/services` },
          { name: service.title, url: pageUrl },
        ]}
      />
      <ServiceSchema name={service.title} description={service.description} url={pageUrl} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>What&apos;s included</Eyebrow>
            <h2 className="font-display text-3xl font-semibold">Care tailored to your needs</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <StaggerItem key={item} className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm font-medium">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.1} className="h-fit rounded-3xl bg-brand-green p-7 text-white">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-green-light">Ideal for</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {service.idealFor.map((i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <span className="size-1.5 rounded-full bg-brand-green-light" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/15 pt-5 text-sm text-white/75">{site.hours}</p>
        </Reveal>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold">Related services</h2>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} index={services.indexOf(s)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
