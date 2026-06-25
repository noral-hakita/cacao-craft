'use client'
import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = []
    const count = 120

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)
    resize()

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.5 + Math.random() * 3,
        speed: 0.2 + Math.random() * 0.4,
        opacity: 0.2 + Math.random() * 0.4,
      })
    }

    function draw() {
      // Use non-null assertion because ctx is guaranteed by the check above
      ctx!.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y += p.speed
        if (p.y > height) {
          p.y = -5
          p.x = Math.random() * width
        }
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(184, 150, 90, ${p.opacity})`
        ctx!.fill()
      })

      requestAnimationFrame(draw)
    }

    draw()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas id="particles-canvas" ref={canvasRef} />
}