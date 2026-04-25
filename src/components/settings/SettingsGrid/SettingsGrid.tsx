import React from 'react';
import { motion } from 'motion/react';
import { ProfileSection } from './ProfileSection';
import { AtmosphereSection } from './AtmosphereSection';
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
      <AtmosphereSection />
      <HabitSection />
    </motion.div>
  );
}
