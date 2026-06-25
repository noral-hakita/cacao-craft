'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const cardRef = useRef<HTMLDivElement>(null)

  // ─── 3D MAGNETIC TILT EFFECT ──────────────────────────────────────
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // ─── ENCODE IMAGE PATH SAFELY ───────────────────────────────────────
  const encodeImagePath = (path: string): string => {
    const parts = path.split('/')
    if (parts.length === 0) return path
    const filename = parts[parts.length - 1]
    const encodedFilename = encodeURIComponent(filename)
    const dirs = parts.slice(0, -1)
    return dirs.length > 0 ? dirs.join('/') + '/' + encodedFilename : '/' + encodedFilename
  }

  const imageSrc = encodeImagePath(product.image)

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/5 border border-brand-border hover:border-brand-gold/40 transition-all duration-300 flex flex-col overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out, border-color 0.3s ease',
      }}
    >
      {/* ─── IMAGE ─── */}
      <Link href={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden relative bg-gradient-to-b from-brand-dark to-[#1a1410]">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* ─── PRODUCT INFO ─── */}
      <div className="p-5 flex-1 flex flex-col transition-all duration-300 group-hover:translate-y-[-2px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em]">{product.origin}</p>
            <h3 className="font-serif text-xl font-light text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          <span className="text-brand-cream/60 font-light">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-brand-cream/40 text-sm mt-1 line-clamp-2">{product.tastingNotes}</p>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="flex-1 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-4 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 group-hover:border-brand-gold/60 group-hover:bg-brand-gold/15"
          >
            <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            Add to Cart
          </button>
          <Link
            href={`/product/${product.id}`}
            className="text-brand-cream/40 hover:text-brand-cream text-xs uppercase tracking-widest transition-colors duration-300 group-hover:text-brand-gold"
          >
            Details
          </Link>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand-gold/0 group-hover:border-brand-gold/30 transition-all duration-500 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
      <div className="absolute bottom-16 right-4 w-6 h-6 border-b border-r border-brand-gold/0 group-hover:border-brand-gold/30 transition-all duration-500 group-hover:translate-x-[2px] group-hover:translate-y-[2px]" />
      <div className="absolute inset-0 pointer-events-none border border-brand-gold/0 group-hover:border-brand-gold/20 transition-all duration-500" />
    </div>
  )
}