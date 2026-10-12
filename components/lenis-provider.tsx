'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { ArrowUp } from 'lucide-react'

const LenisContext = createContext<Lenis | null>(null)

/** The active Lenis instance, or `null` before mount / after teardown. */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Smooth scrolling + scroll progress, for the whole app.
 *
 * Notes on correctness:
 *  - The rAF loop is cancelled on cleanup. Lenis' own `destroy()` does not stop a
 *    self-scheduling loop, so without this the loop outlives the component and
 *    burns a frame's worth of CPU on every route change.
 *  - The instance lives in state (not a ref) so context consumers actually
 *    receive it. A ref assigned inside `useEffect` never triggers a re-render,
 *    which would leave every consumer stuck on `null`.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1.2,
    })

    let frame = 0
    const raf = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      setShowTop(scroll > 300)
      setProgress(limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0)
    }
    instance.on('scroll', onScroll)

    setLenis(instance)

    return () => {
      cancelAnimationFrame(frame)
      instance.off('scroll', onScroll)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    lenis?.scrollTo(0, { duration: 1 })
  }, [lenis])

  const value = useMemo(() => lenis, [lenis])

  return (
    <LenisContext.Provider value={value}>
      {children}
      <ScrollProgress progress={progress} />
      {showTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 z-50 inline-flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-brand-green-dark text-white shadow-lg transition-[transform,opacity] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
      )}
    </LenisContext.Provider>
  )
}

/** 2px reading-progress rail pinned to the top of the viewport. */
function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-green will-change-transform"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}