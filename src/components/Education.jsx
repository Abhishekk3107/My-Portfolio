import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Education({ data }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="education" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Education</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Academic history and scores taken directly from the resume.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {data.education.map((item, index) => (
            <motion.article
              key={`${item.degree}-${item.period}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="glass-panel rounded-[28px] p-6"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{item.period}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.degree}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.institution}</p>
              {item.details ? <p className="mt-1 text-sm text-[var(--text-muted)]">{item.details}</p> : null}
              <p className="mt-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white inline-flex">
                {item.score}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
