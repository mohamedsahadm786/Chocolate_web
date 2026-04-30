import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = () => {
      cursorRef.current?.classList.add('hovered');
      ringRef.current?.classList.add('hovered');
    };
    const onLeave = () => {
      cursorRef.current?.classList.remove('hovered');
      ringRef.current?.classList.remove('hovered');
    };

    window.addEventListener('mousemove', move);

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[99999] hovered:opacity-0 transition-opacity duration-200"
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold/60 pointer-events-none z-[99998] opacity-0 hovered:opacity-100 transition-all duration-300"
      />
    </>
  );
}