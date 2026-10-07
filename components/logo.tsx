import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center rounded-lg', inverted && 'rounded-2xl bg-white/95 p-2', className)}
      aria-label="Sahara Home Care — home"
    >
      <Image
        src="/logo.png"
        alt="Sahara Home Health Care — Care with Compassion"
        width={1376}
        height={768}
        priority
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  )
}
