import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer({ data }) {
  const footerRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const socialRef = useRef(null)

  useEffect(() => {
    // Footer entrance animation
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 90%",
      onEnter: () => {
        const tl = gsap.timeline()
        
        tl.fromTo('.footer-section',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        )
        
        tl.fromTo('.footer-divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
      }
    })

    // Logo hover animation
    const logo = logoRef.current
    if (logo) {
      const handleMouseEnter = () => {
        gsap.to(logo, {
          scale: 1.05,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(logo, {
          scale: 1,
          rotation: 0,
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
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Professional SVG Icons
  const EmailIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )

  const LocationIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )

  const ArrowUpIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  )

  // Social Media Icons
  const socialIcons = {
    linkedin: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C8.396 0 7.989.013 7.041.072 6.094.131 5.42.333 4.844.63c-.611.32-1.08.703-1.527 1.15a4.108 4.108 0 00-1.15 1.527C1.87 4.183 1.668 4.857 1.609 5.804 1.55 6.751 1.537 7.158 1.537 12.017c0 4.859.013 5.266.072 6.213.059.947.261 1.621.558 2.198.32.611.703 1.08 1.15 1.527.447.447.916.83 1.527 1.15.577.297 1.251.499 2.198.558.947.059 1.354.072 6.213.072 4.859 0 5.266-.013 6.213-.072.947-.059 1.621-.261 2.198-.558.611-.32 1.08-.703 1.527-1.15.447-.447.83-.916 1.15-1.527.297-.577.499-1.251.558-2.198.059-.947.072-1.354.072-6.213 0-4.859-.013-5.266-.072-6.213-.059-.947-.261-1.621-.558-2.198-.32-.611-.703-1.08-1.15-1.527a4.108 4.108 0 00-1.527-1.15C18.376 1.87 17.702 1.668 16.755 1.609 15.808 1.55 15.401 1.537 10.542 1.537h1.475zm0 2.153c4.765 0 5.33.018 7.213.103.881.04 1.36.187 1.677.311.422.164.722.36 1.038.677.317.316.513.616.677 1.038.124.317.271.796.311 1.677.085 1.883.103 2.448.103 7.213s-.018 5.33-.103 7.213c-.04.881-.187 1.36-.311 1.677-.164.422-.36.722-.677 1.038a2.79 2.79 0 01-1.038.677c-.317.124-.796.271-1.677.311-1.882.085-2.447.103-7.213.103s-5.33-.018-7.213-.103c-.881-.04-1.36-.187-1.677-.311a2.79 2.79 0 01-1.038-.677 2.79 2.79 0 01-.677-1.038c-.124-.317-.271-.796-.311-1.677-.085-1.883-.103-2.448-.103-7.213s.018-5.33.103-7.213c.04-.881.187-1.36.311-1.677.164-.422.36-.722.677-1.038a2.79 2.79 0 011.038-.677c.317-.124.796-.271 1.677-.311 1.883-.085 2.448-.103 7.213-.103z"/>
        <path d="M12.017 15.33a3.313 3.313 0 110-6.627 3.313 3.313 0 010 6.627zM12.017 7.052a4.965 4.965 0 100 9.93 4.965 4.965 0 000-9.93zM19.68 6.84a1.16 1.16 0 11-2.32 0 1.16 1.16 0 012.32 0z"/>
      </svg>
    )
  }

  // Fixed scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const currentYear = new Date().getFullYear()

  // Quick links data
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Web Development',
    'React Applications', 
    'UI/UX Design',
    'API Development'
  ]

  const technologies = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'Firebase'
  ]

  return (
    <footer ref={footerRef} className="bg-[rgba(5,6,10,0.95)] backdrop-blur-sm border-t border-[rgba(255,255,255,0.08)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-6 sm:top-10 left-4 sm:left-10 font-mono text-white/10 text-xs sm:text-sm rotate-12">{'</>'}</div>
        <div className="absolute top-12 sm:top-20 right-8 sm:right-20 font-mono text-white/8 text-xs -rotate-6">{'dev'}</div>
        <div className="absolute bottom-12 sm:bottom-20 left-1/4 font-mono text-white/12 text-md sm:text-lg rotate-45">{'{ }'}</div>
        <div className="absolute bottom-6 sm:bottom-10 right-1/3 font-mono text-white/10 text-xs sm:text-sm -rotate-12">{'code'}</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          
          {/* Brand Section */}
          <div className="footer-section space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div 
                ref={logoRef}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-white font-bold cursor-pointer"
              >
                <span className="text-base sm:text-lg font-extrabold">AK</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Abhishek Kumar</h3>
                <p className="text-muted text-xs sm:text-sm">Full Stack Developer</p>
              </div>
            </div>

            <p className="text-muted leading-relaxed text-xs sm:text-sm">
              Crafting digital experiences with modern technologies. Passionate about creating innovative web solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-muted text-xs sm:text-sm">
                <EmailIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${data?.personal?.email || 'abhishek@example.com'}`}
                  className="hover:text-accent transition-colors duration-300 break-all"
                >
                  {data?.personal?.email || 'abhishek@example.com'}
                </a>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-muted text-xs sm:text-sm">
                <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <span>{data?.personal?.location || 'Ghaziabad, UP'}</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-muted text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-green-400">Available for projects</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-4 sm:h-6 bg-accent rounded-full"></div>
              Quick Links
            </h4>
            <ul ref={linksRef} className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2 group text-xs sm:text-sm"
                  >
                    <span className="w-1 h-1 bg-muted rounded-full group-hover:bg-accent transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-4 sm:h-6 bg-accent rounded-full"></div>
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-1 h-1 bg-muted rounded-full"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Technologies */}
          <div className="footer-section space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-4 sm:h-6 bg-accent rounded-full"></div>
              Connect & Tech
            </h4>

            {/* Social Links */}
            <div ref={socialRef} className="flex gap-2 sm:gap-3">
              {data?.personal?.social && Object.entries(data.personal.social).slice(0, 3).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-muted hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                  title={platform}
                >
                  {socialIcons[platform] || socialIcons.github}
                </a>
              ))}
            </div>

            {/* Technologies */}
            <div>
              <h5 className="text-white font-medium mb-2 sm:mb-3 text-xs sm:text-sm">Technologies</h5>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-muted text-xs hover:text-accent hover:border-accent/50 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent mb-6 sm:mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-muted text-xs sm:text-sm">
              &copy; {currentYear} <span className="text-accent font-medium">Abhishek Kumar</span>. All rights reserved.
            </p>
            <p className="text-muted/60 text-xs mt-1">
              Built with ❤️ using React, Tailwind CSS & GSAP
            </p>
          </div>

          {/* Back to Top - Fixed functionality */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-muted hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
            title="Back to top"
          >
            <ArrowUpIcon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-xs sm:text-sm font-medium">Top</span>
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent/50 to-accent"></div>
    </footer>
  )
}
