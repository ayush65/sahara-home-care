import { ServiceBannerCarousel } from '@/components/home/service-banner-carousel'
import { SectionHeading } from '@/components/shared'
import { promoBanners } from '@/lib/site'

/**
 * Wide 16:9 auto-playing carousel of the service creatives.
 *
 * `variant="top"` drops the heading and section padding so the carousel sits
 * flush under the header — used on /services where there is no hero band.
 */
export function ServicesBanner({ variant = 'default' }: { variant?: 'default' | 'top' }) {
  const isTop = variant === 'top'

  return (
    <section aria-label="Service gallery" className={isTop ? 'bg-white' : 'bg-surface'}>
      <div
        className={
          isTop
            ? 'mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8'
            : 'mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24'
        }
      >
        {!isTop && (
          <SectionHeading
            eyebrow="Service gallery"
            title="A closer look at the care we provide."
            description="Flip through our service highlights — each one links straight to its own page so you can see exactly what is included."
            align="center"
          />
        )}
        <ServiceBannerCarousel slides={promoBanners} className={isTop ? '' : 'mt-12'} />
      </div>
    </section>
  )
}