import Image from 'next/image'
import { Check, Phone } from 'lucide-react'
import { EnquireButton } from '@/components/enquiry-modal'
import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/shared'
import { cn } from '@/lib/utils'
import { services, site } from '@/lib/site'

const featuredSlugs = ['home-nursing', 'elderly-care', 'post-hospitalization-care', 'dementia-alzheimers-care']

export function CareShowcase() {
  const featured = featuredSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow="How we care"
        title="Support that fits your family."
        description="A closer look at the care we most often provide — each with a personalised plan and a dedicated coordinator."
      />
      <div className="mt-16 flex flex-col gap-20 lg:gap-28">
        {featured.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <div
              key={s.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={cn('relative aspect-[4/3] overflow-hidden rounded-[2rem]', flip && 'lg:order-2')}>
                <Image
                  src={s.image}
                  alt={`${s.title} by Sahara Home Care`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
              <div className={cn('flex flex-col gap-6', flip && 'lg:order-1')}>
                <Reveal className="flex flex-col gap-3">
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{s.description}</p>
                </Reveal>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    Call now
                  </a>
                  <EnquireButton className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light">
                    Enquire now
                  </EnquireButton>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
