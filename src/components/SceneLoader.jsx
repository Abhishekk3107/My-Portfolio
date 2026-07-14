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
    
    {/* Left Side Panel (IDE file explorer) */}
    <div className="preloader-side-panel preloader-side-panel--left" style={{
      position: 'absolute',
      left: '4vw',
      top: '32%',
      width: '200px',
      fontFamily: 'DM Mono, monospace',
      fontSize: '13px',
      fontWeight: 'bold',
      color: '#000000',
      opacity: 0.85,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      pointerEvents: 'none',
      textAlign: 'left'
    }}>
      <div style={{ fontWeight: '900', borderBottom: '1px solid #000000', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Workspace</div>
      <div>📁 src</div>
      <div style={{ marginLeft: '12px' }}>📁 components</div>
      <div style={{ marginLeft: '24px' }}>📄 Hero.jsx <span style={{ fontSize: '9px', background: 'rgba(0,0,0,0.15)', padding: '1px 4px', borderRadius: '2px', fontWeight: '900' }}>M</span></div>
      <div style={{ marginLeft: '24px' }}>📄 Canvas.jsx</div>
      <div style={{ marginLeft: '12px' }}>📁 pages</div>
      <div style={{ marginLeft: '24px' }}>📄 Home.jsx</div>
      <div style={{ marginLeft: '12px' }}>📁 styles</div>
      <div style={{ marginLeft: '24px' }}>📄 theme.css</div>
      <div>📄 package.json</div>
      <div>📄 vite.config.ts</div>
    </div>

    {/* Right Side Panel (Vite/HMR terminal console) */}
    <div className="preloader-side-panel preloader-side-panel--right" style={{
      position: 'absolute',
      right: '4vw',
      top: '32%',
      width: '220px',
      fontFamily: 'DM Mono, monospace',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#000000',
      opacity: 0.85,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.55rem',
      pointerEvents: 'none',
      textAlign: 'left'
    }}>
      <div style={{ fontWeight: '900', borderBottom: '1px solid #000000', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Console</div>
      <div style={{ opacity: 0.7 }}>[16:24:02] vite v5.2.11 ready</div>
      <div>➜ Network: localhost</div>
      <div className="animate-pulse-fast">● Connecting db...</div>
      <div>✔ Database secure</div>
      <div>ℹ loading 42 modules</div>
      <div className="animate-code-1">▸ compiling src/main.jsx...</div>
      <div>✔ success in 420ms</div>
      <div style={{ opacity: 0.7 }}>HMR connection active</div>
    </div>

    <div className="preloader__center">
      <div className="preloader__layout" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2rem' }}>
        
        {/* Large, Rich Coding & System Architecture Illustration Grid */}
        <svg width="100%" height="240" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '800px', overflow: 'visible' }}>
          {/* Grid lines in background to make it look like a blueprint/workspace */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

          {/* Left Panel: Code Workspace / Editor (X: 20, Y: 20) */}
          <g transform="translate(40, 20)">
            {/* Editor Window Outline */}
            <rect x="0" y="0" width="220" height="160" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <rect x="0" y="0" width="220" height="25" rx="8" fill="currentColor" opacity="0.05" />
            {/* Window Controls */}
            <circle cx="15" cy="12" r="3" fill="#ff5f56" />
            <circle cx="27" cy="12" r="3" fill="#ffbd2e" />
            <circle cx="39" cy="12" r="3" fill="#27c93f" />
            <text x="75" y="15" fill="currentColor" fontSize="8" fontFamily="DM Mono" opacity="0.4" letterSpacing="0.05em">index.tsx</text>

            {/* Sidebar File Explorer Wireframe */}
            <line x1="50" y1="25" x2="50" y2="160" stroke="currentColor" strokeWidth="1.0" opacity="0.15" />
            <rect x="10" y="35" width="30" height="6" rx="1" fill="currentColor" opacity="0.15" />
            <rect x="15" y="48" width="25" height="5" rx="1" fill="currentColor" opacity="0.1" />
            <rect x="15" y="59" width="28" height="5" rx="1" fill="currentColor" opacity="0.15" />
            <rect x="15" y="70" width="20" height="5" rx="1" fill="currentColor" opacity="0.1" />

            {/* Editor Content / Code Lines */}
            {/* Import statements */}
            <rect x="60" y="38" width="85" height="6" rx="1.5" fill="currentColor" opacity="0.35" className="animate-code-1" />
            <rect x="60" y="49" width="60" height="6" rx="1.5" fill="currentColor" opacity="0.25" className="animate-code-2" />
            
            {/* Component/Function code lines */}
            <rect x="60" y="65" width="120" height="7" rx="2" fill="var(--muted)" opacity="0.4" />
            <rect x="72" y="79" width="105" height="6" rx="1.5" fill="var(--acid)" opacity="0.6" className="animate-code-3" />
            <rect x="72" y="90" width="135" height="6" rx="1.5" fill="currentColor" opacity="0.25" className="animate-code-1" />
            
            {/* Nested block */}
            <rect x="84" y="104" width="90" height="6" rx="1.5" fill="currentColor" opacity="0.3" className="animate-code-2" />
            <rect x="84" y="115" width="110" height="6" rx="1.5" fill="var(--acid)" opacity="0.5" className="animate-code-3" />
            
            {/* Closing braces */}
            <rect x="72" y="130" width="40" height="6" rx="1.5" fill="currentColor" opacity="0.25" />
            <rect x="60" y="141" width="20" height="6" rx="1.5" fill="currentColor" opacity="0.35" />
          </g>

          {/* Central Area: Flowing Git Branch System & Processing Core (X: 280 to 520) */}
          {/* Main Ring Dial */}
          <g transform="translate(400, 100)">
            {/* Outer Dial */}
            <circle cx="0" cy="0" r="72" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.25" className="animate-spin-slow" />
            <circle cx="0" cy="0" r="54" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" className="animate-spin-reverse" />
            
            {/* Radial Line Accents */}
            <line x1="0" y1="-78" x2="0" y2="78" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="-78" y1="0" x2="78" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />

            {/* Core bracket icons inside */}
            <text x="-16" y="8" fill="var(--acid)" fontSize="24" fontFamily="Playfair Display" fontWeight="bold" opacity="0.75">&lt;/&gt;</text>
            
            {/* Orbiting commit nodes */}
            <g className="animate-spin-slow">
              <circle cx="54" cy="0" r="4.5" fill="var(--acid)" className="animate-pulse-fast" />
              <circle cx="-54" cy="0" r="4" fill="currentColor" opacity="0.7" />
              <circle cx="0" cy="54" r="4" fill="currentColor" opacity="0.7" />
              <circle cx="0" cy="-54" r="4.5" fill="var(--acid)" />
            </g>
          </g>

          {/* Git Branch Lines Connecting Left (Editor) to Center, and Center to Right (Server) */}
          {/* Editor to Center connection */}
          <path d="M 260,100 L 300,100 C 315,100 315,70 330,70" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.25" />
          <path d="M 260,100 L 300,100 C 315,100 315,130 330,130" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.25" />
          {/* Commit Nodes on branches */}
          <circle cx="300" cy="100" r="3.5" fill="currentColor" opacity="0.5" />
          <circle cx="330" cy="70" r="3" fill="var(--acid)" opacity="0.6" />
          <circle cx="330" cy="130" r="3" fill="currentColor" opacity="0.6" />

          {/* Right Panel: Cloud Infrastructure / Server Stack / API Database (X: 540, Y: 20) */}
          <g transform="translate(540, 20)">
            {/* Server Rack Outline */}
            <rect x="0" y="0" width="220" height="160" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <rect x="0" y="0" width="220" height="25" rx="8" fill="currentColor" opacity="0.05" />
            <text x="15" y="16" fill="currentColor" fontSize="8" fontFamily="DM Mono" opacity="0.4" letterSpacing="0.05em">API / DATABASE STACK</text>
            
            {/* Active Server Node 1 */}
            <g transform="translate(15, 38)">
              <rect x="0" y="0" width="190" height="32" rx="4" stroke="currentColor" strokeWidth="1.0" fill="rgba(255,255,255,0.02)" opacity="0.4" />
              <circle cx="15" cy="16" r="3" fill="var(--acid)" className="animate-blink-1" />
              <circle cx="27" cy="16" r="3" fill="currentColor" opacity="0.3" className="animate-blink-2" />
              <text x="48" y="20" fill="currentColor" fontSize="8" fontFamily="DM Mono" opacity="0.75">POST /api/v1/auth</text>
              <rect x="145" y="12" width="35" height="8" rx="1.5" fill="var(--acid)" opacity="0.2" />
            </g>

            {/* Active Server Node 2 */}
            <g transform="translate(15, 78)">
              <rect x="0" y="0" width="190" height="32" rx="4" stroke="currentColor" strokeWidth="1.0" fill="rgba(255,255,255,0.02)" opacity="0.4" />
              <circle cx="15" cy="16" r="3" fill="currentColor" opacity="0.3" className="animate-blink-3" />
              <circle cx="27" cy="16" r="3" fill="var(--acid)" className="animate-blink-1" />
              <text x="48" y="20" fill="currentColor" fontSize="8" fontFamily="DM Mono" opacity="0.75">GET /api/v1/projects</text>
              <rect x="145" y="12" width="35" height="8" rx="1.5" fill="currentColor" opacity="0.15" />
            </g>

            {/* Active Server Node 3 (DB node showing database structure) */}
            <g transform="translate(15, 118)">
              <rect x="0" y="0" width="190" height="32" rx="4" stroke="currentColor" strokeWidth="1.0" fill="rgba(255,255,255,0.02)" opacity="0.4" />
              <path d="M 12,11 L 22,11 M 12,16 L 22,16 M 12,21 L 22,21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              <circle cx="17" cy="16" r="6" stroke="currentColor" strokeWidth="1.0" fill="none" opacity="0.4" />
              <text x="48" y="20" fill="currentColor" fontSize="8" fontFamily="DM Mono" opacity="0.75">MongoDB / Connected</text>
              <circle cx="165" cy="16" r="3" fill="var(--acid)" className="animate-pulse-fast" />
            </g>
          </g>

          {/* Flowing data stream connector between Center and Right */}
          <path d="M 472,100 L 510,100 C 525,100 525,60 540,60" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.25" />
          <path d="M 472,100 L 510,100 C 525,100 525,140 540,140" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.25" />
          <circle cx="510" cy="100" r="3" fill="var(--acid)" opacity="0.6" />
        </svg>

        <div className="preloader__word" style={{ marginTop: '0.5rem' }}>
          <span>digital</span>
          <span>matter.</span>
        </div>
      </div>
    </div>

    <div className="preloader__line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
  </div>
}
