import products from '@/data/products.json'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(184,150,90,0.08),transparent)]">
        <p className="text-brand-gold text-sm tracking-[0.4em] uppercase mb-4">
          Single Origin · Small Batch
        </p>
        <h1 className="font-serif text-6xl md:text-8xl font-light leading-[0.95]">
          Cacao <br /><span className="italic text-brand-gold">&amp; Craft</span>
        </h1>
        <p className="font-serif text-xl md:text-2xl italic text-brand-cream/60 mt-4 max-w-2xl">
          From bean to bar, uncommonly pure.
        </p>
        <p className="text-brand-cream/50 max-w-md mt-6 leading-relaxed">
          We source directly from family farms and roast in small batches to preserve the character of each origin.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button className="bg-brand-gold text-brand-dark px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-brand-goldLight transition shadow-lg">
            Explore Collection
          </button>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-6 flex flex-col items-center gap-2 text-brand-cream/30 text-[10px] uppercase tracking-[0.3em]">
          <span className="block w-px h-12 bg-gradient-to-b from-brand-gold to-transparent"></span>
          Scroll
        </div>
      </section>

      {/* ─── PRODUCT GRID ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-brand-border pb-6 mb-10">
          <div>
            <p className="text-brand-gold text-xs uppercase tracking-[0.3em]">The Collection</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Reserve <span className="italic text-brand-gold">Bars</span></h2>
          </div>
          <span className="text-brand-cream/40 text-sm">{products.length} origins</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}