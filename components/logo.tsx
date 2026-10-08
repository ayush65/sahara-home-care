import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-3 rounded-lg', className)}
      aria-label="Sahara Home Health Care — home"
    >
      <Image
        src="/logo-main.png"
        alt="Sahara Home Health Care"
        width={1253}
        height={1111}
        priority
        className="h-12 w-auto sm:h-14"
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            'font-display text-xl font-semibold tracking-tight',
            inverted ? 'text-white' : 'text-brand-blue',
          )}
        >
          Sahara Home
        </span>
        <span
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.2em]',
            inverted ? 'text-brand-green-light' : 'text-brand-green',
          )}
        >
          Health Care
        </span>
      </span>
    </Link>
  )
}
