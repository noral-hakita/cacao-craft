export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-serif text-4xl mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-brand-cream/60 text-sm leading-relaxed">
        <p>
          <strong>Last updated:</strong> June 2026
        </p>
        <p>
          At Cacao &amp; Craft, we take your privacy seriously. This policy outlines how we collect,
          use, and protect your personal information.
        </p>
        <h2 className="text-brand-gold text-base font-serif font-light mt-8">1. Information We Collect</h2>
        <p>
          We collect information you provide directly, such as your name, email address, phone number,
          and shipping address when you place an order or sign up for our newsletter.
        </p>
        <h2 className="text-brand-gold text-base font-serif font-light mt-8">2. How We Use Your Information</h2>
        <p>
          We use your information to process orders, send order confirmations, provide customer support,
          and send you promotional communications (only if you opt in).
        </p>
        <h2 className="text-brand-gold text-base font-serif font-light mt-8">3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data. Your payment information
          is processed securely through encrypted channels.
        </p>
        <h2 className="text-brand-gold text-base font-serif font-light mt-8">4. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data at any time. Contact us
          at <a href="mailto:atelier@cacaocraft.com" className="text-brand-gold hover:underline">atelier@cacaocraft.com</a> to make a request.
        </p>
        <p className="mt-8 text-brand-cream/40 text-xs">
          This policy may be updated from time to time. We will notify you of any significant changes.
        </p>
      </div>
    </div>
  )
}