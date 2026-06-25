import { notFound } from 'next/navigation'
import Image from 'next/image'
import products from '@/data/products.json'
import AddToCartButton from '@/components/AddToCartButton'
import Accordion from '@/components/Accordion'
import { encodeImagePath } from '@/lib/utils'

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params

  if (!resolvedParams || !resolvedParams.id) {
    return notFound()
  }

  const product = products.find((p) => p.id === resolvedParams.id)

  if (!product) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* ─── Image ─── */}
        <div className="aspect-[4/5] bg-gradient-to-br from-brand-dark to-[#1a1410] border border-brand-border flex items-center justify-center relative overflow-hidden">
          <Image
            src={encodeImagePath(product.image)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-6 left-6 bg-brand-gold/10 border border-brand-gold/30 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gold z-10">
            {product.batch || 'Limited Harvest'}
          </div>
        </div>

        {/* ─── Info ─── */}
        <div>
          <p className="text-brand-gold text-sm uppercase tracking-[0.3em]">{product.origin}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light mt-2">{product.name}</h1>
          <p className="text-2xl font-light text-brand-cream/70 mt-2">${product.price.toFixed(2)}</p>

          <div className="flex gap-4 mt-4 text-sm text-brand-cream/50">
            <span>Cacao {product.cacao}%</span>
            <span>•</span>
            <span>Single Origin</span>
            <span>•</span>
            <span className="text-brand-gold/60">Batch #{product.batch?.match(/\d+/)?.[0] || '042'}</span>
          </div>

          <p className="mt-6 text-brand-cream/70 leading-relaxed">{product.description}</p>
          <p className="mt-4 text-brand-cream/50 italic">Tasting notes: {product.tastingNotes}</p>

          {/* ─── Origin Story ─── */}
          <div className="mt-8 border-t border-brand-border pt-6">
            <h3 className="text-brand-gold text-xs uppercase tracking-widest mb-2">The Origin Story</h3>
            <p className="text-brand-cream/50 text-sm leading-relaxed">
              Sourced from the lush highlands of {product.origin}, our cacao is grown on small family estates
              at elevations between 600–1200m. The volcanic soil, rich in minerals, imparts a distinctive
              complexity to the beans. Each harvest is hand-selected to ensure only the finest pods are used.
            </p>
          </div>

          {/* ─── Craft Process ─── */}
          <div className="mt-6 border-t border-brand-border pt-6">
            <h3 className="text-brand-gold text-xs uppercase tracking-widest mb-2">From Bean to Bar</h3>
            <p className="text-brand-cream/50 text-sm leading-relaxed">
              {product.process || 'Slow-fermented for 6 days, stone-ground for 72 hours, and hand-tempered in small batches.'}
            </p>
          </div>

          {/* ─── Pairing ─── */}
          <div className="mt-6 border-t border-brand-border pt-6">
            <h3 className="text-brand-gold text-xs uppercase tracking-widest mb-2">Sommelier's Recommendation</h3>
            <p className="text-brand-cream/50 text-sm leading-relaxed italic">
              {product.pairing || 'Pairs perfectly with a bold, aged Cabernet Sauvignon or a medium-roast single-origin espresso.'}
            </p>
          </div>

          {/* ─── Testimonial ─── */}
          <div className="mt-6 border-t border-brand-border pt-6">
            <h3 className="text-brand-gold text-xs uppercase tracking-widest mb-2">Connoisseur's Choice</h3>
            <p className="text-brand-cream/60 text-sm leading-relaxed italic">
              "{product.testimonial || 'The depth of the volcanic soil is unmistakable; a truly profound experience for the dark chocolate purist.'}"
            </p>
          </div>

          {/* ─── Accordions ─── */}
          <div className="mt-8 border-t border-brand-border pt-6">
            <Accordion title="Ingredients & Provenance">
              <p>
                Cacao beans, organic cane sugar, cocoa butter, sunflower lecithin. Sourced from
                smallholder farms in the {product.origin} region. <br />
                <span className="text-brand-cream/40 text-xs">May contain traces of tree nuts and milk.</span>
              </p>
            </Accordion>
            <Accordion title="Care Instructions">
              <p>
                Best enjoyed at room temperature (18–22°C) to unlock the full flavour profile.
                Store in a cool, dry place away from direct sunlight.
              </p>
            </Accordion>
            <Accordion title="Shipping & Packaging">
              <p>
                Shipped in premium, eco‑friendly packaging. All orders are carefully packed with
                temperature control to ensure your chocolate arrives in perfect condition.
                Gift wrapping available at checkout.
              </p>
            </Accordion>
          </div>

          {/* ─── Actions ─── */}
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