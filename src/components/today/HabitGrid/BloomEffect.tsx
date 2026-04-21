import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOOM_VARIANTS } from '../../../lib/motion';

interface BloomEffectProps {
  size?: number;
  color?: string;
}

export function BloomEffect({ size = 50, color = 'var(--accent)' }: BloomEffectProps) {
  return (
    <AnimatePresence>
      <motion.div 
        className="bloom-effect"
        variants={BLOOM_VARIANTS}
        initial="initial"
        animate="animate"
        style={{ 
          '--bloom-size': `${size}px`,
          '--bloom-color': color
        } as React.CSSProperties}
      />
    </AnimatePresence>
  );
}
