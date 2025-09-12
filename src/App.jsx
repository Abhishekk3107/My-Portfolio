import React, { useEffect } from 'react'
import { portfolioData } from './data'
import AnimatedBackground from './components/AnimatedBackground'
import { gsap } from 'gsap'

function SocialLinks({ social, className = '' }) {
  return (
    <div className={className}>
      {Object.entries(social).map(([platform, url]) => {
        const iconClass = platform === 'linkedin' ? 'fa-linkedin' : platform === 'github' ? 'fa-github' : 'fa-instagram'
        return (
          <a key={platform} href={url} target="_blank" rel="noreferrer" className="text-2xl text-muted hover:text-accent mx-2">
            <i className={`fab ${iconClass}`}></i>
          </a>
        )
      })}
    </div>
  )
}

function Hero({ data }) {
  useEffect(() => {
    gsap.from('.hero-animate', { opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: 'power3.out' })
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 hero-animate">
        <div>
          <img id="profile-image" src={data.personal.image} alt="Profile" className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-accent shadow-2xl animate-float hero-animate" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-animate">Hi, I'm <span className="gradient-text">{data.personal.name}</span></h1>
          <h2 className="text-2xl md:text-3xl text-muted mb-8 hero-animate">{data.personal.title}</h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed hero-animate">{data.personal.description}</p>
          <SocialLinks social={data.personal.social} className="hero-animate flex justify-center my-4" />
          <div className="mt-8 hero-animate">
            <a href="#projects" className="inline-block bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg">View My Work <i className="fas fa-arrow-down ml-2"></i></a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Other components unchanged besides subtle class additions
function About({ data }) {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted leading-relaxed mb-8">{data.personal.about}</p>
              <a id="resume-link" href={data.personal.resume} className="inline-block bg-accent text-primary px-6 py-3 rounded-lg font-semibold">Download Resume</a>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-accent">Skills & Technologies</h3>
              <div>
                {Object.entries(data.skills).map(([category, skills]) => (
                  <div className="mb-6" key={category}>
                    <h4 className="text-lg font-semibold mb-3 text-accent">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="skill-tag px-3 py-1 bg-primary text-text rounded-full text-sm border border-gray-600">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ data }) {
  const [filter, setFilter] = React.useState('all')
  const techs = Array.from(new Set(data.projects.flatMap(p => p.technologies)))
  const filtered = data.projects.filter(p => filter === 'all' || p.technologies.includes(filter))

  useEffect(() => {
    gsap.from('.project-card', { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 })
  }, [filter])

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">My Projects</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setFilter('all')} className={`filter-btn px-6 py-2 rounded-full ${filter==='all'?'bg-accent text-primary':'bg-secondary text-text'}`}>All Projects</button>
          {techs.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`filter-btn px-6 py-2 rounded-full ${filter===t?'bg-accent text-primary':'bg-secondary text-text'}`}>{t}</button>
          ))}
        </div>

        <div id="projects-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <div key={project.title} className="project-card bg-secondary rounded-lg overflow-hidden shadow-lg transition-all duration-300" style={{animationDelay: `${idx*0.1}s`}}>
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-accent">{project.title}</h3>
                <p className="text-muted mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => <span key={tech} className="px-2 py-1 bg-primary text-accent text-xs rounded border border-accent">{tech}</span>)}
                </div>
                <div className="flex gap-3">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 bg-primary text-accent border border-accent px-4 py-2 rounded hover:bg-accent hover:text-primary text-center"><i className="fab fa-github mr-2"></i>Code</a>}
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 text-center"><i className="fas fa-external-link-alt mr-2"></i>Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ data }) {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' })

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields')
      return
    }
    if (!isValidEmail(form.email)) {
      alert('Please enter a valid email address')
      return
    }
    alert("Message sent successfully! I'll get back to you soon.")
    setForm({ name: '', email: '', message: '' })
  }

  React.useEffect(() => {
    const saved = localStorage.getItem('formData')
    if (saved) setForm(JSON.parse(saved))
  }, [])

  React.useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(form))
  }, [form])

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">Get In Touch</h2>
          <p className="text-lg text-muted leading-relaxed text-center mb-12">I'm always interested in hearing about new projects, so if you'd like to chat, please get in touch.</p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto contact-form">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg text-text" />
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" name="email" placeholder="your.email@example.com" required className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg text-text" />
            </div>
            <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} name="message" rows="6" placeholder="Your Message" required className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg text-text mb-6"></textarea>
            <button type="submit" className="w-full bg-accent text-primary py-3 rounded-lg font-semibold">Send Message</button>
          </form>

          <div className="flex justify-center space-x-6 mt-12">
            <SocialLinks social={data.personal.social} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const data = portfolioData

  return (
    <div className="relative overflow-x-hidden">
      <AnimatedBackground />

      <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="text-2xl font-bold gradient-text">Abhi Dev</a>
          <div className="hidden md:flex space-x-8">
            <a href="#hero" className="nav-link text-text">Home</a>
            <a href="#about" className="nav-link text-text">About</a>
            <a href="#projects" className="nav-link text-text">Projects</a>
            <a href="#contact" className="nav-link text-text">Contact</a>
          </div>
          <button id="mobile-menu-btn" className="md:hidden text-text">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      <main>
        <Hero data={data} />
        <About data={data} />
        <Projects data={data} />
        <Contact data={data} />
      </main>

      <footer className="py-8 text-center text-muted">
        <div className="container mx-auto px-6">
          <p>&copy; 2025 Abhishek Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
