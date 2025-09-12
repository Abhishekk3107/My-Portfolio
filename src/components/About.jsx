import React from 'react'

export default function About({ data }) {
  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted leading-relaxed mb-8">{data.personal.about}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-accent">Skills & Technologies</h3>
              <div>
                {Object.entries(data.skills).map(([category, skills]) => (
                  <div className="mb-6" key={category}>
                    <h4 className="text-lg font-semibold mb-3 text-white">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="skill-tag px-3 py-1 bg-[rgba(255,255,255,0.03)] text-muted rounded-full text-sm border border-[rgba(255,255,255,0.04)]">{skill}</span>
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
