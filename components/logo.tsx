import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center rounded-lg', inverted && 'rounded-2xl bg-white/95 p-1.5', className)}
      aria-label="Sahara Home Care — home"
    >
      <Image
        src="/logo.png"
        alt="Sahara Home Health Care"
        width={160}
        height={90}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  )
}
