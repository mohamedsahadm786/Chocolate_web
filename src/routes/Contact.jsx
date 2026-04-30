import { useState } from 'react';
import RevealText from '../components/ui/RevealText';
import MagneticButton from '../components/ui/MagneticButton';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', occasion: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const handleSubmit = () => {
    if (form.name && form.email) {
      setSent(true);
      setForm({ name: '', email: '', occasion: '', message: '' });
    }
  };

  const inputClass = "w-full bg-transparent border-b border-gold-deep text-cream font-body pb-2 pt-6 focus:outline-none focus:border-gold placeholder:text-cream-mute/50 text-base transition-colors duration-300";

  return (
    <main className="bg-cocoa">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">L'ATELIER</p>
          <h1 className="font-display text-cream italic mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Visit the atelier.
          </h1>
          <p className="font-sans text-cream-mute tracking-wide">By appointment. By invitation. By memory.</p>
        </RevealText>
      </section>

      {/* Location image */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-site mx-auto">
          <img src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1600" alt="Atelier" className="w-full h-64 md:h-96 object-cover rounded-sm mb-12" loading="lazy" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              ['Address', ['14 Rue de l\'Aube', 'Paris 4ème', 'France']],
              ['Hours', ['Tuesday – Saturday', 'By appointment only', 'Closed Sun & Mon']],
              ['Contact', ['hello@noiretnostalgie.com', '+33 1 42 00 00 00', '@noiretnostalgie']],
            ].map(([title, lines]) => (
              <div key={title}>
                <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">{title}</p>
                {lines.map(line => (
                  <p key={line} className="font-body text-cream text-sm leading-loose">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 px-6 bg-cocoa-soft">
        <div className="max-w-[600px] mx-auto">
          <RevealText className="text-center mb-12">
            <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-2">BESPOKE ENQUIRY</p>
            <h2 className="font-display text-cream italic" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Send a letter.
            </h2>
          </RevealText>

          {sent ? (
            <div className="text-center py-16">
              <p className="font-display text-cream italic text-2xl">
                Letter received. We respond within 48 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative">
                <label className="absolute top-0 font-sans text-gold text-xs uppercase tracking-widest">Name</label>
                <input type="text" value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
              </div>
              <div className="relative">
                <label className="absolute top-0 font-sans text-gold text-xs uppercase tracking-widest">Email</label>
                <input type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="your@email.com" />
              </div>
              <div className="relative">
                <label className="absolute top-0 font-sans text-gold text-xs uppercase tracking-widest">Occasion</label>
                <select value={form.occasion} onChange={update('occasion')} className={`${inputClass} appearance-none`}>
                  <option value="">Select an occasion</option>
                  {['Corporate Gift','Wedding','Private Event','Press','Other'].map(o => (
                    <option key={o} value={o} className="bg-cocoa text-cream">{o}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <label className="absolute top-0 font-sans text-gold text-xs uppercase tracking-widest">Message</label>
                <textarea value={form.message} onChange={update('message')} rows={6} className={`${inputClass} resize-none`} placeholder="Your message..." />
              </div>
              <div className="pt-4">
                <MagneticButton onClick={handleSubmit} variant="filled" className="w-full justify-center">
                  Send the letter →
                </MagneticButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}