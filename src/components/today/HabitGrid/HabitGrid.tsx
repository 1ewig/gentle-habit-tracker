import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../../../store/useAppStore';
import { HabitCard } from './HabitCard';
import { TodayEmptyState } from './TodayEmptyState';
import { GRID_VARIANTS } from '../../../lib/motion';

import { useShallow } from 'zustand/react/shallow';

export function HabitGrid() {
  const { habits, settings } = useAppStore(
    useShallow((state) => ({
      habits: state.habits,
      settings: state.settings
    }))
  );

  return (
    <motion.div 
      className={`habits-grid grid-${settings.style}`}
      variants={GRID_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {habits.length > 0 ? (
          habits.map((habit, idx) => (
            <HabitCard key={habit.id} habit={habit} index={idx} />
          ))
        ) : (
          <TodayEmptyState key="empty" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}