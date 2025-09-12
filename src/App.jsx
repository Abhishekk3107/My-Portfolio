import React from 'react'
import { portfolioData } from './data'
import AnimatedBackground from './components/AnimatedBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const data = portfolioData

  return (
    <div className="relative overflow-x-hidden bg-[radial-gradient(ellipse_at_top_left,_#071029_0%,_#05060a_40%,_#000000_100%)] min-h-screen text-[rgba(255,255,255,0.92)]">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Projects data={data} />
        <Contact data={data} />
      </main>
      <Footer />
    </div>
  )
}
