import { Hero } from '@/components/home/hero'
import {
  AboutPreview,
  HighlightsStrip,
  Process,
  ServicesPreview,
  Testimonials,
  WhyUs,
} from '@/components/home/sections'
import { CtaBand } from '@/components/shared'
import { CareShowcase } from '@/components/home/showcase'
import { Faq } from '@/components/home/faq'

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
