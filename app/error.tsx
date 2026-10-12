'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { site } from '@/lib/site'

/**
 * Route-level error boundary. Without this, an unexpected throw inside a client
 * component falls through to Next's generic production error page, which loses
 * the site chrome and offers the visitor no way forward.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the failure for monitoring without leaking internals to the user.
    console.error('[app-error]', error)
  }, [error])

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="font-display text-5xl font-semibold text-brand-green">Something went wrong</p>
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          We couldn&apos;t load this page
        </h1>
        <p className="mx-auto max-w-md text-pretty text-muted-foreground">
          Please try again. If the problem continues, call us and we&apos;ll help straight away.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 font-semibold transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
        >
          Back to home
        </Link>
      </div>
      <a
        href={site.phoneHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:underline"
      >
        <Phone className="size-4" aria-hidden="true" />
        {site.phone}
      </a>
    </section>
  )
}