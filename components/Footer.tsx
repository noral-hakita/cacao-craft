import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-brand-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <span className="f-wordmark">Cacao <span>&amp;</span> Craft</span>
          <span className="f-tagline">From bean to bar, uncommonly pure.</span>
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-brand-cream/30 hover:text-brand-gold transition text-sm">Instagram</a>
            <a href="#" className="text-brand-cream/30 hover:text-brand-gold transition text-sm">Facebook</a>
            <a href="#" className="text-brand-cream/30 hover:text-brand-gold transition text-sm">Pinterest</a>
          </div>
        </div>

        {/* Contact */}
        <div className="f-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:atelier@cacaocraft.com">atelier@cacaocraft.com</a></li>
            <li><a href="#">+1 (800) 839 7700</a></li>
            <li><a href="#">123 Chocolate Lane, London, UK</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="f-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">The Collection</a></li>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#">Reserve a Tasting</a></li>
            <li><a href="#">Shipping & Returns</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="f-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border py-6 px-6 text-center text-brand-cream/30 text-xs">
        <p>© {new Date().getFullYear()} Cacao &amp; Craft. All rights reserved.</p>
      </div>
    </footer>
  )
}
