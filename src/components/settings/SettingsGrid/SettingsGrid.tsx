import React from 'react';
import { motion } from 'motion/react';
import { ProfileSection } from './ProfileSection';
import { CustomizationSection } from './CustomizationSection';
import { HabitSection } from './HabitSection';
import { GRID_VARIANTS } from '../../../lib/motion';

export function SettingsGrid() {
  return (
    <motion.div
      className="settings-grid"
      variants={GRID_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <ProfileSection />
      <CustomizationSection />
      <HabitSection />
    </motion.div>
  );
}
