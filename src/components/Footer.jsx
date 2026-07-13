import React from 'react'

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[30px] border border-[var(--line-soft)] bg-[rgba(8,10,16,0.72)] px-6 py-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Abhishek Kumar</p>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
            Full Stack Developer (MERN / Next.js / TypeScript) based in Ghaziabad, India.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)] md:items-end">
          <a href="#hero" className="transition duration-300 hover:text-white">
            Back to top
          </a>
          <p>(c) 2026 All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
