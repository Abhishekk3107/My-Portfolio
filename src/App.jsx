import React from 'react'
import { portfolioData } from './data'
import AnimatedBackground from './components/AnimatedBackground'
import Header from './components/Header'
import Footer from './components/Footer'
import WaveBackground from './components/WaveBackground'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative overflow-x-hidden bg-[radial-gradient(ellipse_at_top_left,_#071029_0%,_#05060a_40%,_#000000_100%)] min-h-screen text-[rgba(255,255,255,0.92)]">
        <AnimatedBackground />
        <WaveBackground />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
