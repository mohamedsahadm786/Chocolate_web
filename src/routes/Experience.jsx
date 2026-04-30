import RevealText from '../components/ui/RevealText';
import MagneticButton from '../components/ui/MagneticButton';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Receive', body: 'Each bar arrives sealed in gold.', img: '/images/experience/recieve.jpg' },
  { num: '02', title: 'Scan',    body: 'Lift the foil. Find the seal. Scan.', img: '/images/experience/scan.jpg' },
  { num: '03', title: 'Play',    body: 'Step into the memory you forgot.', img: '/images/experience/play.jpg' },
];

const manifestoLines = [
  { text: 'You have forgotten so many things.', italic: false },
  { text: 'The way the floor felt under bare feet.', italic: true },
  { text: 'The board games on rainy afternoons.', italic: false },
  { text: 'The taste of the first chocolate someone gave you.', italic: true },
  { text: 'We cannot return them all.', italic: false },
  { text: 'But we can return one.', italic: true },
];

export default function Experience() {
  return (
    <main className="bg-cocoa">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">L'EXPÉRIENCE</p>
          <h1 className="font-display text-cream leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
            A chocolate is a moment.<br />
            <em>Every moment deserves a memory.</em>
          </h1>
        </RevealText>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {steps.map((step, i) => (
            <RevealText key={step.num} delay={i * 0.15} className="flex flex-col items-center text-center">
              <img src={step.img} alt={step.title} className="w-full h-48 md:h-56 object-cover rounded-sm mb-6" loading="lazy" />
              <span className="font-display text-gold/30 text-8xl md:text-[7rem] leading-none select-none">{step.num}</span>
              <h3 className="font-display text-cream text-3xl -mt-4 mb-3">{step.title}</h3>
              <p className="font-body text-cream-mute">{step.body}</p>
            </RevealText>
          ))}
        </div>
      </section>

      {/* Nostalgia manifesto */}
      <section className="py-24 md:py-32 px-6 bg-noir text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          {manifestoLines.map((line, i) => (
            <RevealText key={i} delay={i * 0.1}>
              <p className="font-display text-cream" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                {line.italic ? <em>{line.text}</em> : line.text}
              </p>
            </RevealText>
          ))}
        </div>
      </section>

      {/* Game preview CTA */}
      <section className="py-24 md:py-32 px-6 text-center bg-cocoa-soft">
        <RevealText>
          <p className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4">WHAT WAITS BEHIND THE SEAL</p>
          <div className="w-full max-w-md mx-auto h-48 md:h-64 bg-cocoa rounded-sm overflow-hidden mb-12 relative">
            <img src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800" alt="Game preview" className="w-full h-full object-cover opacity-50" loading="lazy" />
            <motion.div
              className="absolute bottom-4 right-4 text-4xl"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
            >
              🎲
            </motion.div>
          </div>
          {/* CLAUDE-NOTE: Replace href="#" with game site URL once deployed */}
          <MagneticButton href="#" variant="filled">Buy a Bar — Unlock the Memory →</MagneticButton>
        </RevealText>
      </section>
    </main>
  );
}
