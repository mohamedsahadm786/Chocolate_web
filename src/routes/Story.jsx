import { useState } from 'react';
import { origins } from '../data/origins';
import RevealText from '../components/ui/RevealText';
import { motion } from 'framer-motion';

export default function Story() {
  const [activeOrigin, setActiveOrigin] = useState(null);

  return (
    <main className="bg-cocoa">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">L'HISTOIRE</p>
          <h1 className="font-display text-cream italic" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
            It started with a memory.
          </h1>
        </RevealText>
      </section>

      {/* Founder's letter */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-site mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-2/5">
            <img src="/images/story/story.jpg" alt="Founder" className="w-full h-[500px] object-cover rounded-sm" loading="lazy" />
          </div>
          <RevealText className="md:w-3/5 flex flex-col justify-center">
            <div className="font-display text-cream leading-relaxed" style={{ fontSize: '1.25rem' }}>
              <p className="mb-6 flow-root">
                <span className="float-left font-display text-gold mr-3 leading-none" style={{ fontSize: '5rem', lineHeight: '0.8' }}>M</span>
                y grandmother kept chocolate in a tin painted with cherries.
              </p>
              <p className="mb-6 clear-left">I was seven. The tin lived on the highest shelf, and on Sundays she would lift me up to choose one piece. I would choose slowly. Not because I could not decide. Because I wanted the lifting to last.</p>
              <p className="mb-8">I have been chasing that tin ever since.</p>
              <svg viewBox="0 0 200 60" className="w-40 h-12 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10,40 Q30,10 50,35 Q70,55 90,30 Q110,10 130,35 Q150,55 170,30 Q185,15 195,25" strokeLinecap="round" />
              </svg>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Origin Map — simplified interactive */}
      <section className="py-24 px-6 bg-cocoa-soft relative overflow-hidden">
        <div className="max-w-site mx-auto">
          <RevealText className="text-center mb-16">
            <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">ORIGINS</p>
            <h2 className="font-display text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Five farms. Five flavors.
            </h2>
          </RevealText>

          <div className="relative w-full h-[300px] md:h-[400px] bg-cocoa rounded-sm overflow-hidden mb-8">
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600" alt="World map" className="w-full h-full object-cover opacity-20" loading="lazy" />
            {origins.map((o) => (
              <motion.button
                key={o.id}
                onClick={() => setActiveOrigin(activeOrigin?.id === o.id ? null : o)}
                data-cursor="hover"
                className="absolute"
                style={{ left: `${o.coords.x}%`, top: `${o.coords.y}%` }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
              >
                <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_rgba(201,169,97,0.8)]" />
              </motion.button>
            ))}
          </div>

          {activeOrigin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="font-sans text-gold text-xs uppercase tracking-widest mb-2">{activeOrigin.country} · {activeOrigin.farm}</p>
              <p className="font-display text-cream italic text-xl">{activeOrigin.note}</p>
            </motion.div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {origins.map(o => (
              <button
                key={o.id}
                onClick={() => setActiveOrigin(activeOrigin?.id === o.id ? null : o)}
                data-cursor="hover"
                className={`font-sans text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-200 ${activeOrigin?.id === o.id ? 'border-gold text-gold' : 'border-gold-deep text-cream-mute hover:border-gold hover:text-gold'}`}
              >
                {o.country}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[['Craft','Time over speed.'],['Origin','Soil over scale.'],['Memory','Story over sale.']].map(([title, sub]) => (
            <RevealText key={title} className="bg-cocoa-soft border border-gold-deep/30 p-10 hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-display text-cream mb-2" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}>{title}</h3>
              <p className="font-display text-gold italic text-xl">{sub}</p>
            </RevealText>
          ))}
        </div>
      </section>
    </main>
  );
}
