import React from 'react';
import { motion } from 'motion/react';
import { NeuralWeb } from '../components/journal/NeuralWeb/NeuralWeb';
import { MomentumDock } from '../components/journal/momentum/MomentumDock';
import { JournalDialog } from '../components/journal/JournalDialog';
import { PAGE_VARIANTS } from '../lib/motion';

export const Journal = () => {
  return (
    <motion.div
      className="page journal active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <NeuralWeb />
      <MomentumDock />
      <JournalDialog />
    </motion.div>
  );
};
