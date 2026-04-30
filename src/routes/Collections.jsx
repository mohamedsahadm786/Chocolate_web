import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import MagneticButton from '../components/ui/MagneticButton';
import RevealText from '../components/ui/RevealText';

function AutoFlipCard({ frontSrc, backSrc, alt, side = 'left', delay = 0 }) {
  return (
    <motion.div
      className="relative h-[16.5rem] w-[10.5rem] md:h-[21rem] md:w-[13rem] lg:h-[24rem] lg:w-[14.5rem] cursor-pointer"
      data-cursor="hover"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.14, y: -10 }}
      style={{ perspective: 1800 }}
    >
      <motion.div
        className="absolute inset-0 rounded-[2rem] border border-gold/20 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01)_40%,rgba(201,169,97,0.08)_100%)] shadow-[0_28px_65px_rgba(0,0,0,0.42)]"
        style={{ transform: 'translateZ(8px)' }}
      />

      <motion.div
        className="absolute inset-[0.45rem] overflow-hidden rounded-[1.65rem]"
        animate={{ rotateY: [0, 0, 180, 180, 360] }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.24, 0.5, 0.74, 1],
          delay,
        }}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          background:
            'linear-gradient(160deg, rgba(17,10,7,0.96) 0%, rgba(43,25,17,0.92) 50%, rgba(12,7,5,0.96) 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="absolute inset-[0.6rem] overflow-hidden rounded-[1.2rem] bg-noir/65">
            <img
              src={frontSrc}
              alt={alt}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-noir/30" />
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="absolute inset-[0.6rem] overflow-hidden rounded-[1.2rem] bg-noir/65">
            <img
              src={backSrc}
              alt={`${alt} alternate view`}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-noir/35" />
          </div>
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-[0.35rem] rounded-[1.7rem] border border-white/8"
      />
    </motion.div>
  );
}

export default function Collections() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const product = products[current];

  const go = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => go((current - 1 + products.length) % products.length);
  const next = () => go((current + 1) % products.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  return (
    <main className="bg-cocoa">

      {/* ── INTRO ── */}
      <section className="pt-40 pb-24 text-center px-6">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">LA COLLECTION</p>
          <h1
            className="font-display text-cream mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Collection
          </h1>
          <p className="font-sans text-gold-deep text-lg tracking-wide">
            Five bars. Five moments. One craft.
          </p>
        </RevealText>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="relative h-screen w-screen overflow-hidden">

        {/* Animated background */}
        <AnimatePresence>
          <motion.div
            key={product.id + '-bg'}
            className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.04 }}
        >
          <span
            className="font-display text-cream"
            style={{ fontSize: 'clamp(8rem, 25vw, 22rem)', transform: 'rotate(-3deg)', whiteSpace: 'nowrap' }}
          >
            chocolat
          </span>
        </div>

        {/* Left product card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + '-left'}
            className="absolute inset-x-0 top-[64%] z-10 flex justify-center -translate-y-1/2 md:inset-x-auto md:left-[18%] md:top-1/2 md:block md:translate-y-[-50%] lg:left-[20%]"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <AutoFlipCard
              frontSrc={product.images.wrapped}
              backSrc={product.images.opened}
              alt={`${product.name} front`}
              side="left"
              delay={0.05}
            />
          </motion.div>
        </AnimatePresence>

        {/* Right product card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + '-right'}
            className="absolute right-[18%] top-1/2 z-10 hidden -translate-y-1/2 md:block lg:right-[20%]"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <AutoFlipCard
              frontSrc={product.images.opened}
              backSrc={product.images.wrapped}
              alt={`${product.name} alternate`}
              side="right"
              delay={0.4}
            />
          </motion.div>
        </AnimatePresence>

        {/* Center text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + '-text'}
            className="absolute inset-0 flex items-start justify-center pt-24 md:items-center md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center px-4 max-w-sm">
              <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-3">
                {product.eyebrow}
              </p>
              <h2
                className="font-display text-cream leading-none mb-4"
                style={{ fontSize: 'clamp(2rem, 4.6vw, 4rem)', whiteSpace: 'nowrap' }}
              >
                {product.name}
              </h2>
              <p className="font-body text-cream-mute text-sm tracking-widest mb-3">
                {product.notes}
              </p>
              <p className="font-sans text-gold-deep text-xs uppercase tracking-widest mb-4">
                {product.cocoa} · {product.origin}
              </p>
              <div className="w-16 h-px bg-gold mx-auto mb-4" />
              <p className="font-display text-cream text-2xl">
                {product.cta} — {product.price}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          data-cursor="hover"
          aria-label="Previous collection"
          className="absolute left-0 top-0 z-20 flex h-full w-[16%] min-w-[88px] items-center justify-start bg-gradient-to-r from-noir/18 via-noir/8 to-transparent px-4 text-cream-mute/80 transition-colors duration-300 hover:text-gold"
        >
          <span className="font-sans text-xs uppercase tracking-[0.28em]">← Prev</span>
        </button>
        <button
          onClick={next}
          data-cursor="hover"
          aria-label="Next collection"
          className="absolute right-0 top-0 z-20 flex h-full w-[16%] min-w-[88px] items-center justify-end bg-gradient-to-l from-noir/18 via-noir/8 to-transparent px-4 text-cream-mute/80 transition-colors duration-300 hover:text-gold"
        >
          <span className="font-sans text-xs uppercase tracking-[0.28em]">Next →</span>
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              data-cursor="hover"
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-gold scale-125' : 'bg-cream-mute'}`}
            />
          ))}
        </div>
      </section>

      {/* ── COLLECTIONS CLOSE ── */}
      <section className="py-32 md:py-48 text-center px-6 bg-cocoa">
        <RevealText>
          <p
            className="font-display text-cream italic mb-12"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Each bar is numbered. Each box is signed.
          </p>
          <MagneticButton href="/craft">See the Craft →</MagneticButton>
        </RevealText>
      </section>

    </main>
  );
}
