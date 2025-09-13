import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Refs for animations
  const contactRef = useRef(null)
  const headerRef = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)
  const formRef = useRef(null)
  const socialLinksRef = useRef(null)
  const backgroundRef = useRef(null)

  // Enhanced validation
  function validateField(name, value) {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required'
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required'
        } else if (value.length < 10) {
          newErrors.message = 'Message must be at least 10 characters'
        } else {
          delete newErrors.message
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    validateField(name, value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Validate all fields
    const isNameValid = validateField('name', form.name)
    const isEmailValid = validateField('email', form.email)
    const isMessageValid = validateField('message', form.message)
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      // Shake animation for errors
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.out"
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Success animation
    gsap.timeline()
      .to(formRef.current, {
        scale: 0.95,
        opacity: 0.5,
        duration: 0.3
      })
      .to(formRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      })

    setIsSubmitting(false)
    setIsSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline()
    
    // Background floating elements
    gsap.fromTo(backgroundRef.current?.children || [],
      { opacity: 0, y: 20, rotation: -10 },
      { opacity: 0.1, y: 0, rotation: 0, duration: 2, stagger: 0.2, ease: "power2.out" }
    )

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )

    // Columns animation
    tl.fromTo(leftColumnRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    
    tl.fromTo(rightColumnRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )

    // Social links hover animations
    const socialLinks = socialLinksRef.current?.children
    if (socialLinks) {
      Array.from(socialLinks).forEach(link => {
        const handleMouseEnter = () => {
          gsap.to(link, { y: -3, scale: 1.05, duration: 0.3, ease: "back.out(1.7)" })
        }
        const handleMouseLeave = () => {
          gsap.to(link, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" })
        }
        
        link.addEventListener('mouseenter', handleMouseEnter)
        link.addEventListener('mouseleave', handleMouseLeave)
        
        return () => {
          link.removeEventListener('mouseenter', handleMouseEnter)
          link.removeEventListener('mouseleave', handleMouseLeave)
        }
      })
    }

    // ScrollTrigger for contact section
    ScrollTrigger.create({
      trigger: contactRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo('.contact-info-item',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Form persistence
  useEffect(() => {
    const saved = localStorage.getItem('contactFormData')
    if (saved) {
      try {
        setForm(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading saved form data:', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(form))
  }, [form])

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

  const LinkedInIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )

  const GitHubIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )

  const InstagramIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C8.396 0 7.989.013 7.041.072 6.094.131 5.42.333 4.844.63c-.611.32-1.08.703-1.527 1.15a4.108 4.108 0 00-1.15 1.527C1.87 4.183 1.668 4.857 1.609 5.804 1.55 6.751 1.537 7.158 1.537 12.017c0 4.859.013 5.266.072 6.213.059.947.261 1.621.558 2.198.32.611.703 1.08 1.15 1.527.447.447.916.83 1.527 1.15.577.297 1.251.499 2.198.558.947.059 1.354.072 6.213.072 4.859 0 5.266-.013 6.213-.072.947-.059 1.621-.261 2.198-.558.611-.32 1.08-.703 1.527-1.15.447-.447.83-.916 1.15-1.527.297-.577.499-1.251.558-2.198.059-.947.072-1.354.072-6.213 0-4.859-.013-5.266-.072-6.213-.059-.947-.261-1.621-.558-2.198-.32-.611-.703-1.08-1.15-1.527a4.108 4.108 0 00-1.527-1.15C18.376 1.87 17.702 1.668 16.755 1.609 15.808 1.55 15.401 1.537 10.542 1.537h1.475zm0 2.153c4.765 0 5.33.018 7.213.103.881.04 1.36.187 1.677.311.422.164.722.36 1.038.677.317.316.513.616.677 1.038.124.317.271.796.311 1.677.085 1.883.103 2.448.103 7.213s-.018 5.33-.103 7.213c-.04.881-.187 1.36-.311 1.677-.164.422-.36.722-.677 1.038a2.79 2.79 0 01-1.038.677c-.317.124-.796.271-1.677.311-1.882.085-2.447.103-7.213.103s-5.33-.018-7.213-.103c-.881-.04-1.36-.187-1.677-.311a2.79 2.79 0 01-1.038-.677 2.79 2.79 0 01-.677-1.038c-.124-.317-.271-.796-.311-1.677-.085-1.883-.103-2.448-.103-7.213s.018-5.33.103-7.213c.04-.881.187-1.36.311-1.677.164-.422.36-.722.677-1.038a2.79 2.79 0 011.038-.677c.317-.124.796-.271 1.677-.311 1.883-.085 2.448-.103 7.213-.103z"/>
      <path d="M12.017 15.33a3.313 3.313 0 110-6.627 3.313 3.313 0 010 6.627zM12.017 7.052a4.965 4.965 0 100 9.93 4.965 4.965 0 000-9.93zM19.68 6.84a1.16 1.16 0 11-2.32 0 1.16 1.16 0 012.32 0z"/>
    </svg>
  )

  return (
    <section ref={contactRef} id="contact" className="py-20 bg-transparent relative overflow-hidden">
      {/* Tech-themed Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 font-mono text-white/5 text-2xl rotate-12">{'<Contact/>'}</div>
        <div className="absolute top-40 right-20 font-mono text-white/8 text-lg -rotate-6">{'useState()'}</div>
        <div className="absolute bottom-40 left-1/4 font-mono text-white/6 text-xl rotate-45">{'form'}</div>
        <div className="absolute bottom-20 right-1/3 font-mono text-white/7 text-md -rotate-12">{'submit'}</div>
        <div className="absolute top-1/2 left-8 font-mono text-white/5 text-sm rotate-90">{'validation'}</div>
        <div className="absolute top-1/3 right-12 font-mono text-white/8 text-lg -rotate-25">{'=>'}</div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. Let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Contact Info */}
            <div ref={leftColumnRef} className="space-y-8">
              {/* Main Contact Info */}
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-accent rounded-full"></div>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="contact-info-item flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-accent/30 transition-all duration-300 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      <EmailIcon />
                    </div>
                    <div>
                      <p className="text-muted text-sm font-medium">Email</p>
                      <a 
                        href={`mailto:${data.personal.email || 'abhishekk@example.com'}`}
                        className="text-white font-semibold hover:text-accent transition-colors duration-300"
                      >
                        {data.personal.email || 'abhishekk@example.com'}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="contact-info-item flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-accent/30 transition-all duration-300 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      <LocationIcon />
                    </div>
                    <div>
                      <p className="text-muted text-sm font-medium">Location</p>
                      <p className="text-white font-semibold">{data.personal.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-accent rounded-full"></div>
                  Follow Me
                </h3>
                
                <div ref={socialLinksRef} className="flex gap-4">
                  <a 
                    href={data.personal.social.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-muted hover:text-white hover:border-accent/50 transition-all duration-300 group"
                  >
                    <LinkedInIcon className="w-5 h-5 group-hover:text-accent transition-colors duration-300" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  
                  <a 
                    href={data.personal.social.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-muted hover:text-white hover:border-accent/50 transition-all duration-300 group"
                  >
                    <GitHubIcon className="w-5 h-5 group-hover:text-accent transition-colors duration-300" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  
                  <a 
                    href={data.personal.social.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-muted hover:text-white hover:border-accent/50 transition-all duration-300 group"
                  >
                    <InstagramIcon className="w-5 h-5 group-hover:text-accent transition-colors duration-300" />
                    <span className="font-medium">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <h4 className="text-white font-semibold">Quick Response Promise</h4>
                </div>
                <p className="text-muted text-sm">
                  I typically respond to all inquiries within 24 hours. For urgent matters, feel free to reach out directly via email.
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={rightColumnRef}>
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-accent rounded-full"></div>
                  Send Message
                </h3>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-green-400 font-medium">✓ Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">Your Name *</label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border ${
                          errors.name ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'
                        } rounded-lg text-white placeholder-muted focus:outline-none focus:border-accent/50 transition-all duration-300`}
                      />
                      {errors.name && <p className="mt-2 text-red-400 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">Email Address *</label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border ${
                          errors.email ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'
                        } rounded-lg text-white placeholder-muted focus:outline-none focus:border-accent/50 transition-all duration-300`}
                      />
                      {errors.email && <p className="mt-2 text-red-400 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">Message *</label>
                    <textarea 
                      id="message"
                      name="message" 
                      rows="6"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border ${
                        errors.message ? 'border-red-500' : 'border-[rgba(255,255,255,0.08)]'
                      } rounded-lg text-white placeholder-muted focus:outline-none focus:border-accent/50 transition-all duration-300 resize-none`}
                    />
                    {errors.message && <p className="mt-2 text-red-400 text-sm">{errors.message}</p>}
                    <p className="mt-2 text-muted text-xs">Minimum 10 characters required</p>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="w-full bg-accent text-black py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>

                  <p className="text-muted text-xs text-center">
                    By sending this message, you agree to be contacted regarding your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
