import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { site } from '@/lib/site'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
      <p className="font-display text-7xl font-semibold text-brand-blue sm:text-8xl">404</p>
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="mx-auto max-w-md text-pretty text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to care.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Back to home
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a
          href={site.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 font-semibold transition-colors hover:border-brand-green hover:text-brand-green"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call us
        </a>
      </div>
    </section>
  )
}
