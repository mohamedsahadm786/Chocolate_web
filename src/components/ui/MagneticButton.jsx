import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, href, onClick, variant = 'outline', className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base = `relative inline-flex items-center justify-center px-8 h-14 font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${className}`;
  const styles = variant === 'filled'
    ? `${base} bg-gold text-noir hover:bg-gold-bright`
    : `${base} border border-gold text-cream hover:bg-gold hover:text-noir`;

  const Tag = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={styles}
        data-cursor="hover"
      >
        {children}
      </Tag>
    </motion.div>
  );
}