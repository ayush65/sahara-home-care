'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { MessageSquareText, X } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
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

export function EnquiryModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(EVENT, onOpen)
    return () => window.removeEventListener(EVENT, onOpen)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
      className="fixed inset-0 z-[80] flex items-end justify-center bg-brand-blue-dark/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close enquiry form"
          className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-surface text-foreground transition-colors hover:bg-border"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <ContactForm />
      </div>
    </div>
  )
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={openEnquiry}
        className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-blue-dark"
      >
        <MessageSquareText className="size-4" aria-hidden="true" />
        Enquire now
      </button>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  )
}
