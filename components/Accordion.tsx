'use client'
import { useState, ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export default function Accordion({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="accordion">
      <button
        className={`accordion-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  )
}