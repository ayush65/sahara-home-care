import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/logo'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { navLinks, services, site, socials } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo inverted />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Trusted, compassionate and professional home healthcare — delivered with dignity in the comfort of
            your home.
          </p>
          <ul aria-label="Social media" className="mt-2 flex items-center gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={`Sahara Home Health Care on ${s.label}`}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand-green hover:text-white"
                >
                  <s.icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-green-light">Explore</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-green-light">Services</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/80 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-green-light">Contact</h2>
          <ul className="mt-4 flex flex-col gap-4 text-sm text-white/80">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-[#25D366]">
                <WhatsAppIcon className="size-4" />
              </span>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp us 24/7
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {site.hours}
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {site.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Sahara Home Health Care. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
