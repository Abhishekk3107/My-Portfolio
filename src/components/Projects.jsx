import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function ProjectActions({ liveUrl, githubUrl }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={liveUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5"
      >
        Live preview <span aria-hidden="true">↗</span>
      </a>
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-white/5 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:border-[var(--line-strong)] hover:bg-white/10"
        >
          GitHub
        </a>
      ) : null}
    </div>
  )
}

export default function Projects({ data }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Projects</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
              Only the projects explicitly listed in the latest resume.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
              Each project keeps the purpose, features, stack, and impact aligned with the resume instead of broad portfolio filler.
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--line-soft)] bg-white/5 px-5 py-4 text-sm text-[var(--text-secondary)]">
            {data.projects.length} resume-listed projects
          </div>
        </motion.div>

        <div className="grid gap-8">
          {data.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              className="glass-panel overflow-hidden rounded-[34px]"
            >
              <div className={`grid gap-0 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative min-h-[320px] overflow-hidden border-b border-white/10 lg:min-h-[100%] lg:border-b-0 lg:border-r">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,4,6,0.22))]" />
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    <span>{project.category}</span>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">{project.title}</h3>
                  <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">{project.summary}</p>

                  <div className="mt-8 grid gap-5 md:grid-cols-3">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Problem solved</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{project.problem}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Features</p>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(227,181,92,0.12),rgba(255,255,255,0.03))] p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Impact</p>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                        {project.impact.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
