import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 32)
      setScrollProgress(total > 0 ? scrollTop / total : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto max-w-7xl rounded-full border px-4 py-3 md:px-6 ${
            scrolled
              ? 'border-[var(--line-strong)] bg-[rgba(7,10,16,0.84)] shadow-[0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl'
              : 'border-[var(--line-soft)] bg-[rgba(8,10,16,0.55)] backdrop-blur-lg'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex min-w-0 items-center gap-3">
              <div className="luxury-ring flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(227,181,92,0.28),rgba(134,167,255,0.18))] text-sm font-semibold tracking-[0.24em] text-[var(--accent)]">
                AK
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.28em] text-white">
                  Abhishek Kumar
                </p>
                <p className="truncate text-xs text-[var(--text-muted)]">
                  Full Stack Developer (MERN / Next.js / TypeScript)
                </p>
              </div>
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-[var(--text-secondary)] transition duration-300 hover:bg-white/5 hover:text-white focus-visible:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden rounded-full border border-[var(--line-soft)] bg-white/5 px-5 py-2 text-sm font-medium text-white transition duration-300 hover:border-[var(--line-strong)] hover:bg-white/10 md:inline-flex"
              >
                Contact
              </a>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/5 text-white xl:hidden"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="relative block h-4 w-5">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                      menuOpen ? 'translate-y-[7px] rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                      menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${
                      menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="mt-3 h-px overflow-hidden rounded-full bg-white/5">
            <div
              aria-hidden="true"
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-cool))] transition-[width] duration-200"
              style={{ width: `${Math.max(scrollProgress * 100, 6)}%` }}
            />
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="fixed left-4 right-4 top-24 z-50 rounded-[28px] border border-[var(--line-strong)] bg-[rgba(7,10,16,0.94)] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:hidden"
            >
              <div className="space-y-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base text-[var(--text-secondary)] transition duration-300 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
