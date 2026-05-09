import React from 'react';
import { motion } from 'motion/react';
import { HeroSection } from '../components/today/HeroSection/HeroSection';
import { HabitGrid } from '../components/today/HabitGrid';
import { PAGE_VARIANTS } from '../lib/motion';

export function Today() {
  return (
    <motion.div
      className="page today active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <HeroSection />
      <HabitGrid />
    </motion.div>
  );
}