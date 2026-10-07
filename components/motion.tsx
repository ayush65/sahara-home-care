'use client'

import { MotionConfig, motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { useSyncExternalStore, type ReactNode } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'

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

export function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
  const lite = useLiteMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: lite ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: lite ? 0.35 : 0.7,
        delay: lite ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const lite = useLiteMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: lite ? 0 : 0.08 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const lite = useLiteMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: lite ? 0 : 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: lite ? 0.3 : 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
