'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Phone, X } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { ScrollLock } from '@/components/scroll-lock'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { site } from '@/lib/site'

const EVENT = 'sahara:open-enquiry'

export function openEnquiry() {
  window.dispatchEvent(new CustomEvent(EVENT))
}

export function EnquireButton({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <button type="button" onClick={openEnquiry} className={className}>
      {children ?? 'Enquire now'}
    </button>
  )
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function EnquiryModal() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onOpen = () => {
      restoreFocusTo.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    window.addEventListener(EVENT, onOpen)
    return () => window.removeEventListener(EVENT, onOpen)
  }, [])

  // Escape to close + focus trap while the dialog is open.
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

      // Keep Tab cycling inside the dialog (WCAG 2.1.2 / 2.4.3).
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

  // Return focus to whatever opened the dialog.
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
          aria-label="Enquiry form"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-brand-green-dark/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => {
            // Clicking the backdrop itself (not the panel) dismisses.
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={panelRef}
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
              className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-surface text-foreground transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  )
}

export function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-5 left-5 z-[70]">
        <a
          href={site.phoneHref}
          aria-label={`Call us at ${site.phone}`}
          className="group relative inline-flex items-center justify-center rounded-full bg-brand-green p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(18,165,42,0.8)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            className="absolute inset-0 animate-ping rounded-full bg-brand-green/40 [animation-duration:2.5s] motion-reduce:animate-none"
            aria-hidden="true"
          />
          <Phone className="relative size-8" aria-hidden="true" />
        </a>
      </div>
      <div className="fixed bottom-5 right-5 z-[70]">
        <a
          href={`https://wa.me/${site.whatsapp}`}
          aria-label="Chat with us on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex size-15 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s] motion-reduce:animate-none"
            aria-hidden="true"
          />
          <WhatsAppIcon className="relative size-8" />
        </a>
      </div>
    </>
  )
}