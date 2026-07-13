import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

function splitText(element, mode = 'words') {
  if (!element) return () => {}

  const original = element.textContent ?? ''
  const segments = mode === 'chars' ? Array.from(original) : original.split(' ')

  element.innerHTML = segments
    .map((segment, index) => {
      const value = segment === ' ' ? '&nbsp;' : segment
      const spacer = mode === 'words' && index < segments.length - 1 ? '<span class="split-space">&nbsp;</span>' : ''
      return `<span class="split-unit"><span class="split-unit__inner">${value}</span></span>${spacer}`
    })
    .join('')

  return () => {
    element.textContent = original
  }
}

export default function Home({ data }) {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const projectRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(0)

  const metrics = useMemo(
    () => [
      { value: '04', label: 'resume-backed builds' },
      { value: '01', label: 'semester rank streak' },
      { value: '60fps', label: 'motion target' },
    ],
    []
  )

  const timeline = useMemo(
    () => [
      {
        label: 'Now',
        title: 'Shipping in production',
        body: data.personal.intro,
      },
      {
        label: '2026',
        title: 'Stream Digital Services',
        body: data.experience[0].roles[0].points[0],
      },
      {
        label: '2026',
        title: 'Internship to full-time conversion',
        body: data.highlights[0],
      },
      {
        label: '2025',
        title: 'Animation-rich product work',
        body: data.experience[1].roles[0].points[0],
      },
    ],
    [data]
  )

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const root = rootRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      const cleanups = []

      root.querySelectorAll('[data-split="words"]').forEach((element) => {
        cleanups.push(splitText(element, 'words'))
        gsap.fromTo(
          element.querySelectorAll('.split-unit__inner'),
          { yPercent: 120, rotateX: -90, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.04,
            ease: 'power4.out',
            scrollTrigger: element.closest('section')
              ? {
                  trigger: element,
                  start: 'top 85%',
                  once: true,
                }
              : undefined,
          }
        )
      })

      gsap.fromTo(
        '.hero-layer',
        { y: 80, opacity: 0, rotateX: -14 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        }
      )

      gsap.utils.toArray('[data-float]').forEach((element) => {
        gsap.to(element, {
          y: Number(element.dataset.float) * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('section') ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      gsap.utils.toArray('.reveal-panel').forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: 'inset(0 0 100% 0 round 28px)', y: 80 },
          {
            clipPath: 'inset(0 0 0% 0 round 28px)',
            y: 0,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          }
        )
      })

      gsap.utils.toArray('.beam-card').forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 40 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })

      gsap.fromTo(
        '.timeline-beam__fill',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-scene',
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      )

      const mm = gsap.matchMedia()
      mm.add('(min-width: 980px)', () => {
        if (!projectRef.current) return undefined

        const count = data.projects.length

        return ScrollTrigger.create({
          trigger: projectRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * (count + 0.9)}`,
          pin: '.projects-pin',
          scrub: true,
          onUpdate: (self) => {
            const index = Math.min(count - 1, Math.floor(self.progress * count))
            setActiveProject(index)
          },
        })
      })

      if (heroRef.current) {
        const handleMouseMove = (event) => {
          const bounds = heroRef.current.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width - 0.5
          const y = (event.clientY - bounds.top) / bounds.height - 0.5

          gsap.to('.hero-visual', {
            rotateY: x * 14,
            rotateX: y * -12,
            x: x * 24,
            y: y * 18,
            duration: 1.1,
            ease: 'power3.out',
          })

          gsap.to('.hero-spotlight', {
            xPercent: x * 18,
            yPercent: y * 18,
            duration: 0.8,
            ease: 'power2.out',
          })
        }

        const handleLeave = () => {
          gsap.to('.hero-visual', {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
          })
          gsap.to('.hero-spotlight', {
            xPercent: 0,
            yPercent: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
        }

        heroRef.current.addEventListener('mousemove', handleMouseMove)
        heroRef.current.addEventListener('mouseleave', handleLeave)

        cleanups.push(() => {
          heroRef.current?.removeEventListener('mousemove', handleMouseMove)
          heroRef.current?.removeEventListener('mouseleave', handleLeave)
        })
      }

      return () => {
        mm.revert()
        cleanups.forEach((cleanup) => cleanup())
      }
    }, root)

    return () => ctx.revert()
  }, [data.projects.length, prefersReducedMotion])

  return (
    <div ref={rootRef} className="experience-root">
      <section ref={heroRef} className="hero-scene">
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="hero-mist hero-mist--left" aria-hidden="true" />
        <div className="hero-mist hero-mist--right" aria-hidden="true" />

        <div className="scene-header hero-layer">
          <span>Interactive portfolio</span>
          <span>Full stack engineer / creative frontend focus</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-layer">Ghaziabad to production-grade web experiences</div>
            <h1 className="hero-title hero-layer" data-split="words">
              Building premium interfaces that reward curiosity.
            </h1>
            <p className="hero-summary hero-layer">
              {data.personal.summary}
            </p>

            <div className="hero-actions hero-layer">
              <MagneticButton href="#projects" className="button button--primary" data-cursor="scroll">
                Explore the work
              </MagneticButton>
              <MagneticButton href={data.personal.resume} className="button button--ghost">
                Open latest resume
              </MagneticButton>
            </div>

            <div className="hero-metrics hero-layer">
              {metrics.map((metric) => (
                <div key={metric.label} className="metric-card">
                  <span>{metric.value}</span>
                  <p>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-stage hero-layer">
            <div className="hero-visual">
              <div className="visual-card visual-card--portrait reveal-panel">
                <img src={data.personal.image} alt={data.personal.name} loading="eager" />
                <div className="visual-card__meta">
                  <span>{data.personal.name}</span>
                  <span>{data.personal.title}</span>
                </div>
              </div>

              <div className="visual-card visual-card--floating" data-float="42">
                <span>Current role</span>
                <strong>Junior Software Developer</strong>
                <p>{data.experience[0].company}</p>
              </div>

              <div className="visual-card visual-card--quote" data-float="-36">
                <span>Design intent</span>
                <p>
                  Motion is used as structure, not decoration. The goal is to make every layer feel authored.
                </p>
              </div>

              <div className="hero-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="marquee-band hero-layer" aria-hidden="true">
          <div>
            Scroll-driven storytelling · Magnetic interactions · Parallax depth · Cinematic transitions ·
          </div>
          <div>
            Scroll-driven storytelling · Magnetic interactions · Parallax depth · Cinematic transitions ·
          </div>
        </div>
      </section>

      <section className="manifesto-scene">
        <div className="scene-intro">
          <span className="eyebrow">What this portfolio is optimizing for</span>
          <h2 data-split="words">Not just readability. Memorability.</h2>
        </div>

        <div className="manifesto-layout">
          <article className="manifesto-card reveal-panel">
            <span>01</span>
            <h3>Spatial hierarchy</h3>
            <p>
              Sections behave like scenes with their own lighting, rhythm, and contrast profile instead of repeating the
              same card grid.
            </p>
          </article>
          <article className="manifesto-card reveal-panel">
            <span>02</span>
            <h3>Story-led motion</h3>
            <p>
              Text, media, and interface chrome reveal on different timings so the eye keeps discovering depth instead
              of consuming everything at once.
            </p>
          </article>
          <article className="manifesto-card reveal-panel">
            <span>03</span>
            <h3>Product-minded craft</h3>
            <p>
              The interaction language points back to real engineering work: performance, async thinking, structure,
              and polish under constraints.
            </p>
          </article>
        </div>
      </section>

      <section id="projects" ref={projectRef} className="projects-scene">
        <div className="projects-pin">
          <div className="scene-intro">
            <span className="eyebrow">Projects as the centerpiece</span>
            <h2 data-split="words">Each project gets treated like a product launch.</h2>
          </div>

          <div className="projects-layout">
            <div className="projects-stack">
              {data.projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className={`project-stage ${index === activeProject ? 'is-active' : ''}`}
                  onClick={() => setActiveProject(index)}
                  animate={{
                    scale: index === activeProject ? 1 : 0.88,
                    opacity: index === activeProject ? 1 : 0.22,
                    y: (index - activeProject) * 42,
                    rotateX: index === activeProject ? 0 : 9,
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="project-stage__image" data-cursor="view">
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                  </div>
                  <div className="project-stage__glow" />
                </motion.article>
              ))}
            </div>

            <div className="project-detail">
              <AnimatePresence mode="wait">
                <motion.div
                  key={data.projects[activeProject].title}
                  initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="project-rail">
                    {data.projects.map((project, index) => (
                      <button
                        key={project.title}
                        type="button"
                        className={index === activeProject ? 'is-active' : ''}
                        onClick={() => setActiveProject(index)}
                      >
                        {project.title}
                      </button>
                    ))}
                  </div>
                  <span className="project-index">
                    {String(activeProject + 1).padStart(2, '0')} / {String(data.projects.length).padStart(2, '0')}
                  </span>
                  <h3>{data.projects[activeProject].title}</h3>
                  <p className="project-summary">{data.projects[activeProject].summary}</p>

                  <div className="project-panels">
                    <div className="project-panel">
                      <span>Problem</span>
                      <p>{data.projects[activeProject].problem}</p>
                    </div>
                    <div className="project-panel">
                      <span>Impact</span>
                      <ul>
                        {data.projects[activeProject].impact.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="stack-cloud">
                    {data.projects[activeProject].stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <MagneticButton
                      href={data.projects[activeProject].liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button button--primary"
                    >
                      Launch preview
                    </MagneticButton>
                    {data.projects[activeProject].githubUrl ? (
                      <MagneticButton
                        href={data.projects[activeProject].githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button--ghost"
                      >
                        View code
                      </MagneticButton>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-scene">
        <div className="scene-intro">
          <span className="eyebrow">Stack in motion</span>
          <h2 data-split="words">Core capabilities visualized as a live system.</h2>
        </div>

        <div className="skills-layout">
          <div className="skills-orbit reveal-panel">
            <div className="skills-orbit__core">
              <span>Frontend</span>
              <strong>React / Next / Motion</strong>
            </div>
            <div className="orbit-node orbit-node--one">TypeScript</div>
            <div className="orbit-node orbit-node--two">Node.js</div>
            <div className="orbit-node orbit-node--three">REST APIs</div>
            <div className="orbit-node orbit-node--four">MongoDB</div>
          </div>

          <div className="skills-bars">
            {data.skills.slice(0, 6).map((group, index) => (
              <div key={group.category} className="skill-bar beam-card">
                <div className="skill-bar__top">
                  <span>{group.category}</span>
                  <strong>{String((index + 5) * 12).padStart(2, '0')}</strong>
                </div>
                <div className="skill-bar__track">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: Math.min(0.96, 0.48 + index * 0.08) }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p>{group.items.slice(0, 4).join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-scene">
        <div className="scene-intro">
          <span className="eyebrow">Career beam</span>
          <h2 data-split="words">A timeline with momentum, not a static resume dump.</h2>
        </div>

        <div className="timeline-shell">
          <div className="timeline-beam">
            <span className="timeline-beam__fill" />
          </div>
          <div className="timeline-cards">
            {timeline.map((entry) => (
              <article key={entry.title} className="beam-card">
                <span>{entry.label}</span>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-scene">
        <div className="contact-glow" aria-hidden="true" />
        <div className="contact-copy">
          <span className="eyebrow">Let&apos;s build something unforgettable</span>
          <h2 data-split="words">If the experience made you pause, the collaboration probably will too.</h2>
          <p>
            Open for full-time frontend, full stack, and creative development roles where performance and polish are both
            part of the brief.
          </p>
        </div>

        <div className="contact-panel reveal-panel">
          <a href={`mailto:${data.personal.email}`} className="contact-line" data-cursor="open">
            {data.personal.email}
          </a>
          <a href={data.personal.social.linkedin} target="_blank" rel="noreferrer" className="contact-line" data-cursor="open">
            LinkedIn
          </a>
          <a href={data.personal.social.github} target="_blank" rel="noreferrer" className="contact-line" data-cursor="open">
            GitHub
          </a>
          <MagneticButton href={data.personal.resume} className="button button--primary contact-button">
            Download resume
          </MagneticButton>
        </div>

        <footer className="footer-band">
          <span>Abhishek Kumar</span>
          <span>Built with React, GSAP, Lenis, and Framer Motion</span>
          <span>{data.personal.location}</span>
        </footer>
      </section>
    </div>
  )
}
