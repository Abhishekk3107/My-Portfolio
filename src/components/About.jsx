import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About({ data }) {
  const aboutRef = useRef(null)
  const headerRef = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)
  const statsRef = useRef(null)
  const [skillLevels, setSkillLevels] = useState({})

  // Professional skill proficiency levels
  const skillProficiency = {
    'React': 90,
    'JavaScript': 85,
    'Node.js': 80,
    'HTML': 95,
    'CSS': 88,
    'Tailwind CSS': 92,
    'Git': 85,
    'Firebase': 75,
    'MongoDB': 70,
    'Express': 78,
    'TypeScript': 75,
    'Next.js': 82
  }

  // Professional stats
  const stats = [
    { label: 'Projects Completed', value: 25, suffix: '+', icon: 'RocketIcon' },
    { label: 'Years Experience', value: 3, suffix: '+', icon: 'StarIcon' },
    { label: 'Technologies', value: 15, suffix: '+', icon: 'CodeIcon' },
    { label: 'Happy Clients', value: 20, suffix: '+', icon: 'UsersIcon' }
  ]

  useEffect(() => {
    const tl = gsap.timeline()

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

    // ScrollTrigger for stats and skills
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top 70%",
      onEnter: () => {
        // Animate stats counters
        stats.forEach((stat, index) => {
          gsap.fromTo(`.stat-${index}`,
            { innerText: 0 },
            {
              innerText: stat.value,
              duration: 1.5,
              ease: "power2.out",
              snap: { innerText: 1 }
            }
          )
        })

        // Animate skill bars with delay
        Object.keys(skillProficiency).forEach((skill, index) => {
          setTimeout(() => {
            setSkillLevels(prev => ({
              ...prev,
              [skill]: skillProficiency[skill]
            }))
          }, index * 150)
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Professional SVG Icons
  const RocketIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  )

  const StarIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )

  const CodeIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )

  const UsersIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )

  const BriefcaseIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 00-2-2M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 14v5a2 2 0 002 2h4a2 2 0 002-2v-5" />
    </svg>
  )

  const AcademicCapIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  )

  const getSkillIcon = (skill) => {
    const iconMap = {
      'React': () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26S20.07 10.37 17.97 9.74c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26"/>
        </svg>
      ),
      'JavaScript': () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.77l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/>
        </svg>
      )
    }
    return iconMap[skill] ? iconMap[skill]() : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }

  const iconComponents = {
    'RocketIcon': RocketIcon,
    'StarIcon': StarIcon,
    'CodeIcon': CodeIcon,
    'UsersIcon': UsersIcon
  }

  return (
    <section ref={aboutRef} id="about" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Passionate developer crafting digital experiences with modern technologies
            </p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = iconComponents[stat.icon]
              return (
                <div 
                  key={stat.label}
                  className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl p-6 text-center border border-[rgba(255,255,255,0.08)] hover:border-accent/30 transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex justify-center mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">
                    <span className={`stat-${index}`}>0</span>{stat.suffix}
                  </div>
                  <div className="text-sm text-muted font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Profile */}
            <div ref={leftColumnRef} className="space-y-8">
              {/* About Text */}
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-accent rounded-full"></div>
                  My Story
                </h3>
                <p className="text-muted leading-relaxed text-lg mb-6">
                  {data.personal.about}
                </p>
              </div>

              {/* Experience */}
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <BriefcaseIcon className="w-6 h-6 text-accent" />
                  Experience
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent/30 pl-4 hover:border-accent transition-colors duration-300">
                    <h4 className="text-white font-semibold mb-1">Freelance Web Developer</h4>
                    <p className="text-muted text-sm">Built responsive websites and SPAs using React and Tailwind CSS.</p>
                  </div>
                  <div className="border-l-2 border-accent/30 pl-4 hover:border-accent transition-colors duration-300">
                    <h4 className="text-white font-semibold mb-1">Open Source Contributor</h4>
                    <p className="text-muted text-sm">Small utilities and UI components on GitHub.</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <AcademicCapIcon className="w-6 h-6 text-accent" />
                  Education
                </h3>
                <div className="border-l-2 border-accent/30 pl-4 hover:border-accent transition-colors duration-300">
                  <h4 className="text-white font-semibold mb-1">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-muted text-sm">Focus on web development and software engineering fundamentals.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Skills */}
            <div ref={rightColumnRef}>
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-accent rounded-full"></div>
                  Skills & Technologies
                </h3>

                <div className="space-y-8">
                  {Object.entries(data.skills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                        <CodeIcon className="w-5 h-5 text-accent" />
                        {category}
                      </h4>
                      
                      <div className="space-y-4">
                        {skills.map((skill) => (
                          <div key={skill}>
                            {/* Skill Header */}
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-3">
                                <div className="text-accent">
                                  {getSkillIcon(skill)}
                                </div>
                                <span className="text-white font-medium">{skill}</span>
                              </div>
                              <span className="text-accent font-semibold text-sm">
                                {skillProficiency[skill] || 75}%
                              </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="relative h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-1000 ease-out relative"
                                style={{ 
                                  width: `${skillLevels[skill] || 0}%`
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
