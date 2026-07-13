import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SceneLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId = 0
    let start = 0

    const loop = (time) => {
      if (!start) start = time
      const elapsed = time - start
      const next = Math.min(100, Math.round((elapsed / 1900) * 100))
      setProgress(next)
      if (next < 100) {
        frameId = window.requestAnimationFrame(loop)
      }
    }

    frameId = window.requestAnimationFrame(loop)

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <motion.div
      className="scene-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        className="scene-loader__veil"
        exit={{
          clipPath: 'inset(0 0 100% 0 round 0)',
          transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        <div className="scene-loader__topline">
          <span>Abhishek Kumar</span>
          <span>{String(progress).padStart(2, '0')}</span>
        </div>
        <div className="scene-loader__title">
          <span>Building</span>
          <span>an interface</span>
          <span>worth exploring.</span>
        </div>
        <div className="scene-loader__bar">
          <motion.span animate={{ scaleX: progress / 100 }} transition={{ ease: 'linear' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}
