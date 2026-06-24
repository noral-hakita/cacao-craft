'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── Form state ───
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  })

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="font-serif text-3xl">Your cart is empty</h2>
        <Link
          href="/"
          className="inline-block mt-4 text-brand-gold border-b border-brand-gold/40 hover:border-brand-gold transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Call our place-order API
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items,
          total,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Clear the cart and redirect to success
        clearCart()
        router.push('/success')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setIsLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError('Network error. Please check your connection.')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-28">
      <h1 className="font-serif text-4xl mb-8">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        {/* ─── Order Summary ─── */}
        <div className="md:col-span-2 bg-white/5 border border-brand-border p-6 rounded-sm h-fit">
          <h2 className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4">
            Order Summary
          </h2>
          <div className="divide-y divide-brand-border">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="text-brand-cream/60">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="py-3 flex justify-between font-serif text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-brand-cream/30 text-xs mt-4 text-center">
            📦 Cash on Delivery • No payment needed now
          </p>
        </div>

        {/* ─── Checkout Form ─── */}
        <div className="md:col-span-3 bg-white/5 border border-brand-border p-6 rounded-sm">
          <h2 className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4">
            Shipping Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-brand-cream/50 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-brand-border px-4 py-2 text-brand-cream focus:border-brand-gold outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-brand-cream/50 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-brand-border px-4 py-2 text-brand-cream focus:border-brand-gold outline-none transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-brand-cream/50 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-brand-border px-4 py-2 text-brand-cream focus:border-brand-gold outline-none transition"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-xs uppercase tracking-widest text-brand-cream/50 mb-1">
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-transparent border border-brand-border px-4 py-2 text-brand-cream focus:border-brand-gold outline-none transition resize-none"
                placeholder="123 Main St, City, Country"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-gold text-brand-dark py-3 text-sm uppercase tracking-widest font-medium hover:bg-brand-goldLight transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order (Cash on Delivery)'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}