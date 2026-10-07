'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from '@/components/logo'
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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow] duration-300',
        scrolled || open ? 'bg-white/95 shadow-[0_1px_0_var(--border)] backdrop-blur' : 'bg-white',
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
                    isActive(link.href) ? 'text-white' : 'text-foreground/75 hover:text-brand-blue',
                  )}
                >
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-blue"
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
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green/90 sm:inline-flex"
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

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-white px-4 pb-8 pt-4 md:hidden"
          >
            <ul className="flex flex-col divide-y divide-border">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'block py-4 font-display text-2xl',
                      isActive(link.href) ? 'text-brand-blue' : 'text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={site.phoneHref}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 font-semibold text-white"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
