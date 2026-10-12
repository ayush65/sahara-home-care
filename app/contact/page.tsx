import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { PageHero, SectionHeading } from '@/components/shared'
import { siteConfig } from '@/lib/seo'
import { location, site, socials } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Sahara Home Health Care for a free consultation. Available 24/7 by phone, WhatsApp and email.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Sahara Home Health Care',
    description:
      'Reach out for a free consultation. Our care coordinators are available around the clock.',
    url: `${siteConfig.url}/contact`,
    type: 'website',
  },
  twitter: {
    title: 'Contact Us | Sahara Home Health Care',
    description:
      'Reach out for a free consultation. Our care coordinators are available around the clock.',
  },
}

const channels = [
  { icon: Phone, label: 'Call us', value: site.phone, href: site.phoneHref },
  { icon: Phone, label: 'Alternate line', value: site.altPhone, href: site.altPhoneHref },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat with a coordinator', href: `https://wa.me/${site.whatsapp}`, whatsapp: true },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: 'Hours', value: site.hours },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s talk about <span className="text-brand-green-light">the care you need.</span>
          </>
        }
        description="Reach out for a free consultation. Our care coordinators are available around the clock to answer your questions and arrange care quickly."
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Contact Us', url: `${siteConfig.url}/contact` },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-5 lg:gap-14 lg:px-8">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((c) => {
              const content = (
                <>
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${'whatsapp' in c && c.whatsapp ? 'bg-[#25D366]/15 text-[#128C4B] group-hover:bg-[#25D366] group-hover:text-white' : 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white'}`}>
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{c.label}</span>
                    <span className="font-semibold">{c.value}</span>
                  </span>
                </>
              )
              return (
                <StaggerItem key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-3xl border border-border p-5 transition-colors hover:border-brand-green/40"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-3xl border border-border p-5">{content}</div>
                  )}
                </StaggerItem>
              )
            })}
          </Stagger>
          <Reveal className="flex items-start gap-3 rounded-3xl bg-surface p-5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
            {site.address}
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-border p-5">
              <p className="text-sm font-semibold">Follow Sahara Home Health Care</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Care tips, recovery guides and family support — shared on our social channels.
              </p>
              <ul aria-label="Social media" className="mt-4 flex items-center gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={`Sahara Home Health Care on ${s.label}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                    >
                      <s.icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </section>

      <section aria-label="Find us" className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <SectionHeading
            eyebrow="Find us"
            title="Visit our location."
            description="Come and meet the team, or drop in to discuss what care your loved one needs."
            align="center"
          />

          <Reveal className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_30px_60px_-30px_rgba(18,165,42,0.25)]">
            <iframe
              src={location.embedUrl}
              title={`Map showing ${location.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[420px]"
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-6 flex flex-col items-center gap-4 text-center">
            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
              {location.address}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Get directions
              </a>
              <a
                href={location.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Open in Apple Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
