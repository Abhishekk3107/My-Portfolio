import React from 'react'
import Hero from '../components/Hero'
import { portfolioData } from '../data'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'




export default function Home() {
  const data = portfolioData
  return (
    <div>
      <Hero data={data} />
       <About data={portfolioData} />
        <Projects data={portfolioData} />
        <Contact data={portfolioData} />
      
    </div>
  )
}
