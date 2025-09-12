import React from 'react'

export default function Logo({ size = 40 }) {
  return (
    <div style={{width: size, height: size}} className="flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-black font-bold">
      <span style={{fontSize: size/2}} className="select-none">AK</span>
    </div>
  )
}
