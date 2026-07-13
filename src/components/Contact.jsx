import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { gsap } from 'gsap'

const channels = (personal) => [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/[^+\d]/g, '')}` },
  { label: 'LinkedIn', value: personal.social.linkedin.replace('https://', ''), href: personal.social.linkedin },
  { label: 'GitHub', value: personal.social.github.replace('https://', ''), href: personal.social.github },
]

export default function Contact({ data }) {
  const [state, handleSubmit] = useForm('xpwjvrgp')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const formRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const saved = window.localStorage.getItem('portfolio-contact-draft')
    if (!saved) return undefined
    try {
      setForm(JSON.parse(saved))
    } catch {
      return undefined
    }
    return undefined
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('portfolio-contact-draft', JSON.stringify(form))
  }, [form])

  useEffect(() => {
    if (!state.succeeded || prefersReducedMotion || !formRef.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { scale: 0.98, boxShadow: '0 0 0 rgba(0,0,0,0)' },
        {
          scale: 1,
          boxShadow: '0 18px 48px rgba(227,181,92,0.16)',
          duration: 0.6,
          ease: 'power3.out',
        }
      )
    }, formRef)

    return () => ctx.revert()
  }, [prefersReducedMotion, state.succeeded])

  useEffect(() => {
    if (!state.succeeded) return
    setForm({ name: '', email: '', message: '' })
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('portfolio-contact-draft')
    }
  }, [state.succeeded])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  return (
    <section id="contact" className="section-shell px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Contact</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Resume-aligned professional contact details, all in one place.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            Reach out for professional opportunities, engineering discussions, or project collaboration.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.aside
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="grid gap-5"
          >
            <div className="glass-panel rounded-[32px] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Direct channels</p>
              <div className="mt-6 grid gap-4">
                {channels(data.personal).map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-[var(--line-strong)] hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">{channel.label}</p>
                    <p className="mt-3 text-base font-medium text-white break-all">{channel.value}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[32px] bg-[linear-gradient(180deg,rgba(227,181,92,0.12),rgba(255,255,255,0.03))] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Current profile</p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" /> Full Stack Developer (MERN / Next.js / TypeScript)</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" /> Junior Software Developer at Stream Digital Services</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" /> MCA student, expected 2028</li>
              </ul>
            </div>
          </motion.aside>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="glass-panel rounded-[32px] p-6 md:p-8"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Message me</p>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">Use the form or contact me directly through the channels shown here.</p>
              </div>
              <div className="rounded-full border border-[rgba(227,181,92,0.28)] bg-[rgba(227,181,92,0.08)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                Ghaziabad, India
              </div>
            </div>

            {state.succeeded ? (
              <div className="mb-8 rounded-[24px] border border-[rgba(227,181,92,0.32)] bg-[rgba(227,181,92,0.08)] p-5 text-sm leading-7 text-white">
                Your message has been sent successfully. I&apos;ll get back to you soon.
              </div>
            ) : null}

            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-[var(--text-secondary)]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[var(--text-muted)]"
                    placeholder="Your name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-2 text-sm text-[#f5a8a8]" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-[var(--text-secondary)]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[var(--text-muted)]"
                    placeholder="you@example.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-2 text-sm text-[#f5a8a8]" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-[var(--text-secondary)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-[var(--text-muted)]"
                  placeholder="Share your opportunity, project scope, or message."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-2 text-sm text-[#f5a8a8]" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-7 py-4 font-semibold text-black transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state.submitting ? 'Sending message...' : 'Send message'}
                {!state.submitting ? <span aria-hidden="true">-&gt;</span> : null}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
