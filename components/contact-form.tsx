'use client'

import { useState, type FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { services, site } from '@/lib/site'

const inputClass =
  'w-full rounded-2xl border border-input bg-white px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10'

export function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const service = String(data.get('service') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) return setError('Please enter your name.')
    if (!/^[+\d][\d\s-]{6,}$/.test(phone)) return setError('Please enter a valid phone number.')
    setError(null)

    const text = [
      'Hello Sahara Home Care,',
      `Name: ${name}`,
      `Phone: ${phone}`,
      service && `Service: ${service}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
    form.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-[2rem] border border-border bg-white p-6 shadow-[0_30px_60px_-30px_rgba(7,87,185,0.25)] sm:p-10"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Request a free consultation</h2>
        <p className="text-sm text-muted-foreground">
          Share a few details and we&apos;ll get back to you shortly on WhatsApp.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor="enquiry-name" className="flex flex-col gap-2 text-sm font-medium">
          Full name <span className="sr-only">(required)</span>
          <input
            id="enquiry-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </label>
        <label htmlFor="enquiry-phone" className="flex flex-col gap-2 text-sm font-medium">
          Phone number
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 ..."
            className={inputClass}
          />
        </label>
      </div>

      <label htmlFor="enquiry-service" className="flex flex-col gap-2 text-sm font-medium">
        Service needed
        <select id="enquiry-service" name="service" defaultValue="" className={inputClass}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="enquiry-message" className="flex flex-col gap-2 text-sm font-medium">
        Tell us about the patient
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          placeholder="Age, condition, type of care and duration needed..."
          className={`${inputClass} resize-none`}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      {sent && !error && (
        <p role="status" className="rounded-2xl bg-brand-green/10 px-4 py-3 text-sm font-medium text-brand-green">
          Thank you! WhatsApp has been opened with your enquiry — just press send.
        </p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-4 font-semibold text-white transition-colors hover:bg-brand-green-light focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/30"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Send enquiry
      </button>
    </form>
  )
}
