import React, { useEffect, useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCursor from './components/AnimatedCursor'
import SceneLoader from './components/SceneLoader'
import SiteChrome from './components/SiteChrome'
import { AppRoutes } from './pages/PortfolioPages'
import { portfolioData } from './data'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })

function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.85 })
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const resize = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', resize)
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.removeEventListener('refresh', resize)
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])
  return children
}

function PortfolioApp() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const refresh = () => ScrollTrigger.refresh()
    const frame = requestAnimationFrame(refresh)
    const timeout = window.setTimeout(refresh, 300)
    const images = [...document.images]
    images.forEach((image) => image.addEventListener('load', refresh, { once: true }))
    window.addEventListener('load', refresh, { once: true })
    document.fonts?.ready.then(refresh)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      images.forEach((image) => image.removeEventListener('load', refresh))
      window.removeEventListener('load', refresh)
    }
  }, [location.pathname, loading])

  return (
    <div className="app-shell">
      {loading && <SceneLoader onComplete={() => setLoading(false)} />}
      <AnimatedCursor />
      <SiteChrome>
        <AppRoutes data={portfolioData} />
      </SiteChrome>
    </div>
  )
}

export default function App() {
  return <BrowserRouter><SmoothScroll><PortfolioApp /></SmoothScroll></BrowserRouter>
}
