import type { Metadata } from 'next'
import Image from 'next/image'
import { Check, Eye, HeartHandshake, ShieldCheck, Target } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import { CtaBand, PageHero, SectionHeading } from '@/components/shared'
import { siteConfig } from '@/lib/seo'
import { careHighlights } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sahara Home Health Care — a trusted home healthcare service providing trained nurses, caregivers and attendants with compassion and professionalism.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Sahara Home Health Care',
    description:
      'Compassionate, professional and reliable home healthcare — delivered with dignity in the comfort of your home.',
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
  twitter: {
    title: 'About Us | Sahara Home Health Care',
    description:
      'Compassionate, professional and reliable home healthcare — delivered with dignity in the comfort of your home.',
  },
}

const values = [
  { icon: HeartHandshake, title: 'Compassion', body: 'Care delivered with warmth, patience and genuine kindness.' },
  { icon: ShieldCheck, title: 'Reliability', body: 'Trained, verified staff who show up — every shift, every day.' },
  { icon: Target, title: 'Professionalism', body: 'Clinical standards and clear care plans, supervised by experts.' },
  { icon: Eye, title: 'Transparency', body: 'Honest communication and regular updates for families.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sahara Home Health Care"
        title={
          <>
            Bringing <span className="text-brand-green-light">trusted care</span> home.
          </>
        }
        description="Sahara Home Health Care is a trusted home healthcare service dedicated to providing compassionate, professional and reliable care in the comfort of your home."
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'About Us', url: `${siteConfig.url}/about` },
        ]}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/team.png"
            alt="Sahara Home Health Care nurses and caregivers"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Who we are" title="Care that lets families breathe easier." />
          <Reveal delay={0.1} className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              We provide trained nurses, caregivers, attendants and patient-care support for elderly people,
              patients recovering from illness or surgery, and those requiring assistance with daily activities.
            </p>
            <p>
              &ldquo;Sahara&rdquo; means support — and that&apos;s exactly what we aim to be. Whether it&apos;s a few
              hours of help a day or round-the-clock live-in care, our team becomes a dependable extension of your
              family.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading eyebrow="Our values" title="What guides every visit." align="center" />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title} className="flex flex-col gap-4 rounded-3xl bg-white p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-green text-white">
                  <v.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8">
        <SectionHeading
          eyebrow="What we provide"
          title="Support for every stage of care."
          description="Our caregivers and nurses are trained to handle a wide range of needs — so your loved one gets the right help at the right time."
        />
        <Stagger className="grid gap-3 sm:grid-cols-2">
          {careHighlights.map((h) => (
            <StaggerItem
              key={h}
              className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm font-medium"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                <Check className="size-4" aria-hidden="true" />
              </span>
              {h}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </>
  )
}
