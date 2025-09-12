import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function WaveBackground() {
  const ref = useRef(null)
  useEffect(() => {
    let ctx
    try {
      ctx = gsap.context(() => {
        gsap.to('.wave', { x: '+=20', repeat: -1, yoyo: true, duration: 6, ease: 'sine.inOut' })
        gsap.to('.wave-2', { x: '-=30', repeat: -1, yoyo: true, duration: 8, ease: 'sine.inOut' })
      }, ref)
    } catch (e) {
      // ignore
    }
    return () => ctx && ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none -z-20 opacity-30">
      <svg className="wave w-full h-40" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#wg)" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,144C672,128,768,128,864,154.7C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <defs>
          <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5a4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="wave-2 w-full h-40 mt-[-22px]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#wg2)" d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,208C672,203,768,181,864,170.7C960,160,1056,160,1152,154.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <defs>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
