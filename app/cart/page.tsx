'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { encodeImagePath } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  // If cart is empty, show a nice message
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="flex flex-col items-center gap-6">
          <ShoppingBag className="w-16 h-16 text-brand-cream/20" />
          <h2 className="font-serif text-4xl">Your cart is empty</h2>
          <p className="text-brand-cream/50">Looks like you haven't added any chocolate bars yet.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-brand-gold border-b border-brand-gold/40 hover:border-brand-gold transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-28">
      <h1 className="font-serif text-4xl mb-8">Your Cart</h1>

      {/* Cart items list */}
      <div className="divide-y divide-brand-border">
        {items.map((item) => (
          <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Product image */}
            <div className="w-20 h-20 bg-brand-dark/50 border border-brand-border flex items-center justify-center overflow-hidden relative flex-shrink-0">
              <Image
                src={encodeImagePath(item.image)}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl">{item.name}</h3>
              <p className="text-brand-cream/50 text-sm">{item.origin}</p>
              <p className="text-brand-cream/60 text-sm mt-1">${item.price.toFixed(2)} each</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 border border-brand-border flex items-center justify-center hover:border-brand-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 border border-brand-border flex items-center justify-center hover:border-brand-gold/40 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Item subtotal & remove */}
            <div className="flex items-center gap-4">
              <span className="w-20 text-right font-light">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-brand-cream/30 hover:text-brand-gold transition"
                aria-label="Remove item"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="mt-8 flex flex-col items-end gap-4 border-t border-brand-border pt-6">
        <div className="text-2xl font-light">
          Total: <span className="font-serif">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={clearCart}
            className="text-brand-cream/40 hover:text-brand-cream/70 text-sm uppercase tracking-widest transition"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="bg-brand-gold text-brand-dark px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-brand-goldLight transition shadow-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}