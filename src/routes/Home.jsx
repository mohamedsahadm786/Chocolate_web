import { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';
import RevealText from '../components/ui/RevealText';

// Rotating circular arcs + static EST. 2024 center
function CircularText() {
  return (
    <div className="w-full h-full relative">
      {/* Rotating arcs */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
          <defs>
            <path id="circ-top" d="M 28,100 A 72,72 0 0,0 172,100" />
            <path id="circ-bot" d="M 28,100 A 72,72 0 0,1 172,100" />
          </defs>
          <text fill="#c9a961" textAnchor="middle"
            style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '11px', letterSpacing: '4px' }}>
            <textPath href="#circ-top" startOffset="50%">CRAFTED IN SHADOW</textPath>
          </text>
          <text fill="#c9a961" textAnchor="middle" dy="14"
            style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '11px', letterSpacing: '6px' }}>
            <textPath href="#circ-bot" startOffset="50%">MADE FOR MEMORY</textPath>
          </text>
        </svg>
      </motion.div>

      {/* Static center — Est. 2024, does not rotate */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          className="font-sans uppercase text-gold"
          style={{ fontSize: '0.48rem', letterSpacing: '0.22em' }}
        >
          Est. 2024
        </span>
      </div>
    </div>
  );
}

// Word-by-word slide-up reveal + continuous gentle float
function AnimatedHeroText({ words, styles, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 3.2 }}
    >
      {words.map((word, i) => (
        <div
          key={i}
          style={{
            overflow: 'hidden',
            lineHeight: '0.92',
            clipPath: 'inset(0 0 0 0 round 0.8rem)',
          }}
        >
          <motion.div
            className="font-display"
            initial={{ y: '108%', opacity: 0, scaleY: 0.72, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ y: 0, opacity: 1, scaleY: 1, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ delay: delay + i * 0.14, duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
            style={styles[i]}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

function ProductShowcaseCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 16 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 16 });
  const springGlowX = useSpring(glowX, { stiffness: 160, damping: 18 });
  const springGlowY = useSpring(glowY, { stiffness: 160, damping: 18 });
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${springGlowX}% ${springGlowY}%, rgba(255,255,255,0.22), transparent 34%)`;

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 26);
    rotateX.set((0.5 - py) * 22);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const resetCard = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  const faceStyle = {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12 }}
    >
      <motion.div
        className="relative h-[15.5rem] w-[10.75rem] md:h-[18.5rem] md:w-[12.75rem] cursor-pointer"
        style={{ perspective: 1800 }}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetCard}
        data-cursor="hover"
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.13 : 1,
            rotateZ: isHovered ? 0 : index % 2 === 0 ? -1.5 : 1.5,
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          <div
            className="absolute inset-0 rounded-[1.8rem] border border-gold/25 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01)_35%,rgba(201,169,97,0.08)_100%)] shadow-[0_28px_60px_rgba(0,0,0,0.38)]"
            style={{ transform: 'translateZ(6px)' }}
          />

          <motion.div
            className="absolute inset-[0.45rem] rounded-[1.5rem] overflow-hidden"
            animate={{ rotateY: isHovered ? 180 : 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              background:
                'linear-gradient(160deg, rgba(17,10,7,0.96) 0%, rgba(43,25,17,0.92) 50%, rgba(12,7,5,0.96) 100%)',
            }}
          >
            <div className="absolute inset-0" style={faceStyle}>
              <div className="absolute inset-[0.55rem] rounded-[1.15rem] overflow-hidden bg-noir/65">
                <img
                  src={product.front}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-noir/30" />
              </div>
            </div>

            <div
              className="absolute inset-0"
              style={{
                ...faceStyle,
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="absolute inset-[0.55rem] rounded-[1.15rem] overflow-hidden bg-noir/65">
                <img
                  src={product.back}
                  alt={`${product.name} open view`}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gold/8 via-transparent to-noir/35" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-[0.35rem] rounded-[1.6rem] border border-white/8"
            style={{
              transform: 'translateZ(18px)',
              background: glowBackground,
            }}
          />

          <div
            className="pointer-events-none absolute inset-x-[1.1rem] bottom-[1rem] h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            style={{ transform: 'translateZ(22px)' }}
          />
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-4 text-center font-display text-sm tracking-[0.18em] text-gold md:text-[0.95rem]"
        animate={{ opacity: isHovered ? 1 : 0.84, y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.28 }}
      >
        {product.name}
      </motion.p>
    </motion.div>
  );
}

export default function Home() {
  const leftPanelClip = 'polygon(10% 0%, 100% 0%, 100% 76%, 94% 85%, 94% 100%, 14% 100%, 0% 88%, 0% 18%)';
  const rightPanelClip = 'polygon(10% 0%, 100% 0%, 100% 84%, 88% 84%, 76% 100%, 22% 100%, 0% 94%, 0% 8%)';
  const featuredProducts = [
    {
      name: "L'AUBE",
      front: '/images/products/01-laube-opened.png',
      back: '/images/products/01-laube-wrapped.png',
    },
    {
      name: 'MIDI',
      front: '/images/products/02-midi-wrapped.png',
      back: '/images/products/02-midi-opened.png',
    },
    {
      name: 'LE CRÉPUSCULE',
      front: '/images/products/03-crepuscule-wrapped.png',
      back: '/images/products/03-crepuscule-opened.png',
    },
    {
      name: 'MINUIT',
      front: '/images/products/04-minuit-wrapped.png',
      back: '/images/products/04-minuit-opened.png',
    },
    {
      name: 'MÉMOIRE',
      front: '/images/products/05-memoire-wrapped.png',
      back: '/images/products/05-memoire-opened.png',
    },
  ];

  return (
    <main className="bg-cocoa">

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-noir">

        {/* shine keyframe injected once */}
        <style>{`
          @keyframes brandShine {
            0%   { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          .brand-shine {
            background: linear-gradient(110deg,#8a6f3d 0%,#c9a961 22%,#f0db96 38%,#fff8e4 50%,#f0db96 62%,#c9a961 78%,#8a6f3d 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: brandShine 4s linear infinite;
            animation-delay: 1.2s;
          }
        `}</style>

        {/* ── LEFT VIDEO PANEL (desktop) ── */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-[47%] bg-noir overflow-hidden">

          {/* Top dark gap — TASTE + THE DARK text lives here */}
          <div className="absolute top-0 left-0 right-0 h-[34%] flex flex-col justify-end px-8 lg:px-14 pb-4">
            <AnimatedHeroText
              words={['TASTE', 'THE DARK']}
              styles={[
                { fontSize: 'clamp(2.8rem, 5.8vw, 6.5rem)', WebkitTextStroke: '1.5px #c9a961', color: 'transparent' },
                { fontSize: 'clamp(2.8rem, 5.8vw, 6.5rem)', color: '#f5ead4' },
              ]}
              delay={0.75}
            />
          </div>

          {/* Video — bottom 66% */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.6 }}
            className="absolute bottom-8 left-6 right-14 top-[34%] lg:left-10 lg:right-20"
          >
            <div
              className="relative h-full w-full overflow-hidden border border-cocoa-warm/70 bg-[#120907] shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
              style={{ clipPath: leftPanelClip }}
            >
              <video
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center bottom', clipPath: leftPanelClip }}
                src="/images/hero/Hero_1.mp4"
              />
              {/* Top fade — blends into the dark text gap */}
              <div className="absolute inset-0 bg-gradient-to-b from-noir via-transparent to-transparent" style={{ height: '40%', clipPath: leftPanelClip }} />
              <div className="absolute inset-0 bg-gradient-to-b from-noir/85 via-transparent to-noir/20" style={{ clipPath: leftPanelClip }} />
              {/* Right fade — toward center */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-noir/80" style={{ clipPath: leftPanelClip }} />
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT VIDEO PANEL (desktop) ── */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-[47%] bg-noir overflow-hidden">

          {/* Video — top 66% */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.6 }}
            className="absolute left-14 right-6 top-[6%] bottom-[34%] lg:left-20 lg:right-10"
          >
            <div
              className="relative h-full w-full overflow-hidden border border-cocoa-warm/70 bg-[#120907] shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
              style={{ clipPath: rightPanelClip }}
            >
              <video
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center center', clipPath: rightPanelClip }}
                src="/images/hero/Hero_2.mp4"
              />
              {/* Bottom fade — blends into the dark text gap */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-transparent to-noir/20" style={{ clipPath: rightPanelClip }} />
              {/* Left fade — toward center */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-noir/80" style={{ clipPath: rightPanelClip }} />
            </div>
          </motion.div>

          {/* Bottom dark gap — PLAY + THE LIGHT text lives here */}
          <div className="absolute bottom-0 left-0 right-0 h-[34%] flex flex-col items-end justify-start pt-4 px-8 lg:px-14 text-right">
            <AnimatedHeroText
              words={['PLAY', 'THE LIGHT']}
              styles={[
                { fontSize: 'clamp(2.8rem, 5.8vw, 6.5rem)', color: '#f5ead4', textAlign: 'right' },
                { fontSize: 'clamp(2.8rem, 5.8vw, 6.5rem)', WebkitTextStroke: '1.5px #c9a961', color: 'transparent', textAlign: 'right' },
              ]}
              delay={0.9}
            />
          </div>
        </div>

        {/* ── GLOBAL VIGNETTE ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/45 via-transparent to-noir/55 pointer-events-none" />

        {/* ── BRAND NAME — top center, shimmering gold ── */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute inset-x-0 flex justify-center"
          style={{ top: '2rem' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className="brand-shine font-display font-bold tracking-[0.32em]"
              style={{ fontSize: '13px' }}
            >
              NOIR &amp; NOSTALGIE
            </span>
            <span
              className="font-sans uppercase text-gold/80 tracking-[0.28em]"
              style={{ fontSize: '10px' }}
            >
              EST. 2024
            </span>
          </div>
        </motion.div>

        {/* ── CENTER: Circular badge — true center ── */}

        {/* ── MOBILE CENTERED LAYOUT ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          className="md:hidden absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, rotateX: [0, 2, 0], rotateY: [0, -2, 0] }}
            transition={{
              opacity: { delay: 0.7, duration: 1.1 },
              scale: { delay: 0.7, duration: 1.1, ease: [0.65, 0, 0.35, 1] },
              rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
              rotateY: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
            }}
            className="relative flex min-h-[58vh] w-full max-w-[24rem] items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 0.72, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-x-[2%] top-[8%] bottom-[8%] overflow-hidden"
              style={{
                clipPath: 'polygon(12% 0%, 100% 0%, 100% 82%, 89% 82%, 74% 100%, 18% 100%, 0% 88%, 0% 14%)',
                border: '1px solid rgba(138, 111, 61, 0.45)',
                boxShadow: '0 22px 60px rgba(0,0,0,0.45)',
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full"
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
                src="/images/hero/Hero_2.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-noir/55 via-noir/18 to-noir/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-noir/28 via-transparent to-noir/32" />
            </motion.div>

            <div
              className="relative z-10 font-display leading-[0.9] text-center"
              style={{
                fontSize: 'clamp(3.2rem, 12vw, 4.5rem)',
                textShadow: '0 10px 28px rgba(0,0,0,0.38)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scaleY: 0.72 }}
                animate={{ opacity: 1, y: [0, -3, 0], scaleY: 1 }}
                transition={{
                  opacity: { delay: 0.78, duration: 0.9 },
                  y: { delay: 0.78, duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                  scaleY: { delay: 0.78, duration: 0.9, ease: [0.65, 0, 0.35, 1] },
                }}
                style={{ WebkitTextStroke: '1px #c9a961', color: 'transparent' }}
              >
                TASTE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40, scaleY: 0.72 }}
                animate={{ opacity: 1, y: [0, 3, 0], scaleY: 1 }}
                transition={{
                  opacity: { delay: 0.9, duration: 0.9 },
                  y: { delay: 0.9, duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
                  scaleY: { delay: 0.9, duration: 0.9, ease: [0.65, 0, 0.35, 1] },
                }}
                className="text-cream"
              >
                THE DARK
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40, scaleY: 0.72 }}
                animate={{ opacity: 1, y: [0, -2, 0], scaleY: 1 }}
                transition={{
                  opacity: { delay: 1.02, duration: 0.9 },
                  y: { delay: 1.02, duration: 5.3, repeat: Infinity, ease: 'easeInOut' },
                  scaleY: { delay: 1.02, duration: 0.9, ease: [0.65, 0, 0.35, 1] },
                }}
                className="text-cream mt-1"
              >
                PLAY
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40, scaleY: 0.72 }}
                animate={{ opacity: 1, y: [0, 3, 0], scaleY: 1 }}
                transition={{
                  opacity: { delay: 1.14, duration: 0.9 },
                  y: { delay: 1.14, duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
                  scaleY: { delay: 1.14, duration: 0.9, ease: [0.65, 0, 0.35, 1] },
                }}
                style={{ WebkitTextStroke: '1px #c9a961', color: 'transparent' }}
              >
                THE LIGHT
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── BUTTON + SCROLL CUE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="hidden absolute bottom-10 inset-x-0 flex justify-center"
          style={{ zIndex: 30 }}
        >
          <div className="flex flex-col items-center gap-6">
            <MagneticButton href="/collections" className="px-5 h-11 text-[11px]">Begin the Journey →</MagneticButton>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="relative min-h-[80vh] bg-cocoa flex items-center justify-center px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <video
            className="w-full h-full object-cover scale-110 opacity-[0.08]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ filter: 'grayscale(0.2) blur(3px) brightness(0.35) saturate(0.65)' }}
          >
            <source src="/images/hero/c_amp_.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-cocoa/88" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,234,212,0.05),transparent_42%)]" />
        </div>

        <RevealText className="relative z-10 text-center">
          <p
            className="font-display text-cream leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Some things you eat.<br />
            <em>Others, you remember.</em>
          </p>
        </RevealText>
      </section>

      {/* ── FEATURED TEASER ── */}
      <section className="bg-cocoa-soft py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-site mx-auto text-center">
          <RevealText>
            <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">THE COLLECTION</p>
            <h2
              className="font-display text-cream mb-16"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Five bars. Five moments.
            </h2>
          </RevealText>

          {/* Five futuristic product cards */}
          <div className="mb-16 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
            {featuredProducts.map((product, index) => (
              <ProductShowcaseCard key={product.name} product={product} index={index} />
            ))}
          </div>

          <MagneticButton href="/collections">View the Collection →</MagneticButton>
        </div>
      </section>

      {/* ── HERITAGE WHISPER ── */}
      <section className="min-h-[70vh] bg-cocoa flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
          <video
            src="/images/hero/last.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ filter: 'sepia(40%) brightness(0.7)' }}
          />
        </div>
        <div className="md:w-1/2 flex items-center justify-center px-12 py-24">
          <RevealText>
            <p
              className="font-display text-cream italic leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
            >
              Est. 2024.<br />From bean to soul.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── EXPERIENCE HOOK ── */}
      <section className="min-h-screen bg-noir flex items-center justify-center px-6 relative overflow-hidden">
        {/* Gold dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{ y: [0, -20 - Math.random() * 20, 0] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}

        <div className="relative z-10 text-center">
          <RevealText>
            <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">THE EXPERIENCE</p>
            <h2
              className="font-display text-cream mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Every bar holds a memory.
            </h2>
            <p className="font-sans text-cream-mute text-lg tracking-wide mb-12">
              Scan. Play. Remember the child you were.
            </p>
            <MagneticButton href="/experience">Discover the Experience →</MagneticButton>
          </RevealText>
        </div>
      </section>

    </main>
  );
}
