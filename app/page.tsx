'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ChocolateScene from '@/components/ChocolateScene'
import products from '@/data/products.json'
import { encodeImagePath } from '@/lib/utils'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const totalHeight = window.innerHeight * 2
      const scrolled = Math.abs(rect.top)
      const progress = Math.min(scrolled / totalHeight, 1)
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const facts = [
    { icon: '🌱', label: 'It takes ~400 cacao beans to make 1 lb of chocolate' },
    { icon: '💰', label: 'Chocolate was once used as currency by the Aztecs' },
    { icon: '🫘', label: 'Cacao trees can live for over 200 years' },
    { icon: '🍫', label: 'The first chocolate bar was made in 1847' },
    { icon: '🌍', label: 'Cacao is grown only within 20° of the equator' },
    { icon: '🧪', label: 'Dark chocolate contains over 600 flavour compounds' },
  ]

  // Featured product for the story image
  const featuredProduct = products[0]

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '200vh' }}>
      {/* ─── STICKY 3D SCENE ─── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          {isClient ? (
            <ChocolateScene scrollProgress={scrollProgress} />
          ) : (
            <div className="w-full h-full bg-brand-dark" />
          )}
        </div>

        {/* ─── OVERLAY TEXT ─── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 pointer-events-none"
          style={{
            opacity: 1 - scrollProgress * 0.8,
            transform: `translateY(${scrollProgress * -80}px)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
          }}
        >
          <p className="text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
            Single Origin · Small Batch
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95]">
            Cacao <br />
            <span className="italic text-brand-gold">&amp; Craft</span>
          </h1>
          <p className="font-serif text-lg md:text-2xl italic text-brand-cream/60 mt-4 max-w-2xl mx-auto">
            From bean to bar, uncommonly pure.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap justify-center pointer-events-auto">
            <Link
              href="/products"
              className="bg-brand-gold text-brand-dark px-6 md:px-8 py-3 text-xs md:text-sm uppercase tracking-widest font-medium hover:bg-brand-goldLight transition shadow-lg"
            >
              Explore Collection
            </Link>
            <a
              href="#story"
              className="border border-brand-border px-6 md:px-8 py-3 text-xs md:text-sm uppercase tracking-widest hover:border-brand-gold/40 transition pointer-events-auto"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* ─── SCROLL INDICATOR ─── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-cream/30 text-[10px] uppercase tracking-[0.3em] z-10">
          <span className="block w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
          <span>Scroll to explore</span>
          <div className="w-24 h-[2px] bg-brand-border rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-brand-gold transition-all duration-100"
              style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── NORMAL SCROLLING CONTENT ─── */}
      <div className="relative z-10 bg-brand-dark" style={{ marginTop: '5vh' }}>
        <section id="story" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="sec-title">
                Crafted with <br /><em>uncommon patience</em>
              </h2>
              <p className="sec-body">
                Cacao &amp; Craft began as a single obsession: to source the world's most expressive cacao
                and present it without compromise. We work directly with family farms and harvest cooperatives
                whose names rarely appear on menus.
              </p>
              <p className="sec-body">
                Every bar in our collection is tasted, paired, and approved by our in-house atelier before
                it reaches your table. We believe that great chocolate tells the story of its origin.
              </p>
              <div className="gold-rule" />
              <div className="stat-row">
                <div className="stat-item">
                  <div className="stat-num">24<span>+</span></div>
                  <div className="stat-label">Partner Estates</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">14</div>
                  <div className="stat-label">Countries</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">8<span>yr</span></div>
                  <div className="stat-label">Avg Vintage</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-[4/5] bg-gradient-to-br from-brand-dark to-[#1a1410] border border-brand-border flex items-center justify-center relative overflow-hidden">
                <Image
                  src={encodeImagePath(featuredProduct.image)}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                <p className="absolute bottom-4 text-brand-gold/60 text-xs uppercase tracking-widest">Featured</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-brand-border">
          <div className="text-center mb-12">
            <p className="eyebrow justify-center">Did You Know?</p>
            <h2 className="sec-title text-center">Fascinating <em>Chocolate Facts</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facts.map((fact, i) => (
              <div
                key={i}
                className="border border-brand-border p-6 hover:border-brand-gold/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{fact.icon}</div>
                <p className="text-brand-cream/70 text-sm leading-relaxed">{fact.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}