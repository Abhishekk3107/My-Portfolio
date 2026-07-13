import React, { useRef } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({
  as = 'a',
  className = '',
  children,
  intensity = 0.35,
  ...props
}) {
  const ref = useRef(null)

  const handleMove = (event) => {
    const node = ref.current
    if (!node) return

    const bounds = node.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2

    gsap.to(node, {
      x: x * intensity,
      y: y * intensity,
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  const handleLeave = () => {
    const node = ref.current
    if (!node) return

    gsap.to(node, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.45)',
    })
  }

  const Component = as

  return (
    <Component
      ref={ref}
      className={`magnetic-button ${className}`.trim()}
      data-cursor={props['data-cursor'] ?? 'open'}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      <span className="magnetic-button__inner">{children}</span>
    </Component>
  )
}
