import { articles } from '../data/articles';
import RevealText from '../components/ui/RevealText';

export default function Journal() {
  return (
    <main className="bg-cocoa">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">LE JOURNAL</p>
          <h1 className="font-display text-cream italic" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Letters from the atelier.
          </h1>
        </RevealText>
      </section>

      {/* Featured */}
      <section className="relative h-[70vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1600" alt="Featured" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-3">FEATURED · SPRING 2026</p>
          <h2 className="font-display text-cream italic mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}>
            Why we made a chocolate that tastes like rain.
          </h2>
          <p className="font-body text-cream-mute mb-4">On Mémoire, and the day we found the recipe in a forgotten letter.</p>
          <p className="font-sans text-gold-deep text-xs uppercase tracking-widest">7 min read</p>
        </div>
      </section>

      {/* Bento grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-site mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <RevealText
              key={article.id}
              className={`group relative overflow-hidden rounded-sm bg-cocoa-soft cursor-pointer ${
                article.size === 'large' ? 'row-span-2' : article.size === 'wide' ? 'col-span-2' : ''
              }`}
              data-cursor="hover"
            >
              <div className={`relative overflow-hidden ${article.size === 'large' ? 'h-80 md:h-full min-h-[400px]' : 'h-48 md:h-56'}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <h3 className="font-display text-cream italic text-lg md:text-xl leading-tight mb-1">{article.title}</h3>
                  <p className="font-sans text-gold-deep text-xs uppercase tracking-widest">{article.readTime}</p>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 transition-all duration-300 rounded-sm" />
              </div>
            </RevealText>
          ))}
        </div>
      </section>
    </main>
  );
}