import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header id="navbar" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(10,12,20,0.7)] border-b border-[rgba(255,255,255,0.04)]">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <Logo size={44} />
          <span className="text-white font-semibold">Abhi Dev</span>
        </Link>

        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="nav-link text-muted hover:text-accent transition-colors">Home</Link>
          <Link to="/about" className="nav-link text-muted hover:text-accent transition-colors">About</Link>
          <Link to="/projects" className="nav-link text-muted hover:text-accent transition-colors">Projects</Link>
          <Link to="/contact" className="nav-link text-muted hover:text-accent transition-colors">Contact</Link>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu" className="text-muted p-2">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-full'} bg-[rgba(5,6,10,0.9)] border-t border-[rgba(255,255,255,0.02)]`}>
        <div className="px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setOpen(false)} className="text-white py-2">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-white py-2">About</Link>
          <Link to="/projects" onClick={() => setOpen(false)} className="text-white py-2">Projects</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="text-white py-2">Contact</Link>
        </div>
      </div>
    </header>
  )
}
