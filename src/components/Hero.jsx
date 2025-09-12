import React, { useEffect } from 'react'

export default function Hero({ data }) {
  useEffect(() => {
    // ensure hero spacing doesn't overlap with header
    const main = document.querySelector('main')
    if (main) main.style.paddingTop = '88px'
  }, [])

  return (
    <section id="hero" className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-12">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <img id="profile-image" src={data.personal.image} alt="Profile" className="w-44 h-44 rounded-full mx-auto object-cover border-4 border-accent shadow-2xl" onError={(e)=>{e.currentTarget.style.display='none'}} />
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-white">Hi, I'm <span className="gradient-text">{data.personal.name}</span></h1>
          <div className="mt-4 text-xl md:text-2xl text-muted flex items-center justify-center gap-3">I am a <span><HeroTextRotator /></span></div>
          <p className="mt-6 text-base md:text-lg text-muted max-w-3xl mx-auto">{data.personal.description}</p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/projects" className="inline-block bg-accent text-primary px-6 py-3 rounded-full font-semibold">View My Work</a>
            <a href={data.personal.resume} className="inline-block border border-[rgba(255,255,255,0.06)] text-muted px-6 py-3 rounded-full">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  )
}
