'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
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
    <div className="fixed bottom-5 right-5 z-[70]">
      <a
        href={`https://wa.me/${site.whatsapp}`}
        aria-label="Chat with us on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex size-15 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition-transform hover:scale-105"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]"
          aria-hidden="true"
        />
        <WhatsAppIcon className="relative size-8" />
      </a>
    </div>
  )
}
