import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function Particles() {
  const points = useRef()
  const positions = useMemo(() => Float32Array.from({ length: 900 }, () => (Math.random() - 0.5) * 12), [])
  useFrame((state) => { if (points.current) { points.current.rotation.y = state.clock.elapsedTime * 0.035; points.current.rotation.x = state.pointer.y * 0.08 } })
  return <Points ref={points} positions={positions} stride={3} frustumCulled><PointMaterial transparent color="#b7d7ff" size={0.025} sizeAttenuation depthWrite={false} opacity={0.8} /></Points>
}

export default function HeroCanvas() {
  return <div className="hero-canvas" aria-hidden="true"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4] }}><Suspense fallback={null}><Particles /></Suspense></Canvas></div>
}
