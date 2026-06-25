import products from '@/data/products.json'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-28">
      <div className="flex items-end justify-between border-b border-brand-border pb-6 mb-10">
        <div>
          <p className="text-brand-gold text-xs uppercase tracking-[0.3em]">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light">
            Reserve <span className="italic text-brand-gold">Bars</span>
          </h1>
        </div>
        <span className="text-brand-cream/40 text-sm">{products.length} origins</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}