import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Credentials({ data }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="credentials" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Achievements & Certifications</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Verified accomplishments and recognized learning milestones.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-[30px] p-6 md:p-8"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Achievements</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
              {data.credentials.achievements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="glass-panel rounded-[30px] p-6 md:p-8"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Certifications</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
              {data.credentials.certifications.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
