import React, { lazy, Suspense, useRef, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import MagneticButton from '../components/MagneticButton'

const HeroCanvas = lazy(() => import('../components/HeroCanvas'))
gsap.registerPlugin(ScrollTrigger, Flip)
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function Reveal({ children }) {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.fromTo(ref.current, { autoAlpha: 0, y: 48 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: 'power4.out', clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true, invalidateOnRefresh: true },
    })
  }, { scope: ref })
  return <div ref={ref}>{children}</div>
}

function PageMotion({ children, className = '' }) {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.from(ref.current.querySelectorAll('[data-page-reveal]'), {
      autoAlpha: 0,
      y: 36,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility',
    })
    gsap.utils.toArray(ref.current.querySelectorAll('[data-scroll-reveal]')).forEach((element) => {
      gsap.fromTo(element, { autoAlpha: 0, y: 44 }, {
        autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true, invalidateOnRefresh: true },
      })
    })
  }, { scope: ref })
  return <main ref={ref} className={className}>{children}</main>
}

function Ticker() {
  const ref = useRef(null)
  useGSAP(() => {
    const content = ref.current.querySelector('.ticker__inner')
    const tween = gsap.to(content, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 })
    let lastScrollY = window.scrollY
    let settle
    const onScroll = () => {
      const velocity = Math.min(2.5, Math.abs(window.scrollY - lastScrollY) / 18)
      lastScrollY = window.scrollY
      tween.timeScale(1 + velocity)
      clearTimeout(settle)
      settle = setTimeout(() => gsap.to(tween, { timeScale: 1, duration: 0.8, ease: 'power2.out' }), 120)
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); clearTimeout(settle) }
  }, { scope: ref })
  const words = ['Available for full-stack work', 'React + Next.js', 'Node + Express', 'REST APIs', 'MongoDB + Firebase', 'Available for full-stack work', 'React + Next.js', 'Node + Express', 'REST APIs', 'MongoDB + Firebase']
  return <div className="ticker" ref={ref}><div className="ticker__inner">{words.map((word, i) => <span key={`${word}-${i}`}>{word}<i>✦</i></span>)}</div></div>
}

function ProjectCard({ project, index }) {
  const navigate = useNavigate(); const ref = useRef(null)
  const open = () => {
    const state = Flip.getState(ref.current)
    ref.current.classList.add('project-card--lift')
    Flip.from(state, { duration: 0.45, ease: 'power3.inOut', absolute: true })
    setTimeout(() => navigate(`/projects/${slugify(project.title)}`), 330)
  }
  return <article ref={ref} className={`project-card project-card--${index}`} onClick={open} data-cursor="view" tabIndex="0" role="link" onKeyDown={(event) => event.key === 'Enter' && open()}>
    <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
    <div className="project-card__shade" /><p>0{index + 1} / {project.category}</p><h3>{project.title}</h3><span className="project-card__arrow">↗</span>
  </article>
}

function Home({ data }) {
  const root = useRef(null)
  useGSAP(() => {
    gsap.from('.hero-reveal', { yPercent: 120, stagger: 0.08, duration: 1.15, ease: 'power4.out', delay: 0.1 })
    gsap.to('.hero-orb', { y: -80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: root })
  return <main ref={root}>
    <section className="hero"><Suspense fallback={null}><HeroCanvas /></Suspense><div className="hero-orb" />
      <p className="hero-kicker hero-reveal">Full-stack developer / India</p>
      <h1><span className="hero-reveal">Products built</span><span className="hero-reveal hero-title--accent">end to end.</span></h1>
      <div className="hero-bottom hero-reveal"><p>I’m Abhishek — a full-stack developer building fast, thoughtful web products with React, Next.js, Node.js, REST APIs, and data-driven backends.</p><img className="hero-portrait" src={data.personal.image} alt="Abhishek Kumar" /><MagneticButton as={Link} to="/projects" className="round-link">See selected work <i>↘</i></MagneticButton></div>
    </section>
    <Ticker />
    <section className="intro section"><Reveal><p className="eyebrow">Frontend craft, full-stack thinking</p><h2>From a sharp first click to a reliable <em>last API call.</em></h2><p className="lede">At Stream Digital Services, I work across production React.js and Node.js applications — debugging real-world issues, shaping scalable features, integrating secure APIs, and improving performance. I enjoy owning the details that turn an idea into a dependable product.</p></Reveal></section>
    <section className="work section"><Reveal><div className="section-top"><p className="eyebrow">Selected work</p><Link to="/projects">All projects ↗</Link></div></Reveal><div className="projects-grid">{data.projects.map((project, i) => <Reveal key={project.title}><ProjectCard project={project} index={i} /></Reveal>)}</div></section>
    <AboutStrip data={data} /><Footer />
  </main>
}

function AboutStrip({ data }) {
  const ref = useRef(null)
  useGSAP(() => {
    if (innerWidth < 800) return
    const cards = gsap.utils.toArray('.pin-step')
    return gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=180%', pin: true, scrub: 0.7 } }).fromTo(cards, { x: 160, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.35 })
  }, { scope: ref })
  return <section className="about-strip" ref={ref}><div><p className="eyebrow">How I work</p><h2>Built with care,<br /><em>backed by code.</em></h2></div><div className="pin-steps"><article className="pin-step"><b>01</b><p>Responsive interfaces that feel clear on every screen</p></article><article className="pin-step"><b>02</b><p>Reliable Node.js services and secure REST API integrations</p></article><article className="pin-step"><b>03</b><p>{data.personal.location} / open to meaningful product work</p></article></div></section>
}

function Projects({ data }) { return <PageMotion className="page"><header className="page-hero" data-page-reveal><p className="eyebrow">A small selection</p><h1>Work that earns<br /><em>a second look.</em></h1></header><section className="projects-list">{data.projects.map((p, i) => <Reveal key={p.title}><ProjectCard project={p} index={i} /></Reveal>)}</section><Footer /></PageMotion> }

function ProjectDetail({ data }) {
  const { slug } = useParams(); const project = data.projects.find((p) => slugify(p.title) === slug)
  if (!project) return <main className="page empty"><h1>That project is elsewhere.</h1><Link to="/projects">Back to projects</Link></main>
  return <PageMotion className="detail"><Link to="/projects" className="back" data-page-reveal>← All projects</Link><header data-page-reveal><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p>{project.summary}</p></header><img className="detail-image" src={project.image} alt={`${project.title} preview`} data-page-reveal /><section className="case-grid" data-scroll-reveal><div><p className="eyebrow">The brief</p><h2>{project.problem}</h2></div><div><p className="eyebrow">Built with</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="eyebrow">What shipped</p><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></div></section>{project.liveUrl && <MagneticButton href={project.liveUrl} target="_blank" className="visit" data-scroll-reveal>Visit live project ↗</MagneticButton>}<Footer /></PageMotion>
}

function About({ data }) { return <PageMotion className="page about-page"><header className="page-hero" data-page-reveal><p className="eyebrow">The human behind the UI</p><h1>Curious by<br /><em>default.</em></h1></header><section className="timeline">{data.experience.map((job, i) => <Reveal key={job.company}><article><span>0{i + 1}</span><div><p className="eyebrow">{job.overallPeriod} / {job.location}</p><h2>{job.company}</h2>{job.roles.map((role) => <div className="role" key={role.title}><h3>{role.title}</h3><p>{role.points[0]}</p></div>)}</div></article></Reveal>)}</section><section className="skills section" data-scroll-reveal><p className="eyebrow">Tools I reach for</p><div>{data.skills.map((group) => <article key={group.category}><h3>{group.category}</h3><p>{group.items.join(' · ')}</p></article>)}</div></section><Footer /></PageMotion> }

function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const submit = (event) => { event.preventDefault(); const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`); const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`); window.location.href = `mailto:${data.personal.email}?subject=${subject}&body=${body}` }
  return <PageMotion className="contact-page"><p className="eyebrow" data-page-reveal>Let’s make something useful</p><h1 data-page-reveal>Let's build<br /><em>something.</em></h1><p className="contact-copy" data-page-reveal>Whether you need a responsive product interface, a reliable full-stack feature, or a developer who cares about both, I’d be glad to hear from you.</p><MagneticButton href={`mailto:${data.personal.email}`} className="contact-mail" data-page-reveal>{data.personal.email} <i>↗</i></MagneticButton><form className="contact-form" onSubmit={submit} data-page-reveal><label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label><label>How can I help?<textarea required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the project or opportunity." /></label><MagneticButton as="button" type="submit" className="send-button">Start an email ↗</MagneticButton></form><div className="socials" data-page-reveal><a href={data.personal.social.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={data.personal.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div><Footer /></PageMotion>
}

function Footer() { return <footer><p>© 2026 Abhishek Kumar</p><p>Full-Stack Developer / India</p></footer> }
export function AppRoutes({ data }) { return <Routes><Route path="/" element={<Home data={data} />} /><Route path="/projects" element={<Projects data={data} />} /><Route path="/projects/:slug" element={<ProjectDetail data={data} />} /><Route path="/about" element={<About data={data} />} /><Route path="/contact" element={<Contact data={data} />} /></Routes> }
