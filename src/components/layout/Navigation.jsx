import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/collections', label: 'Collections' },
  { to: '/craft',       label: 'Craft' },
  { to: '/story',       label: 'Story' },
  { to: '/experience',  label: 'Experience' },
  { to: '/journal',     label: 'Journal' },
  { to: '/contact',     label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[9000] transition-colors duration-500 ${scrolled ? 'bg-cocoa/95 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="max-w-site mx-auto px-6 md:px-10 lg:pl-16 lg:pr-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`font-display text-[16px] tracking-[0.28em] font-bold transition-opacity duration-300 ${
              isHome ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
            }`}
            data-cursor="hover"
            style={{
              background: 'linear-gradient(110deg, #8a6f3d 0%, #c9a961 30%, #f0db96 50%, #c9a961 70%, #8a6f3d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            NOIR & NOSTALGIE
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="hover"
                className="font-sans text-[10px] text-cream uppercase tracking-widest relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(o => !o)}
            data-cursor="hover"
          >
            <span className={`block w-6 h-px bg-gold transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-gold transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-gold transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[8999] bg-noir flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={l.to}
                    className="font-display text-cream text-4xl md:text-6xl hover:text-gold transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
