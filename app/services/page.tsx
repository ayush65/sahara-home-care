import type { Metadata } from 'next'
import Image from 'next/image'
import { Stagger, StaggerItem, Reveal } from '@/components/motion'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import { CtaBand, PageHero, SectionHeading, ServiceCard } from '@/components/shared'
import { siteConfig } from '@/lib/seo'
import { services } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Home nursing, caregivers, elderly care, doctor-on-call, physiotherapy, baby & postnatal care, medical equipment, palliative, dementia and critical care at home.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Our Services | Sahara Home Health Care',
    description:
      'Complete home healthcare under one roof — from skilled nursing to everyday companionship.',
    url: `${siteConfig.url}/services`,
    type: 'website',
  },
  twitter: {
    title: 'Our Services | Sahara Home Health Care',
    description:
      'Complete home healthcare under one roof — from skilled nursing to everyday companionship.',
  },
}

const featured = [
  { image: '/images/physio.png', title: 'Physiotherapy at home', alt: 'Physiotherapist helping a patient exercise at home' },
  { image: '/images/postnatal.png', title: 'Baby & postnatal care', alt: 'Caregiver helping a new mother with her baby' },
  { image: '/images/critical.png', title: 'Critical care at home', alt: 'Nurse monitoring a patient in a home ICU setup' },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our home healthcare services"
        title={
          <>
            Every kind of care, <span className="text-brand-green-light">at your doorstep.</span>
          </>
        }
        description="From 24/7 nursing and caregivers to physiotherapy, doctor visits and critical care — explore the services that help your loved ones heal and thrive at home."
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Our Services', url: `${siteConfig.url}/services` },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading eyebrow="Specialised care" title="Expert support for complex needs." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featured.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/85 via-brand-blue-dark/10 to-transparent" />
                <p className="absolute inset-x-6 bottom-6 font-display text-2xl font-semibold text-white">{f.title}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
