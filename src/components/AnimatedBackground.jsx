import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.blob', {
        y: '+=20',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 4,
        stagger: 0.5
      })

      gsap.from('.hero-fade', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} aria-hidden="true" className="animated-bg absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute left-10 top-10 w-72 h-72 blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4fd1c5" />
            <stop offset="100%" stopColor="#63b3ed" />
          </linearGradient>
        </defs>
        <path fill="url(#g1)" d="M43.1,-66.3C56.7,-58.3,69.1,-51.3,75.5,-39.1C81.9,-26.9,82.2,-9.5,77.3,6.2C72.5,21.9,62.4,35.9,50,46.6C37.7,57.2,23.1,64.3,6.6,63.9C-9.9,63.5,-19.8,55.7,-32.4,47.8C-45,39.9,-60.2,31.8,-66.6,18.9C-73,6,-70.6,-13.6,-62.6,-29.5C-54.6,-45.4,-41,-57.7,-25.3,-65.4C-9.7,-73,8.2,-76.1,24.2,-73.9C40.1,-71.6,54.6,-64.4,43.1,-66.3Z" transform="translate(100 100)"/>
      </svg>

      <svg className="absolute right-20 top-40 w-72 h-72 blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path fill="url(#g2)" d="M38.9,-62.6C50.3,-53,61,-44.6,69.1,-33.6C77.3,-22.6,82.9,-9,81.9,4.5C80.9,18,73.3,31.6,62.2,42.6C51.1,53.6,36.4,61.9,20.6,66.4C4.9,71,-11.9,71.9,-27.4,68.3C-42.8,64.7,-56.8,56.6,-64.2,43.9C-71.6,31.2,-72.4,13.9,-70.7,-3.8C-69,-21.5,-64.8,-38.5,-54.8,-49.3C-44.7,-60.1,-28.9,-64.8,-12.6,-72C3.8,-79.1,19.1,-88.6,33.3,-86.7C47.6,-84.7,62.8,-71.8,38.9,-62.6Z" transform="translate(100 100)"/>
      </svg>

      <svg className="absolute left-1/3 bottom-10 w-72 h-72 blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path fill="url(#g3)" d="M39.8,-60.7C54,-52.7,71.9,-49.1,75.1,-38.1C78.3,-27.1,66.9,-8.8,63.1,10.6C59.3,30,63.1,51.4,54.5,62.9C45.9,74.4,24.8,76,3.9,72.6C-17.1,69.2,-34.1,60.7,-46.6,48.8C-59.1,36.9,-67.2,21.5,-70.8,4.6C-74.4,-12.4,-73.5,-30.9,-63.1,-41.9C-52.6,-52.9,-32.7,-56.4,-14.1,-62.3C4.5,-68.3,22.9,-76.7,39.8,-60.7Z" transform="translate(100 100)"/>
      </svg>
    </div>
  )
}
