import { Clock, Mail, Phone } from 'lucide-react'
import { site, socials } from '@/lib/site'

export function TopBar() {
  return (
    <div className="bg-brand-green-dark text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 sm:text-[13px] lg:px-8">
        <div className="flex items-center gap-4">
          <a href={site.phoneHref} className="inline-flex items-center gap-1.5 text-white/85 hover:text-white">
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hidden items-center gap-1.5 text-white/85 hover:text-white sm:inline-flex"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            {site.email}
          </a>
          <span className="hidden items-center gap-1.5 text-white/70 lg:inline-flex">
            <Clock className="size-3.5" aria-hidden="true" />
            {site.hours}
          </span>
        </div>
        <ul aria-label="Social media" className="flex items-center gap-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={`Sahara Home Health Care on ${s.label}`}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex size-7 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <s.icon className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
