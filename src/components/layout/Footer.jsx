import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (email) { setSent(true); setEmail(''); }
  };

  return (
    <footer className="bg-noir pt-24 pb-12 px-6 md:px-12 lg:px-24">
      {/* Newsletter */}
      <div className="max-w-site mx-auto text-center mb-20">
        <p className="font-display text-cream text-xl md:text-2xl italic mb-8">
          Letters from the atelier. Once a month. Never more.
        </p>
        {sent ? (
          <p className="font-sans text-gold text-sm tracking-widest uppercase">Thank you. We'll write soon.</p>
        ) : (
          <div className="flex items-end justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 bg-transparent border-b border-gold-deep text-cream font-body pb-2 focus:outline-none focus:border-gold placeholder:text-cream-mute text-sm"
            />
            <button
              onClick={handleSubmit}
              data-cursor="hover"
              className="text-gold border-b border-gold pb-2 font-sans text-xs uppercase tracking-widest hover:text-gold-bright transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Links */}
      <div className="max-w-site mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        {[
          { title: 'The House', links: [['Story','/story'],['Contact','/contact']] },
          { title: 'The Collection', links: [["L'Aube",'/collections'],['Midi','/collections'],['Le Crépuscule','/collections'],['Minuit','/collections'],['Mémoire','/collections']] },
          { title: 'Discover', links: [['Craft','/craft'],['Journal','/journal'],['Experience','/experience']] },
          { title: 'Connect', links: [['Instagram','#'],['Pinterest','#'],['Email','/contact']] },
        ].map(col => (
          <div key={col.title}>
            <p className="font-sans text-xs text-gold uppercase tracking-widest mb-4">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="font-body text-sm text-cream-mute hover:text-cream transition-colors" data-cursor="hover">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="max-w-site mx-auto flex flex-col md:flex-row justify-between items-center border-t border-cocoa-soft pt-8">
        <p className="font-body text-xs text-cream-mute">© 2026 Noir & Nostalgie · Paris</p>
        <p className="font-body text-xs text-cream-mute mt-2 md:mt-0">Crafted with patience.</p>
      </div>
    </footer>
  );
}