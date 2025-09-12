import React from 'react'

export default function Header() {
  return (
    <header id="navbar" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(10,12,20,0.7)] border-b border-[rgba(255,255,255,0.04)]">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <a href="#hero" className="text-2xl font-bold text-white">Abhi Dev</a>
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="nav-link text-muted hover:text-accent transition-colors">Home</a>
          <a href="#about" className="nav-link text-muted hover:text-accent transition-colors">About</a>
          <a href="#projects" className="nav-link text-muted hover:text-accent transition-colors">Projects</a>
          <a href="#contact" className="nav-link text-muted hover:text-accent transition-colors">Contact</a>
        </nav>
        <button id="mobile-menu-btn" className="md:hidden text-muted">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </header>
  )
}
