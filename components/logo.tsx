import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5 rounded-lg', className)}
      aria-label="Sahara Home Health Care — home"
    >
      <Image
        src="/logo-mark.png"
        alt="Sahara Home Health Care logo"
        width={600}
        height={574}
        priority
        className="h-11 w-auto sm:h-12"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-xl font-semibold tracking-tight',
            inverted ? 'text-white' : 'text-brand-blue',
          )}
        >
          Sahara
        </span>
        <span
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.2em]',
            inverted ? 'text-brand-green-light' : 'text-brand-green',
          )}
        >
          Home Health Care
        </span>
      </span>
    </Link>
  )
}
