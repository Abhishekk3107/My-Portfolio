import React from 'react'
import Hero from '../components/Hero'
import { portfolioData } from '../data'

export default function Home() {
  const data = portfolioData
  return (
    <div>
      <Hero data={data} />
    </div>
  )
}
