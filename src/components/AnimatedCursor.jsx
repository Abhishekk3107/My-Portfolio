import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current

    if (!ring || !dot || !label) return undefined

    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power2.out' })
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power2.out' })

    const labels = {
      drag: 'Drag',
      open: 'Open',
      view: 'View',
      scroll: 'Scroll',
      play: 'Play',
    }

    const setMode = (mode = '') => {
      const nextLabel = labels[mode] ?? ''
      label.textContent = nextLabel

      gsap.to(ring, {
        scale: mode ? 1.65 : 1,
        borderColor: mode ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.14)',
        backgroundColor: mode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
        duration: 0.35,
        ease: 'power2.out',
      })

      gsap.to(label, {
        opacity: nextLabel ? 1 : 0,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    const handleMove = (event) => {
      moveRingX(event.clientX)
      moveRingY(event.clientY)
      moveDotX(event.clientX)
      moveDotY(event.clientY)
    }

    const handleMouseOver = (event) => {
      const trigger = event.target.closest('[data-cursor]')
      setMode(trigger?.getAttribute('data-cursor') ?? '')
    }

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.86, duration: 0.18, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.5, duration: 0.18, ease: 'power2.out' })
    }

    const handleMouseUp = () => {
      gsap.to(ring, { scale: label.textContent ? 1.65 : 1, duration: 0.24, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.24, ease: 'power2.out' })
    }

    const handleLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.25, ease: 'power2.out' })
    }

    const handleEnter = () => {
      gsap.to([ring, dot], { opacity: 1, duration: 0.25, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  return (
    <div className="cursor-shell" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
