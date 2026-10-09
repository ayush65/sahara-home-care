import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * The supplied `final logo.png` is a landscape lockup that already contains the
 * "SAHARA HOME HEALTHCARE" wordmark, so no text is rendered alongside it.
 *
 * `inverted` is used on the dark footer — because the artwork carries brand
 * colours (green + blue), it cannot simply be inverted, so it sits on a white
 * pill instead to stay legible.
 */
export function Logo({
  className,
  imgClassName,
  inverted = false,
}: {
  className?: string
  imgClassName?: string
  inverted?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Sahara Home Health Care — home"
      className={cn(
        'inline-flex items-center rounded-xl',
        inverted ? 'bg-white px-4 py-3 shadow-sm' : '',
        className,
      )}
    >
      <Image
        src="/logo-final.png"
        alt="Sahara Home Health Care"
        width={1893}
        height={573}
        priority
        sizes="(min-width: 1024px) 240px, 180px"
        className={cn('w-auto', imgClassName ?? 'h-9 sm:h-11')}
      />
    </Link>
  )
}