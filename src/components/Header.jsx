import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Enhanced Logo component with white text
const Logo = ({ size = 40 }) => {
  const logoRef = useRef(null)
  
  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    // Logo hover animation (subtle only)
    const handleMouseEnter = () => {
      gsap.to(logo, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    logo.addEventListener('mouseenter', handleMouseEnter)
    logo.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter)
      logo.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={logoRef}
      style={{width: size, height: size}} 
      className="flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-white font-bold cursor-pointer relative overflow-hidden group"
    >
      <span style={{fontSize: size/2}} className="select-none relative z-10 font-bold text-white">AK</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>
  )
}

// Enhanced NavLink with advanced hover effects
const NavLink = ({ href, children, onClick }) => {
  const linkRef = useRef(null)
  const underlineRef = useRef(null)
  
  useEffect(() => {
    const link = linkRef.current
    const underline = underlineRef.current
    if (!link || !underline) return

    const handleMouseEnter = () => {
      gsap.to(link, {
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(underline, {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(link, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(underline, {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    link.addEventListener('mouseenter', handleMouseEnter)
    link.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter)
      link.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <a 
      ref={linkRef}
      href={href} 
      onClick={onClick}
      className="nav-link relative text-muted hover:text-accent transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/5"
    >
      {children}
      <div 
        ref={underlineRef}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accent/60 transform scale-x-0 origin-left"
        style={{ opacity: 0 }}
      ></div>
    </a>
  )
}

// Enhanced Mobile NavLink
const MobileNavLink = ({ href, children, closeMenu }) => {
  const mobileRef = useRef(null)
  
  useEffect(() => {
    const link = mobileRef.current
    if (!link) return

    const handleMouseEnter = () => {
      gsap.to(link, {
        x: 10,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(link, {
        x: 0,
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out"
      })
    }

    link.addEventListener('mouseenter', handleMouseEnter)
    link.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter)
      link.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <a 
      ref={mobileRef}
      href={href} 
      onClick={closeMenu}
      className="text-white block py-3 px-4 text-lg rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-accent"
    >
      {children}
    </a>
  )
}

// Hamburger Menu Icon Component
const HamburgerIcon = ({ isOpen, onClick }) => {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useEffect(() => {
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const line3 = line3Ref.current

    if (isOpen) {
      gsap.to(line1, { rotation: 45, y: 6, duration: 0.3 })
      gsap.to(line2, { opacity: 0, duration: 0.2 })
      gsap.to(line3, { rotation: -45, y: -6, duration: 0.3 })
    } else {
      gsap.to(line1, { rotation: 0, y: 0, duration: 0.3 })
      gsap.to(line2, { opacity: 1, duration: 0.2 })
      gsap.to(line3, { rotation: 0, y: 0, duration: 0.3 })
    }
  }, [isOpen])

  return (
    <button 
      onClick={onClick} 
      aria-label="Toggle menu" 
      className="relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none group"
    >
      <span ref={line1Ref} className="block w-6 h-0.5 bg-muted group-hover:bg-accent transition-colors duration-200 origin-center"></span>
      <span ref={line2Ref} className="block w-6 h-0.5 bg-muted group-hover:bg-accent transition-colors duration-200 my-1"></span>
      <span ref={line3Ref} className="block w-6 h-0.5 bg-muted group-hover:bg-accent transition-colors duration-200 origin-center"></span>
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    // Initial navbar animation
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    )

    // Scroll-based navbar background changes only
    ScrollTrigger.create({
      start: "top -10",
      end: 99999,
      onUpdate: (self) => {
        const isScrolled = self.scroll() > 50
        setScrolled(isScrolled)
        
        if (isScrolled) {
          gsap.to(headerRef.current, {
            backgroundColor: "rgba(10, 12, 20, 0.9)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            duration: 0.3,
            ease: "power2.out"
          })
        } else {
          gsap.to(headerRef.current, {
            backgroundColor: "rgba(10, 12, 20, 0.7)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(255, 255, 255, 0.04)",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }
    })

    // Mobile menu animation
    if (open) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )
      gsap.fromTo(mobileMenuRef.current.children[0].children,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [open])

  const closeMenu = () => {
    gsap.to(mobileMenuRef.current.children[0].children,
      { x: -20, opacity: 0, duration: 0.2, stagger: 0.05 }
    )
    gsap.to(mobileMenuRef.current,
      { opacity: 0, y: -10, duration: 0.3, delay: 0.1, ease: "power2.in" }
    )
    setTimeout(() => setOpen(false), 300)
  }

  return (
    <>
      {/* Fixed Floating Curved Navbar - Properly curved from both sides */}
      <header 
        ref={headerRef}
        id="navbar" 
        className="fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-full border"
        style={{
          backgroundColor: "rgba(10, 12, 20, 0.7)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "50px" // Full curve from both sides
        }}
      >
        <div className="container mx-auto px-8 flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center h-full group">
            <Logo size={44} />
            <div className="ml-3 overflow-hidden">
              <span className="text-white font-semibold text-lg group-hover:text-accent transition-colors duration-300">
                Abhi Dev
              </span>
              <div className="h-0.5 w-0 bg-gradient-to-r from-accent to-accent/60 group-hover:w-full transition-all duration-500"></div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full space-x-2">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center h-full">
            <HamburgerIcon isOpen={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </header>

      {/* Mobile Menu - Also with proper curves */}
      {open && (
        <div 
          ref={mobileMenuRef}
          className="fixed top-28 left-4 right-4 md:hidden z-40 border"
          style={{
            backgroundColor: "rgba(5, 6, 10, 0.95)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "24px" // Curved from both sides
          }}
        >
          <div className="px-8 py-6 flex flex-col space-y-2">
            <MobileNavLink href="#hero" closeMenu={closeMenu}>Home</MobileNavLink>
            <MobileNavLink href="#about" closeMenu={closeMenu}>About</MobileNavLink>
            <MobileNavLink href="#projects" closeMenu={closeMenu}>Projects</MobileNavLink>
            <MobileNavLink href="#contact" closeMenu={closeMenu}>Contact</MobileNavLink>
          </div>
          
          {/* Mobile menu decorative elements - curved properly */}
          <div 
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            style={{ borderRadius: "24px 24px 0 0" }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            style={{ borderRadius: "0 0 24px 24px" }}
          ></div>
        </div>
      )}

      {/* Background overlay when mobile menu is open */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  )
}
