import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import {
  AboutPreview,
  HighlightsStrip,
  Process,
  ServicesPreview,
  Testimonials,
  WhyUs,
} from '@/components/home/sections'
import { CareShowcase } from '@/components/home/showcase'
import { Faq } from '@/components/home/faq'
import { CtaBand } from '@/components/shared'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: 'Trusted Home Healthcare Services',
  },
  description:
    'Sahara Home Health Care provides trained nurses, caregivers, attendants, elderly care, physiotherapy, doctor-on-call and critical care in the comfort of your home — 24/7.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trusted Home Healthcare Services | Sahara Home Health Care',
    description:
      'Trained nurses, caregivers and attendants for elderly people, patients recovering from illness or surgery — available 24/7 at home.',
    url: siteConfig.url,
    type: 'website',
  },
  twitter: {
    title: 'Trusted Home Healthcare Services | Sahara Home Health Care',
    description:
      'Trained nurses, caregivers and attendants for elderly people, patients recovering from illness or surgery — available 24/7 at home.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HighlightsStrip />
      <AboutPreview />
      <ServicesPreview />
      <CareShowcase />
      <WhyUs />
      <Process />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  )
}
