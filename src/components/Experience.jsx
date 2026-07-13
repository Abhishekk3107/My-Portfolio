import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Experience({ data }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="experience" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Experience</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Company experience, role progression, and responsibilities taken directly from the resume.
          </h2>
        </motion.div>

        <div className="relative pl-6 md:pl-10">
          <div aria-hidden="true" className="absolute left-[9px] top-3 h-[calc(100%-24px)] w-px bg-[linear-gradient(180deg,rgba(227,181,92,0.65),rgba(255,255,255,0.08))] md:left-[17px]" />
          <div className="grid gap-6">
            {data.experience.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.overallPeriod}`}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="glass-panel relative rounded-[30px] p-6 md:p-8"
              >
                <span className="absolute -left-[30px] top-8 h-5 w-5 rounded-full border border-[rgba(227,181,92,0.5)] bg-[var(--bg-base)] shadow-[0_0_0_6px_rgba(227,181,92,0.1)] md:-left-[38px]" />
                <div className="grid gap-5 md:grid-cols-[0.32fr_0.68fr] md:gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{item.overallPeriod}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.company}</h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{item.location}</p>
                  </div>
                  <div className="grid gap-6">
                    {item.roles.map((role) => (
                      <div key={`${role.title}-${role.period}`} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                          <h4 className="text-xl font-semibold tracking-[-0.03em] text-white">{role.title}</h4>
                          <p className="text-sm text-[var(--text-muted)]">{role.period}</p>
                        </div>
                        <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                          {role.points.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
