import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero({ data }) {
  const heroRef = useRef(null)
  const orbGroupRef = useRef(null)
  const cardRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.to('.hero-orb', {
        y: (index) => (index % 2 === 0 ? -18 : 18),
        x: (index) => (index % 2 === 0 ? 14 : -14),
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
        ease: 'sine.inOut',
      })
    }, heroRef)

    const handleMouseMove = (event) => {
      const bounds = heroRef.current?.getBoundingClientRect()
      if (!bounds) return
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5

      if (orbGroupRef.current) {
        gsap.to(orbGroupRef.current, {
          x: x * 28,
          y: y * 22,
          duration: 0.9,
          ease: 'power3.out',
        })
      }

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotateY: x * 10,
          rotateX: y * -10,
          transformPerspective: 1000,
          duration: 0.9,
          ease: 'power3.out',
        })
      }
    }

    const handleMouseLeave = () => {
      if (orbGroupRef.current) {
        gsap.to(orbGroupRef.current, { x: 0, y: 0, duration: 1, ease: 'power3.out' })
      }
      if (cardRef.current) {
        gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 1, ease: 'power3.out' })
      }
    }

    const node = heroRef.current
    node?.addEventListener('mousemove', handleMouseMove)
    node?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node?.removeEventListener('mousemove', handleMouseMove)
      node?.removeEventListener('mouseleave', handleMouseLeave)
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="section-shell noise-overlay overflow-hidden px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--line-soft)] bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Stream Digital Services | Noida, UP
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.08}
            className="max-w-4xl text-balance text-[2.9rem] font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-[4rem] md:text-[5rem] xl:text-[6rem]"
          >
            Full Stack Developer with experience in
            <span className="bg-[linear-gradient(135deg,var(--accent),#fff3d0_52%,var(--accent-cool))] bg-clip-text text-transparent">
              {' '}
              MERN, Next.js, and TypeScript.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.16}
            className="mt-8 max-w-3xl text-balance text-lg leading-8 text-[var(--text-secondary)] md:text-xl"
          >
            {data.personal.intro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-7 py-4 font-semibold text-black shadow-[0_18px_48px_rgba(227,181,92,0.28)] transition duration-300 hover:-translate-y-0.5"
            >
              Explore projects
              <span className="transition duration-300 group-hover:translate-x-1">-&gt;</span>
            </a>
            <a
              href={data.personal.resume}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/5 px-7 py-4 font-medium text-white transition duration-300 hover:border-[var(--line-strong)] hover:bg-white/10"
            >
              Download latest resume
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.32}
            className="mt-12 grid gap-4 xl:grid-cols-3"
          >
            {data.highlights.map((item) => (
              <div key={item} className="glass-panel rounded-[24px] p-4">
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative">
          <div ref={orbGroupRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-orb absolute left-4 top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(227,181,92,0.42),_transparent_70%)] blur-2xl" />
            <div className="hero-orb absolute right-12 top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(134,167,255,0.26),_transparent_72%)] blur-3xl" />
            <div className="hero-orb absolute bottom-16 left-16 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.16),_transparent_72%)] blur-3xl" />
          </div>

          <motion.div
            ref={cardRef}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="luxury-ring glass-panel relative overflow-hidden rounded-[34px] p-5 md:p-6"
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(227,181,92,0.22),_transparent_70%)]" />
            <div className="relative grid gap-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Profile</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{data.personal.name}</h2>
                </div>
                <span className="rounded-full border border-[rgba(227,181,92,0.3)] bg-[rgba(227,181,92,0.08)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  {data.personal.location}
                </span>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]">
                <img
                  src={data.personal.image}
                  alt={`Portrait of ${data.personal.name}`}
                  loading="eager"
                  className="aspect-[4/4.8] w-full object-cover object-center"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Professional summary</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{data.personal.summary}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(134,167,255,0.14),rgba(255,255,255,0.04))] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Contact</p>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                    <p>{data.personal.email}</p>
                    <p>{data.personal.phone}</p>
                    <p>{data.personal.social.linkedin.replace('https://', '')}</p>
                    <p>{data.personal.social.github.replace('https://', '')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
