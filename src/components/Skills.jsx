import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function Skills({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const activeSkill = data.skills[activeIndex]

  return (
    <section id="skills" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Technical Skills</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Skill categories preserved directly from the resume.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            This section keeps the presentation interactive, but the categories and tools stay aligned to the latest resume wording.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="grid gap-4">
            {data.skills.map((skillGroup, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={skillGroup.category}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`glass-panel text-left rounded-[28px] p-6 transition duration-300 ${
                    isActive ? 'border-[var(--line-strong)] bg-white/10' : 'hover:bg-[rgba(255,255,255,0.07)]'
                  }`}
                  aria-pressed={isActive}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{skillGroup.category}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {skillGroup.items.length} skills in this category
                  </p>
                </button>
              )
            })}
          </div>

          <div className="glass-panel noise-overlay rounded-[32px] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.category}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid gap-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Active skill category</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{activeSkill.category}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                    Resume-aligned tools and concepts currently shown in this category.
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">Skills</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {activeSkill.items.map((tool, index) => (
                      <motion.span
                        key={tool}
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm text-white"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
