import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const storyCards = [
  {
    eyebrow: 'Current work',
    title: 'Production optimization and API-focused development',
    body:
      'At Stream Digital Services, my work includes debugging and optimizing production React.js and Node.js applications, implementing code-splitting and component lazy loading, and integrating secure REST APIs for multi-tenant feature modules.',
  },
  {
    eyebrow: 'Previous internship',
    title: 'Next.js, Sanity CMS, and responsive frontend delivery',
    body:
      'At Glodias Tech, I built responsive and animation-rich web applications using Next.js and Sanity CMS, integrated REST APIs, and contributed to performance audits, state management improvements, and sprint-based code reviews.',
  },
  {
    eyebrow: 'Engineering habits',
    title: 'Version control, documentation, and Agile collaboration',
    body:
      'My recent experience also includes Git branching, PR reviews, conflict resolution, Swagger/OpenAPI documentation, unit testing exposure, and collaboration inside Agile sprint cycles.',
  },
]

export default function About({ data }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="about" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">About</p>
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Resume-backed background with real company experience and recent academic progression.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-[var(--text-secondary)]">{data.personal.summary}</p>
          <p className="max-w-xl text-base leading-8 text-[var(--text-muted)]">
            I completed my BCA with 81.83%, started my MCA in 2026, and currently work full-time after converting from internship to Junior Software Developer.
          </p>
        </motion.div>

        <div className="grid gap-5">
          {storyCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              className="glass-panel rounded-[28px] p-7 md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{card.eyebrow}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">{card.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
