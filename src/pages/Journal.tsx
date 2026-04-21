import React from 'react';
import { motion } from 'motion/react';
import { JournalScene } from '../components/journal/JournalScene';
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
      <JournalScene />
    </motion.div>
  );
};
