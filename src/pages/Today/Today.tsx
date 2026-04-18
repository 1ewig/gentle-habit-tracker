import React from 'react';
import { motion } from 'motion/react';
import { TodayHeader } from '../../components/today/TodayHeader';
import { HabitGrid } from '../../components/today/HabitGrid';
import { PAGE_VARIANTS } from '../../lib/motion';

export function Today() {
  return (
    <motion.div
      className="page today active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <TodayHeader />
      <HabitGrid />
    </motion.div>
  );
}