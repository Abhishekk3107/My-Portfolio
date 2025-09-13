import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Projects({ data }) {
  const [filter, setFilter] = useState('all')
  const [hoveredCard, setHoveredCard] = useState(null)
  const projectsRef = useRef(null)
  const headerRef = useRef(null)
  const filtersRef = useRef(null)
  const gridRef = useRef(null)
  const backgroundRef = useRef(null)
  
  const techs = Array.from(new Set(data.projects.flatMap(p => p.technologies)))
  const filtered = data.projects.filter(p => filter === 'all' || p.technologies.includes(filter))

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline()
    
    // Animate header
    tl.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    
    // Animate filters with stagger
    tl.fromTo(filtersRef.current.children,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: projectsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo('.tech-icon',
          { scale: 0, rotation: 180 },
          { scale: 1, rotation: 0, duration: 1, stagger: 0.1, ease: "back.out(1.7)" }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    // Animate project cards on filter change
    const cards = gridRef.current?.children
    if (!cards) return

    const tl = gsap.timeline()
    
    // Exit animation
    tl.to(cards, {
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    })
    
    // Enter animation
    tl.fromTo(cards,
      { opacity: 0, scale: 0.8, y: 30, rotationY: -15 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotationY: 0,
        duration: 0.6, 
        stagger: 0.08, 
        ease: "back.out(1.7)",
        delay: 0.2
      }
    )

  }, [filter, filtered])

  const handleCardHover = (index, isEntering) => {
    const card = gridRef.current?.children[index]
    if (!card) return

    if (isEntering) {
      setHoveredCard(index)
      gsap.to(card, {
        y: -15,
        scale: 1.03,
        rotationY: 5,
        rotationX: 5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
        duration: 0.4,
        ease: "power2.out"
      })
      
      // Animate image
      const img = card.querySelector('img')
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.4,
          ease: "power2.out"
        })
      }

      // Animate tech badges
      const badges = card.querySelectorAll('.tech-badge')
      gsap.fromTo(badges,
        { y: 5, opacity: 0.7 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      )
    } else {
      setHoveredCard(null)
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        duration: 0.4,
        ease: "power2.out"
      })
      
      const img = card.querySelector('img')
      if (img) {
        gsap.to(img, {
          scale: 1,
          filter: "brightness(1) saturate(1)",
          duration: 0.4,
          ease: "power2.out"
        })
      }
    }
  }

  const handleFilterClick = (newFilter) => {
    if (newFilter === filter) return
    
    // Animate filter button
    const activeBtn = document.querySelector('.filter-active')
    const newBtn = document.querySelector(`[data-filter="${newFilter}"]`)
    
    if (activeBtn) {
      gsap.to(activeBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    }
    
    if (newBtn) {
      gsap.fromTo(newBtn,
        { scale: 1 },
        { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }
      )
    }
    
    setFilter(newFilter)
  }

  return (
    <section ref={projectsRef} id="projects" className="py-20 bg-transparent relative overflow-hidden">
      {/* Tech-themed Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 font-mono text-white/20 text-sm rotate-12">{'<section>'}</div>
          <div className="absolute top-40 right-20 font-mono text-white/15 text-xs -rotate-6">{'useState()'}</div>
          <div className="absolute bottom-40 left-1/4 font-mono text-white/10 text-lg rotate-45">{'{ }'}</div>
          <div className="absolute bottom-20 right-1/3 font-mono text-white/20 text-sm -rotate-12">{'map()'}</div>
          <div className="absolute top-1/2 left-8 font-mono text-white/15 text-xs rotate-90">{'filter'}</div>
          <div className="absolute top-1/3 right-12 font-mono text-white/10 text-md -rotate-25">{'props'}</div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0">
          <div className="tech-icon absolute top-24 right-24 w-8 h-8 text-white/10">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div className="tech-icon absolute bottom-32 left-16 w-6 h-6 text-white/15">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
            </svg>
          </div>
          <div className="tech-icon absolute top-1/3 left-12 w-10 h-10 text-white/8">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
              My Projects
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent/50 rounded-full"></div>
          </div>
          <div className="text-right">
            <p className="text-muted text-lg">
              Showing <span className="text-accent font-semibold">{filtered.length}</span> of {data.projects.length}
            </p>
            <p className="text-xs text-muted/60">Interactive Projects</p>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-start gap-4 mb-12">
          <button 
            data-filter="all"
            onClick={() => handleFilterClick('all')} 
            className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === 'all' 
                ? 'filter-active bg-accent text-black shadow-lg shadow-accent/25' 
                : 'bg-[rgba(255,255,255,0.03)] text-muted hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
            }`}
          >
            <span className="relative z-10">All</span>
            {filter === 'all' && (
              <div className="absolute inset-0 bg-accent rounded-full opacity-20 animate-pulse"></div>
            )}
          </button>
          
          {techs.map(tech => (
            <button 
              key={tech}
              data-filter={tech}
              onClick={() => handleFilterClick(tech)} 
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === tech 
                  ? 'filter-active bg-accent text-black shadow-lg shadow-accent/25' 
                  : 'bg-[rgba(255,255,255,0.03)] text-muted hover:bg-[rgba(255,255,255,0.08)] hover:text-white border border-[rgba(255,255,255,0.05)]'
              }`}
            >
              <span className="relative z-10">{tech}</span>
              {filter === tech && (
                <div className="absolute inset-0 bg-accent rounded-full opacity-20 animate-pulse"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
          ))}
        </div>

        {/* Enhanced Projects Grid */}
        <div ref={gridRef} id="projects-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <article 
              key={`${project.title}-${filter}`} 
              className="project-card group bg-[rgba(255,255,255,0.02)] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl border border-[rgba(255,255,255,0.05)] backdrop-blur-sm"
              onMouseEnter={() => handleCardHover(idx, true)}
              onMouseLeave={() => handleCardHover(idx, false)}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Image Container with Overlay */}
              <div className="relative w-full h-48 bg-[rgba(255,255,255,0.02)] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-500" 
                  onError={(e) => { e.currentTarget.src = '/assets/images/placeholder.png' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-accent transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-white group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted mb-4 text-sm md:text-base leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* Enhanced Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIdx) => (
                    <span 
                      key={tech} 
                      className="tech-badge px-3 py-1 bg-[rgba(255,255,255,0.03)] text-accent text-xs rounded-full border border-[rgba(255,255,255,0.08)] hover:bg-accent hover:text-black transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${techIdx * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 bg-[rgba(255,255,255,0.04)] text-accent border border-[rgba(255,255,255,0.08)] px-4 py-2.5 rounded-lg text-center hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 font-medium"
                    >
                      View Code
                    </a>
                  )}
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 bg-accent text-black px-4 py-2.5 rounded-lg text-center hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 font-semibold"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
