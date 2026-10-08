import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center rounded-lg', className)}
      aria-label="Sahara Home Health Care — home"
    >
      <Image
        src="/logo.png"
        alt="Sahara Home Health Care — Care with Compassion"
        width={1376}
        height={768}
        priority
        className="h-12 w-auto sm:h-14"
      />
      <span className="sr-only">Sahara Home Health Care</span>
    </Link>
  )
}
