import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ["Full Stack Web Developer", "UI Designer", "Open Source Enthusiast", "React Developer", "Frontend Engineer"]

export default function HeroTextRotator() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{height: 40}} className="inline-block overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={index} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="font-semibold text-accent">
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
