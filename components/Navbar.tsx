'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isClient, setIsClient] = useState(false)
  const count = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-brand-dark/75 backdrop-blur-2xl border-b border-brand-border transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-widest uppercase text-brand-cream">
          Cacao <span className="text-brand-gold">&amp;</span> Craft
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none">
          <li><Link href="/products" className="text-sm uppercase tracking-widest text-brand-cream/60 hover:text-brand-gold transition">Collection</Link></li>
          <li><a href="/#story" className="text-sm uppercase tracking-widest text-brand-cream/60 hover:text-brand-gold transition">Story</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-brand-cream/70 hover:text-brand-gold transition" />
            {isClient && count > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Link href="/products" className="hidden sm:inline-block bg-brand-gold text-brand-dark px-4 py-2 text-xs uppercase tracking-widest font-medium hover:bg-brand-goldLight transition">
            Shop
          </Link>
        </div>
      </div>
    </nav>
  )
}