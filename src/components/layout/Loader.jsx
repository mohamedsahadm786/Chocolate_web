import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LETTERS = [
  'N','·','O','·','I','·','R','·','&','·',
  'N','·','O','·','S','·','T','·','A','·','L','·','G','·','I','·','E',
];

// Cinematic power4 easing
const EASE = [0.76, 0, 0.24, 1];

export default function Loader({ onDone }) {
  const [phase, setPhase]     = useState('idle'); // idle → in → exit
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const shown = sessionStorage.getItem('nn-loaded');
    if (shown) { setVisible(false); onDone(); return; }

    //  150 ms  — gold bg settles, then letters begin staggering in
    //  3 500 ms — all letters visible ~0.9 s; trigger exit pull
    //  4 600 ms — both panels have completed → mount main site
    const t1 = setTimeout(() => setPhase('in'),   150);
    const t2 = setTimeout(() => setPhase('exit'), 3500);
    const t3 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('nn-loaded', '1');
      onDone();
    }, 4650);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  const isExit      = phase === 'exit';
  const textVisible = phase !== 'idle';

  return (
    <>
      {/*
        ══ PULL REVEAL — TWO-PANEL CINEMATIC WIPE ══════════════════════════════
        Panel A (gold)  : slides off to the RIGHT  →  [z-99999]
        Panel B (dark)  : sweeps in from the LEFT  →  [z-99998]

        As the gold screen pulls right, the dark cocoa screen actively enters
        from the left edge — creating a physical, directional screen-change feel.
        The text inside the gold panel also leads the pull by ~15% extra,
        so viewers see the text snap away a beat before the background follows.
        ════════════════════════════════════════════════════════════════════════
      */}

      {/* Panel B — Dark cocoa: enters from left during exit */}
      <motion.div
        className="fixed inset-0 z-[99998]"
        style={{ backgroundColor: '#1a0e0a' }}
        initial={{ x: '-100%' }}
        animate={isExit ? { x: 0 } : { x: '-100%' }}
        transition={isExit
          ? { duration: 1.0, ease: EASE, delay: 0.05 }
          : { duration: 0 }
        }
      />

      {/* Panel A — Dark: pulls right on exit */}
      <motion.div
        className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: '#0a0604' }}
        animate={isExit ? { x: '100%' } : { x: 0 }}
        transition={isExit
          ? { duration: 0.92, ease: EASE }
          : { duration: 0 }
        }
      >

        {/* ── Brand text — single line, never wraps ──────────────────────── */}
        {/*   Text pulls ahead of the container on exit (leads by ~15%),     */}
        {/*   giving the sensation of being "yanked" before the bg follows.  */}
        <motion.div
          className="flex items-center"
          style={{ flexWrap: 'nowrap', gap: '0.08em' }}
          animate={isExit ? { x: '15%' } : { x: 0 }}
          transition={isExit
            ? { duration: 0.68, ease: EASE }   // completes BEFORE container → leads the pull
            : { duration: 0 }
          }
        >
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily : 'Fraunces, serif',
                fontSize   : 'clamp(1.1rem, 3.6vw, 3.2rem)',  // ~2× the original size
                fontWeight : 700,
                color      : '#c9a961',
                display    : 'inline-block',
                lineHeight : 1,
                whiteSpace : 'nowrap',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 24 }}
              transition={{
                delay   : textVisible ? 0.15 + i * 0.085 : 0,  // smooth stagger
                duration: 0.55,
                ease    : [0.33, 1, 0.68, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

      </motion.div>
    </>
  );
}
