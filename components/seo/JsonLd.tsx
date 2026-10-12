import { location, socialProfiles } from '@/lib/site'
import { siteConfig } from '@/lib/seo'

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: `${siteConfig.url}/logo.png`,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: siteConfig.phone,
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Kannada'],
            hoursAvailable: 'Mo-Su 00:00-24:00',
          },
          {
            '@type': 'ContactPoint',
            telephone: siteConfig.altPhone,
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Kannada'],
            hoursAvailable: 'Mo-Su 00:00-24:00',
          },
        ],
        email: siteConfig.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '8th Cross Road, Ganesh Block, Nandini Layout',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          postalCode: '560096',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: location.lat,
          longitude: location.lng,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
        sameAs: socialProfiles,
      }}
    />
  )
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: 'India',
        serviceType: 'Home Healthcare Service',
      }}
    />
  )
}
