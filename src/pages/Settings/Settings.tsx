import React from 'react';
import { motion } from 'motion/react';
import { ProfileSection } from '../../components/settings/SettingsGrid/ProfileSection';
import { AppearanceSection } from '../../components/settings/SettingsGrid/AppearanceSection';
import { HabitSection } from '../../components/settings/SettingsGrid/HabitSection';
import { PAGE_VARIANTS, GRID_VARIANTS } from '../../lib/motion';

export function Settings() {
  return (
    <motion.div
      className="page settings active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
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
    </motion.div>
  );
}