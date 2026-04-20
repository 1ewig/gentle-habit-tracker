import React from 'react';
import { motion } from 'motion/react';
import { NeuralContainer } from '../components/journal/NeuralContainer';
import { JournalDialog } from '../components/journal/momentum/JournalDialog';
import { PAGE_VARIANTS } from '../lib/motion';

export function Journal() {
  return (
    <motion.div
      className="page journal active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <NeuralContainer />
      <JournalDialog />
    </motion.div>
  );
}
