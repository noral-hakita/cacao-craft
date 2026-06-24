import { notFound } from 'next/navigation'
import products from '@/data/products.json'
import AddToCartButton from '@/components/AddToCartButton'

// Make the component async and await params
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params Promise to get the actual values
  const { id } = await params
  
  // Find the product that matches the ID from the URL
  const product = products.find((p) => p.id === id)

  // If no product found, show a 404 page
  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* ─── Image placeholder ─── */}
        <div className="aspect-[4/5] bg-gradient-to-br from-brand-dark to-[#1a1410] border border-brand-border flex items-center justify-center text-brand-cream/5 text-9xl font-serif">
          {product.name.charAt(0)}
        </div>

        {/* ─── Product info ─── */}
        <div>
          <p className="text-brand-gold text-sm uppercase tracking-[0.3em]">{product.origin}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light mt-2">{product.name}</h1>
          <p className="text-2xl font-light text-brand-cream/70 mt-2">${product.price.toFixed(2)}</p>

          <div className="flex gap-4 mt-4 text-sm text-brand-cream/50">
            <span>Cacao {product.cacao}%</span>
            <span>•</span>
            <span>Single Origin</span>
          </div>

          <p className="mt-6 text-brand-cream/70 leading-relaxed">{product.description}</p>
          <p className="mt-4 text-brand-cream/50 italic">Tasting notes: {product.tastingNotes}</p>

          <div className="mt-8 flex gap-4">
            <AddToCartButton product={product} />
            <button className="border border-brand-border px-6 py-3 text-sm uppercase tracking-widest hover:border-brand-gold/40 transition">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}