import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import MagneticButton from './MagneticButton'
import profileImage from '../assets/Abhi.jpeg'

const links = [['/', 'Home'], ['/projects', 'Projects'], ['/about', 'About'], ['/contact', 'Contact']]

export default function SiteChrome({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  useGSAP(() => {
    gsap.fromTo('.route-curtain', { scaleY: 1 }, { scaleY: 0, transformOrigin: 'top', duration: 0.75, ease: 'power4.inOut' })
  }, { dependencies: [location.pathname], revertOnUpdate: true })
  return <>
    <div className="route-curtain" aria-hidden="true" />
    <header className="site-header">
      <Link to="/" className="brand" data-cursor="open" aria-label="Abhishek Kumar home"><img src={profileImage} alt="" /><b>Abhishek Kumar</b></Link>
      <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Primary">
        {links.map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={location.pathname === to ? 'active' : ''}>{label}</Link>)}
      </nav>
      <MagneticButton as={Link} to="/contact" className="header-cta">Let's talk <i>↗</i></MagneticButton>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? '×' : '≡'}</button>
    </header>
    {children}
  </>
}
