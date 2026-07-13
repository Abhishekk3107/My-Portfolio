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
    
    <div className="preloader__center">
      <div className="preloader__layout">
        {/* Left Side: Coding / Syntax Window Illustration */}
        <div className="preloader__side preloader__side--left">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="preloader__side-svg">
            <rect x="5" y="15" width="110" height="90" rx="6" stroke="currentColor" strokeWidth="1" opacity="0.25" />
            <circle cx="18" cy="27" r="2.5" fill="currentColor" opacity="0.45" />
            <circle cx="28" cy="27" r="2.5" fill="currentColor" opacity="0.45" />
            <circle cx="38" cy="27" r="2.5" fill="currentColor" opacity="0.45" />
            
            <text x="15" y="54" fill="currentColor" fontSize="10.5" fontFamily="DM Mono, monospace" fontWeight="500" opacity="0.7" className="animate-code-1">&lt;code&gt;</text>
            <text x="28" y="70" fill="currentColor" fontSize="10.5" fontFamily="DM Mono, monospace" fontWeight="500" opacity="0.55" className="animate-code-2">const ak = dev;</text>
            <text x="15" y="86" fill="currentColor" fontSize="10.5" fontFamily="DM Mono, monospace" fontWeight="500" opacity="0.7" className="animate-code-3">&lt;/code&gt;</text>
            
            <text x="80" y="78" fill="currentColor" fontSize="32" fontFamily="Syne, sans-serif" fontWeight="700" opacity="0.08" className="animate-float-slow">&#123;&#125;</text>
          </svg>
        </div>

        {/* Center: Core Progress Circle */}
        <div className="preloader__illustration">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="preloader__svg">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              opacity="0.3"
              className="animate-spin-slow"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.45"
              className="animate-spin-reverse"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 440} 440`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="40" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <circle
              cx="100"
              cy="100"
              r="10"
              fill="currentColor"
              className="animate-pulse-fast"
            />
            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />
          </svg>
        </div>

        {/* Right Side: Server Stack / Database Nodes Illustration */}
        <div className="preloader__side preloader__side--right">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="preloader__side-svg">
            <g opacity="0.5">
              {/* Server Row 1 */}
              <rect x="15" y="22" width="90" height="20" rx="3" stroke="currentColor" strokeWidth="1" />
              <circle cx="28" cy="32" r="2.5" fill="currentColor" className="animate-blink-1" />
              <circle cx="38" cy="32" r="2.5" fill="currentColor" className="animate-blink-2" />
              <line x1="75" y1="32" x2="90" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

              {/* Server Row 2 */}
              <rect x="15" y="50" width="90" height="20" rx="3" stroke="currentColor" strokeWidth="1" />
              <circle cx="28" cy="60" r="2.5" fill="currentColor" className="animate-blink-3" />
              <circle cx="38" cy="60" r="2.5" fill="currentColor" className="animate-blink-1" />
              <line x1="75" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

              {/* Server Row 3 */}
              <rect x="15" y="78" width="90" height="20" rx="3" stroke="currentColor" strokeWidth="1" />
              <circle cx="28" cy="88" r="2.5" fill="currentColor" className="animate-blink-2" />
              <circle cx="38" cy="88" r="2.5" fill="currentColor" className="animate-blink-3" />
              <line x1="75" y1="88" x2="90" y2="88" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            </g>
            
            {/* Background connection path */}
            <path d="M 8,20 L 8,100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.25" className="animate-flow-dash" />
          </svg>
        </div>
      </div>
      
      <div className="preloader__word"><span>digital</span><span>matter.</span></div>
    </div>

    <div className="preloader__line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
  </div>
}
