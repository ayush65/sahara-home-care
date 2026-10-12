'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ScrollLock } from '@/components/scroll-lock'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { navLinks, site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <ScrollLock active={open} />
      <header
        className={cn(
          'sticky top-0 z-50 transition-[background-color,box-shadow] duration-300',
          scrolled || open ? 'bg-white/95 shadow-[0_1px_0_var(--border)] backdrop-blur' : 'bg-white',
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:h-24 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      isActive(link.href) ? 'text-white' : 'text-foreground/75 hover:text-brand-green-dark',
                    )}
                  >
                    {isActive(link.href) && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-green"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark lg:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/*
        Full-screen mobile menu.

        It covers the entire viewport (`inset-0`) rather than starting under the
        sticky header, and renders its own logo + close button so the hamburger
        simply becomes an X in place. Navigation items are vertically and
        horizontally centred.

        `data-lenis-prevent` keeps Lenis from swallowing wheel/touch events, so
        the panel still scrolls on short screens where the content overflows.
      */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden"
            data-lenis-prevent
          >
            <div className="flex h-20 shrink-0 items-center justify-between px-4 sm:h-24 sm:px-6">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              data-lenis-prevent
              className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto overscroll-contain px-6 py-6"
            >
              <ul className="flex w-full max-w-sm flex-col items-stretch gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={cn(
                        'block rounded-2xl py-4 text-center font-display text-3xl font-semibold transition-colors hover:bg-surface',
                        isActive(link.href) ? 'text-brand-green' : 'text-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call {site.phone}
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 font-semibold transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp us
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
