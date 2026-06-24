'use client'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button
      onClick={() => addItem(product)}
      className="bg-brand-gold text-brand-dark px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-brand-goldLight transition shadow-lg"
    >
      Add to Cart
    </button>
  )
}