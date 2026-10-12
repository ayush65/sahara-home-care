'use client'

import { useState, type FormEvent } from 'react'
import { CalendarCheck, Mail, Send } from 'lucide-react'
import { services, site } from '@/lib/site'

const inputClass =
  'w-full rounded-2xl border border-input bg-white px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10'

const labelClass = 'flex flex-col gap-2 text-sm font-medium'

const SLOTS = [
  { value: 'morning', label: 'Morning · 8am – 12pm' },
  { value: 'afternoon', label: 'Afternoon · 12pm – 4pm' },
  { value: 'evening', label: 'Evening · 4pm – 8pm' },
  { value: 'night', label: 'Night · 8pm – 12am' },
]

/** Today in YYYY-MM-DD, used as the minimum selectable appointment date. */
function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    if (name.length < 2) {
      setStatus('error')
      setMessage('Please enter your name.')
      return
    }
    if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
      setStatus('error')
      setMessage('Please enter a valid phone number.')
      return
    }

    setStatus('sending')
    setMessage(null)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          service: String(data.get('service') ?? ''),
          appointmentDate: String(data.get('appointmentDate') ?? ''),
          appointmentSlot: String(data.get('appointmentSlot') ?? ''),
          message: String(data.get('message') ?? ''),
        }),
      })
      const json = await res.json().catch(() => ({}))

      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.')

      setStatus('sent')
      setMessage(null)
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(
        err instanceof Error && err.message
          ? `${err.message} You can also reach us on ${site.phone}.`
          : `Something went wrong. Please call us on ${site.phone}.`,
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-[2rem] border border-border bg-white p-6 shadow-[0_30px_60px_-30px_rgba(18,165,42,0.25)] sm:p-10"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Request a free consultation</h2>
        <p className="text-sm text-muted-foreground">
          Share a few details and we&apos;ll get back to you shortly. Your enquiry goes straight to our care
          coordinator.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor="enquiry-name" className={labelClass}>
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
        <label htmlFor="enquiry-phone" className={labelClass}>
          Phone number <span className="sr-only">(required)</span>
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

      <label htmlFor="enquiry-email" className={labelClass}>
        Email <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>

      <label htmlFor="enquiry-service" className={labelClass}>
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

      <fieldset className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <legend className="flex items-center gap-2 px-1 text-sm font-semibold">
          <CalendarCheck className="size-4 text-brand-green" aria-hidden="true" />
          Preferred appointment slot
          <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="enquiry-date" className={labelClass}>
            Date
            <input
              id="enquiry-date"
              name="appointmentDate"
              type="date"
              min={today()}
              className={inputClass}
            />
          </label>
          <label htmlFor="enquiry-slot" className={labelClass}>
            Time slot
            <select id="enquiry-slot" name="appointmentSlot" defaultValue="" className={inputClass}>
              <option value="">Any time</option>
              {SLOTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <label htmlFor="enquiry-message" className={labelClass}>
        Tell us about the patient
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          placeholder="Age, condition, type of care and duration needed..."
          className={`${inputClass} resize-none`}
        />
      </label>

      {message && (
        <p
          role="alert"
          className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {message}
        </p>
      )}
      {status === 'sent' && (
        <p role="status" className="rounded-2xl bg-brand-green/10 px-4 py-3 text-sm font-medium text-brand-green">
          Thank you! Your enquiry has been sent to our team — we&apos;ll call you back shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-4 font-semibold text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/30 disabled:opacity-60"
      >
        {status === 'sending' ? (
          <>
            <Send className="size-4 animate-pulse" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send enquiry
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Mail className="size-3.5 shrink-0" aria-hidden="true" />
        Enquiries reach <span className="font-medium text-foreground">{site.email}</span>
      </p>
    </form>
  )
}