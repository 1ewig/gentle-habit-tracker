import React from 'react';
import { motion } from 'motion/react';
import { SettingsGrid } from '../components/settings/SettingsGrid';
import { PAGE_VARIANTS } from '../lib/motion';

export function Settings() {
  return (
    <motion.div
      className="page settings active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <SettingsGrid />
    </motion.div>
  );
}