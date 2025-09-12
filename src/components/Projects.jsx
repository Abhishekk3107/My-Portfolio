import React, { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Projects({ data }) {
  const [filter, setFilter] = React.useState('all')
  const techs = Array.from(new Set(data.projects.flatMap(p => p.technologies)))
  const filtered = data.projects.filter(p => filter === 'all' || p.technologies.includes(filter))

  useEffect(() => {
    try {
      gsap.from('.project-card', { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 })
    } catch (e) {
      document.querySelectorAll('.project-card').forEach(el => el.style.opacity = '1')
    }
  }, [filter])

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">My Projects</h2>
          <p className="text-muted">Showing {filtered.length} of {data.projects.length}</p>
        </div>

        <div className="flex flex-wrap justify-start gap-4 mb-8">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full ${filter==='all'?'bg-accent text-black':'bg-[rgba(255,255,255,0.03)] text-muted'}`}>All</button>
          {techs.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full ${filter===t?'bg-accent text-black':'bg-[rgba(255,255,255,0.03)] text-muted'}`}>{t}</button>
          ))}
        </div>

        <div id="projects-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <article key={project.title} className="project-card bg-[rgba(255,255,255,0.02)] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:translate-y-[-6px]" style={{animationDelay: `${idx*0.05}s`}}>
              <div className="w-full h-48 bg-[rgba(255,255,255,0.02)]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.src='/images/placeholder.png'}} />
              </div>
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-muted mb-3 text-sm md:text-base leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => <span key={tech} className="px-2 py-1 bg-[rgba(255,255,255,0.03)] text-accent text-xs rounded border border-[rgba(255,255,255,0.04)]">{tech}</span>)}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 bg-[rgba(255,255,255,0.04)] text-accent border border-[rgba(255,255,255,0.06)] px-4 py-2 rounded text-center">Code</a>}
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 bg-accent text-black px-4 py-2 rounded text-center">Live</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
