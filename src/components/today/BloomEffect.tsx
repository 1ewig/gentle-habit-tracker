import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOOM_VARIANTS } from '../../lib/motion';

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
          position: 'absolute',
          left: '50%', 
          top: '50%', 
          width: size, 
          height: size, 
          marginLeft: -(size/2), 
          marginTop: -(size/2),
          background: color,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </AnimatePresence>
  );
}
