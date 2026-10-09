import { ServiceBannerCarousel } from '@/components/home/service-banner-carousel'
import { SectionHeading } from '@/components/shared'
import { promoBanners } from '@/lib/site'

/** Wide 16:9 auto-playing carousel of the service creatives, placed above the services grid. */
export function ServicesBanner() {
  return (
    <section aria-label="Service gallery" className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Service gallery"
          title="A closer look at the care we provide."
          description="Flip through our service highlights — each one links straight to its own page so you can see exactly what is included."
          align="center"
        />
        <ServiceBannerCarousel slides={promoBanners} className="mt-12" />
      </div>
    </section>
  )
}