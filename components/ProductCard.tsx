'use client'
import Link from 'next/link'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="group relative bg-white/5 border border-brand-border hover:border-brand-gold/40 transition-all duration-300 flex flex-col">
      {/* Image area */}
      <Link href={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden bg-gradient-to-b from-brand-dark to-[#1a1410] relative">
        {/* Placeholder – we'll replace with real images later */}
        <div className="w-full h-full flex items-center justify-center text-brand-cream/10 text-6xl font-serif">
          {product.name.charAt(0)}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Link>

      {/* Product info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em]">{product.origin}</p>
            <h3 className="font-serif text-xl font-light text-brand-cream">{product.name}</h3>
          </div>
          <span className="text-brand-cream/60 font-light">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-brand-cream/40 text-sm mt-1 line-clamp-2">{product.tastingNotes}</p>

        {/* Add to cart button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="flex-1 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-4 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <Link
            href={`/product/${product.id}`}
            className="text-brand-cream/40 hover:text-brand-cream text-xs uppercase tracking-widest transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}