import { ServiceBannerCarousel } from '@/components/home/service-banner-carousel'
import { SectionHeading } from '@/components/shared'
import { services } from '@/lib/site'

const bannerSlides = services.map((s) => ({
  id: s.slug,
  title: s.title,
  short: s.short,
  image: s.image,
  href: `/services/${s.slug}`,
}))

/** Wide 16:9 auto-playing photo carousel of all services, placed above the services grid. */
export function ServicesBanner() {
  return (
    <section aria-label="Service gallery" className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Service gallery"
          title="A closer look at the care we provide."
          description="Tap through every service we offer — each image links straight to its own page so you can see exactly what is included."
          align="center"
        />
        <ServiceBannerCarousel
          slides={bannerSlides}
          className="mt-12 aspect-[4/3] rounded-[2rem] shadow-xl sm:aspect-[16/9]"
        />
      </div>
    </section>
  )
}