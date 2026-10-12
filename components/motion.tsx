'use client'

import { MotionConfig, motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { memo, useMemo, useSyncExternalStore, type ReactNode } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'
const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const

function subscribe(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

/** True when the user prefers reduced motion or is on a small screen. */
export function useLiteMotion() {
  const reduced = useReducedMotion()
  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
  return Boolean(reduced) || isMobile
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
}

/**
 * Fade/rise on first entry.
 *
 * `initial` is deliberately NOT `opacity: 0` for users who get reduced motion or
 * are on a small screen — with `y: 0` and no opacity change those users get a
 * no-op animation rather than a flash of invisible content. Variants and the
 * transition are memoised because inline object literals are a new reference on
 * every render, which makes Framer Motion re-resolve the animation each time.
 */
export function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
  const lite = useLiteMotion()
  const initial = useMemo(
    () => (lite ? { opacity: 1, y: 0 } : { opacity: 0, y }),
    [lite, y],
  )
  const whileInView = useMemo(() => ({ opacity: 1, y: 0 }), [])
  const transition = useMemo(
    () => ({ duration: lite ? 0.001 : 0.7, delay: lite ? 0 : delay, ease: EASE }),
    [lite, delay],
  )

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={VIEWPORT}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const lite = useLiteMotion()
  const variants = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: lite ? 0 : 0.08 } },
    }),
    [lite],
  )

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

/**
 * `memo` matters here: `Stagger` re-renders whenever the parent does, and every
 * item would otherwise rebuild its variant object and restart its transition.
 */
export const StaggerItem = memo(function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const lite = useLiteMotion()
  const variants = useMemo(
    () => ({
      hidden: { opacity: lite ? 1 : 0, y: lite ? 0 : 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: lite ? 0.001 : 0.6, ease: EASE },
      },
    }),
    [lite],
  )

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
})
