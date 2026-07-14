import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function Particles() {
  const points = useRef()
  const positions = useMemo(() => Float32Array.from({ length: 1200 }, () => (Math.random() - 0.5) * 12), [])
  
  useFrame((state) => {
    if (points.current) {
      // Slow background rotation base
      const baseRotationY = state.clock.elapsedTime * 0.04
      
      // Target rotation based on mouse pointer position
      const targetX = state.pointer.y * 0.4
      const targetY = baseRotationY + state.pointer.x * 0.4
      
      // Smooth lerp (0.08 interpolation factor)
      points.current.rotation.x += (targetX - points.current.rotation.x) * 0.08
      points.current.rotation.y += (targetY - points.current.rotation.y) * 0.08
    }
  })
  
  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#b7d7ff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  )
}

export default function HeroCanvas() {
  return <div className="hero-canvas" aria-hidden="true"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4] }}><Suspense fallback={null}><Particles /></Suspense></Canvas></div>
}
