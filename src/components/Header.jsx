import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  return (
    <header id="navbar" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(10,12,20,0.7)] border-b border-[rgba(255,255,255,0.04)]">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <Logo size={44} />
          <span className="text-white font-semibold">Abhi Dev</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link text-muted hover:text-accent transition-colors">Home</Link>
          <Link to="/about" className="nav-link text-muted hover:text-accent transition-colors">About</Link>
          <Link to="/projects" className="nav-link text-muted hover:text-accent transition-colors">Projects</Link>
          <Link to="/contact" className="nav-link text-muted hover:text-accent transition-colors">Contact</Link>
        </nav>
        <button id="mobile-menu-btn" className="md:hidden text-muted">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </header>
  )
}
