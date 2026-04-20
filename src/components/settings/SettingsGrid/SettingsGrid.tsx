import React from 'react';
import { motion } from 'motion/react';
import { ProfileSection } from './ProfileSection';
import { AppearanceSection } from './AppearanceSection';
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
      <AppearanceSection />
      <HabitSection />
    </motion.div>
  );
}
