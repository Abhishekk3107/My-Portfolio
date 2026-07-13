import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedCursor from './components/AnimatedCursor'
import SceneLoader from './components/SceneLoader'
import { portfolioData } from './data'
import Home from './pages/Home'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
    })

    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="app-shell">
      <div className="app-background" aria-hidden="true">
        <div className="app-gradient app-gradient--gold" />
        <div className="app-gradient app-gradient--blue" />
        <div className="app-grid" />
        <div className="app-noise" />
      </div>

      <AnimatedCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <SceneLoader key="loader" />
        ) : (
          <motion.main
            key="experience"
            initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Home data={portfolioData} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
