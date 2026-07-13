import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function SceneLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  useGSAP(() => {
    const value = { progress: 0 }
    gsap.to(value, {
      progress: 100, duration: 1.45, ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(value.progress)),
      onComplete: () => gsap.to('.preloader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete }),
    })
  }, [])
  return <div className="preloader" aria-label="Loading portfolio">
    <div className="preloader__top"><span>AK / 2026</span><span>{String(progress).padStart(3, '0')}%</span></div>
    <div className="preloader__word"><span>digital</span><span>matter.</span></div>
    <div className="preloader__line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
  </div>
}
