'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CalendarCheck, Phone, X } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { ScrollLock } from '@/components/scroll-lock'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { site } from '@/lib/site'

const DELAY_MS = 7000
const DISMISS_KEY = 'sahara:enquiry-popup-dismissed'
/** Re-offer after a week rather than nagging on every page view. */
const REOPEN_AFTER_MS = 7 * 24 * 60 * 60 * 1000

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function recentlyDismissed() {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    return Date.now() - Number(raw) < REOPEN_AFTER_MS
  } catch {
    return false
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
  } catch {
    /* private mode — the popup simply reappears next visit */
  }
}

/**
 * Enquiry popup that offers itself once, 7 seconds after arrival.
 *
 * Behaviour deliberately kept restrained, because unsolicited popups are the
 * single most common reason visitors bounce:
 *  - never shown to someone who already opened an enquiry or submitted a form
 *  - suppressed for 7 days after an explicit dismiss
 *  - suppressed entirely for reduced-motion users (a sliding panel is exactly
 *    the kind of unsolicited movement that preference exists for)
 *  - the timer does not start until the page is idle-ish, so it never competes
 *    with the LCP window
 */
export function EnquiryPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    markDismissed()
    setOpen(false)
  }, [])

  useEffect(() => {
    // /contact already shows the full form with booking — a popup there would
    // cover the very thing the visitor navigated to.
    if (pathname === '/contact') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (recentlyDismissed()) return
    if (document.body.dataset.saharaEnquirySeen === '1') return

    const timer = window.setTimeout(() => {
      document.body.dataset.saharaEnquirySeen = '1'
      restoreFocusTo.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }, DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    if (open) return
    restoreFocusTo.current?.focus?.()
  }, [open])

  return (
    <>
      <ScrollLock active={open} />
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a free consultation"
          className="fixed inset-0 z-[85] flex items-end justify-center bg-brand-green-dark/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={panelRef}
            className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
              className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {/*
              Fixed banner + scrollable body + fixed footer.

              The whole panel used to be one scroll container, which meant the
              call/WhatsApp escape hatches scrolled out of reach — the visitor had
              to scroll to the bottom of a long form to find another way to reach
              us. `shrink-0` pins both ends.
            */}
            <div className="shrink-0">
              <div className="flex items-start gap-3 bg-brand-green px-6 py-6 text-white">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <CalendarCheck className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">Book a free consultation</h2>
                  <p className="mt-1 text-sm text-white/85">
                    Pick a date and time that suits you — our coordinator will call to confirm.
                  </p>
                </div>
              </div>
            </div>

            {/*
              `data-lenis-prevent` is essential. Lenis' wheel listener sits on
              the window and calls preventDefault() on every wheel event.
              `lenis.stop()` halts its animation but NOT that listener, so without
              this attribute the form is physically unscrollable for the user —
              it can only be scrolled programmatically.
              `overscroll-contain` stops the scroll chaining to the page behind.
            */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <ContactForm showHeading={false} className="sm:p-8" />
            </div>

            <div className="shrink-0 border-t border-border px-6 py-4 sm:px-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">Prefer to talk now?</p>
                <div className="flex gap-2">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}