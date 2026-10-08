'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ArrowUp } from 'lucide-react'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1.2,
    })
    lenisRef.current = lenis

    const onScroll = () => setShowTop(lenis.scroll > 300)
    lenis.on('scroll', onScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.off('scroll', onScroll)
      lenis.destroy()
      lenisRef.current = null
      setShowTop(false)
    }
  }, [])

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1 })
  }

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
      {showTop && (
        <button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-brand-blue p-3 text-white shadow-lg transition-transform hover:scale-105"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </LenisContext.Provider>
  )
}
