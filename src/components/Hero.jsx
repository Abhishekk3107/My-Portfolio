import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroTextRotator from './HeroTextRotator'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ data }) {
  const heroRef = useRef(null)
  const profileImageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const codeElementsRef = useRef(null)
  const techIconsRef = useRef(null)

  useEffect(() => {
    // Ensure hero spacing doesn't overlap with header
    const main = document.querySelector('main')
    if (main) main.style.paddingTop = '96px'

    // Responsive: ensure hero image doesn't cover header
    const img = document.getElementById('profile-image')
    if (img) img.style.marginTop = '8px'

    // GSAP Timeline for sequential animations
    const tl = gsap.timeline({ delay: 0.3 })

    // Animate floating code elements
    gsap.fromTo(codeElementsRef.current.children, 
      { 
        y: 50,
        opacity: 0,
        rotation: -10
      },
      { 
        y: 0,
        opacity: 0.1,
        rotation: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out"
      }
    )

    // Continuous floating animations for code elements
    Array.from(codeElementsRef.current.children).forEach((element, index) => {
      gsap.to(element, {
        y: Math.random() * 20 - 10,
        x: Math.random() * 15 - 7.5,
        rotation: Math.random() * 10 - 5,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5
      })
    })

    // Animate tech icons
    gsap.fromTo(techIconsRef.current.children, 
      { 
        scale: 0,
        opacity: 0,
        rotation: 180
      },
      { 
        scale: 1,
        opacity: 0.15,
        rotation: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    )

    // Tech icons floating animation
    Array.from(techIconsRef.current.children).forEach((icon, index) => {
      gsap.to(icon, {
        y: -15 + Math.random() * 10,
        rotation: Math.random() * 20 - 10,
        duration: 4 + Math.random() * 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3
      })
    })

    // Profile image entrance with bounce
    tl.fromTo(profileImageRef.current,
      { 
        y: -100, 
        opacity: 0, 
        scale: 0.3,
        rotation: -10
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          // Add subtle floating animation
          gsap.to(profileImageRef.current, {
            y: -8,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          })
        }
      }
    )

    // Title animation
    tl.fromTo(titleRef.current,
      { 
        y: 50, 
        opacity: 0
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8"
    )

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      { 
        y: 30, 
        opacity: 0
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6"
    )

    // Description fade in
    tl.fromTo(descriptionRef.current,
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4"
    )

    // Buttons animation
    tl.fromTo(buttonsRef.current.children,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2
      }, "-=0.4"
    )

    // Scroll-triggered parallax effect
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top center",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(profileImageRef.current, {
          y: progress * -30,
          duration: 0.3
        })
        gsap.to(codeElementsRef.current, {
          y: progress * 20,
          duration: 0.3
        })
        gsap.to(techIconsRef.current, {
          y: progress * -15,
          duration: 0.3
        })
      }
    })

    // Cleanup function
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleButtonHover = (e, isEntering) => {
    if (isEntering) {
      gsap.to(e.target, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      gsap.to(e.target, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-12"
    >
      {/* Floating Code Elements Background */}
      <div 
        ref={codeElementsRef}
        className="absolute inset-0 pointer-events-none font-mono text-white/10"
      >
        {/* HTML Tags */}
        <div className="absolute top-20 left-10 text-2xl transform -rotate-12">{'<div>'}</div>
        <div className="absolute top-32 right-20 text-lg transform rotate-6">{'</html>'}</div>
        <div className="absolute bottom-40 left-1/4 text-xl transform rotate-12">{'<React>'}</div>
        <div className="absolute bottom-60 right-1/3 text-lg transform -rotate-6">{'{...props}'}</div>
        
        {/* CSS Selectors */}
        <div className="absolute top-1/3 left-16 text-lg transform rotate-15">{'.container'}</div>
        <div className="absolute top-1/2 right-16 text-sm transform -rotate-12">{'@media'}</div>
        <div className="absolute bottom-1/3 left-8 text-md transform rotate-8">{'flexbox'}</div>
        
        {/* JavaScript Keywords */}
        <div className="absolute top-1/4 right-1/4 text-lg transform rotate-10">{'const'}</div>
        <div className="absolute bottom-1/4 left-1/3 text-md transform -rotate-8">{'async'}</div>
        <div className="absolute top-2/3 right-8 text-sm transform rotate-15">{'useState'}</div>
        
        {/* Code Symbols */}
        <div className="absolute top-16 left-1/2 text-3xl transform -rotate-20">{'{ }'}</div>
        <div className="absolute bottom-16 right-1/2 text-2xl transform rotate-25">{'[ ]'}</div>
        <div className="absolute top-3/4 left-12 text-xl transform -rotate-10">{'=>'}</div>
        <div className="absolute bottom-20 left-2/3 text-lg transform rotate-12">{'npm'}</div>
        
        {/* Git Commands */}
        <div className="absolute top-48 right-12 text-sm transform rotate-8">{'git push'}</div>
        <div className="absolute bottom-48 left-20 text-xs transform -rotate-15">{'commit'}</div>
      </div>

      {/* Tech Icons Background */}
      <div 
        ref={techIconsRef}
        className="absolute inset-0 pointer-events-none"
      >
        {/* React Icon */}
        <div className="absolute top-24 left-24">
          <svg className="w-12 h-12 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26S20.07 10.37 17.97 9.74c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26"/>
          </svg>
        </div>

        {/* JavaScript Icon */}
        <div className="absolute top-40 right-32">
          <svg className="w-10 h-10 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.77l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/>
          </svg>
        </div>

        {/* CSS Icon */}
        <div className="absolute bottom-32 left-16">
          <svg className="w-10 h-10 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
          </svg>
        </div>

        {/* Node.js Icon */}
        <div className="absolute bottom-20 right-20">
          <svg className="w-12 h-12 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L2.46,6.68C2.376,6.729,2.322,6.825,2.322,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
          </svg>
        </div>

        {/* Git Icon */}
        <div className="absolute top-1/2 left-8">
          <svg className="w-8 h-8 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
          </svg>
        </div>

        {/* Terminal Icon */}
        <div className="absolute top-16 right-1/3">
          <svg className="w-10 h-10 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 3h20c1.103 0 2 .897 2 2v14c0 1.103-.897 2-2 2H2c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2zM2 5v2h20V5H2zM2 19h20v-8H2v8z"/>
            <path d="M6 13h2v2H6zm8 0h6v2h-6z"/>
          </svg>
        </div>

        {/* Database Icon */}
        <div className="absolute bottom-1/3 right-12">
          <svg className="w-8 h-8 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4ZM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4ZM4 14v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4Z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <img 
            ref={profileImageRef}
            id="profile-image" 
            src={data.personal.image} 
            alt="Profile" 
            className="w-36 md:w-44 h-36 md:h-44 rounded-full mx-auto object-cover border-4 border-accent shadow-2xl hover:shadow-accent/25 transition-all duration-500 hover:scale-105" 
            onError={(e) => { e.currentTarget.src = '/assets/images/user0.jpg' }}
          />
          
          <h1 
            ref={titleRef}
            className="mt-6 text-3xl md:text-5xl font-extrabold text-white"
          >
            Hi, I'm <span className="gradient-text">{data.personal.name}</span>
          </h1>
          
          <div 
            ref={subtitleRef}
            className="mt-4 text-lg md:text-xl text-muted flex items-center justify-center gap-3"
          >
            I am a <span><HeroTextRotator /></span>
          </div>
          
          <p 
            ref={descriptionRef}
            className="mt-6 text-sm md:text-base text-muted max-w-3xl mx-auto leading-relaxed"
          >
            {data.personal.description}
          </p>
          
          <div 
            ref={buttonsRef}
            className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <a 
              href="/projects" 
              className="inline-block bg-accent text-black px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              View My Work
            </a>
            <a 
              href={data.personal.resume} 
              className="inline-block border border-[rgba(255,255,255,0.06)] text-muted px-6 py-3 rounded-full hover:border-[rgba(255,255,255,0.15)] hover:text-white transition-all duration-300 hover:bg-white/5"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
