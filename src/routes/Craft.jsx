import { craftStages } from '../data/craftStages';
import RevealText from '../components/ui/RevealText';
import MagneticButton from '../components/ui/MagneticButton';

export default function Craft() {
  return (
    <main className="bg-cocoa">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">LE MÉTIER</p>
          <h1 className="font-display text-cream leading-none mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            Forty-eight hours.
          </h1>
          <p className="font-display text-gold italic" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
            Seven steps. One bar.
          </p>
        </RevealText>
      </section>

      {/* Stages */}
      <section className="py-24 px-6 md:px-12 max-w-site mx-auto">
        {craftStages.map((stage, i) => (
          <RevealText key={stage.num} delay={i * 0.05} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 border-b border-cocoa-soft last:border-none">
            <div className={`md:w-1/2 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <img src={stage.image} alt={stage.name} className="w-full h-64 md:h-80 object-cover rounded-sm" loading="lazy" />
            </div>
            <div className="md:w-1/2">
              <span className="font-display text-gold/20 text-8xl md:text-[10rem] leading-none select-none">{stage.num}</span>
              <h2 className="font-display text-cream text-4xl md:text-5xl -mt-4 md:-mt-8 mb-4">{stage.name}</h2>
              <p className="font-body text-cream-mute text-lg leading-relaxed">{stage.copy}</p>
            </div>
          </RevealText>
        ))}
      </section>

      {/* Chocolatier quote */}
      <section className="py-24 md:py-32 px-6 bg-cocoa-soft">
        <div className="max-w-site mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <img src="/images/craft/man.jpg" alt="Maître Chocolatier" className="w-full h-96 object-cover rounded-sm grayscale" loading="lazy" />
          </div>
          <RevealText className="md:w-1/2">
            <blockquote className="font-display text-cream italic leading-tight mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              "I don't make chocolate. I make pauses in your day."
            </blockquote>
            <p className="font-sans text-gold-deep text-xs uppercase tracking-widest">— Maître Chocolatier</p>
          </RevealText>
        </div>
      </section>

      {/* Sustainability bento */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-site mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[['100%','Direct Trade Cacao'],['0','Soy Lecithin'],['12','Partner Farms'],['48hr','Conching Time']].map(([num, label]) => (
            <RevealText key={label} className="bg-cocoa-soft border border-gold-deep/30 p-8 md:p-10 hover:border-gold transition-colors duration-300">
              <p className="font-display text-gold leading-none mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>{num}</p>
              <p className="font-sans text-cream-mute text-xs uppercase tracking-widest">{label}</p>
            </RevealText>
          ))}
        </div>
        <div className="text-center">
          <MagneticButton href="/story">Read Our Story →</MagneticButton>
        </div>
      </section>
    </main>
  );
}
