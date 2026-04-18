import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { HabitCard } from './HabitCard/HabitCard';
import { TodayEmptyState } from './TodayEmptyState';
import { GRID_VARIANTS } from '../../lib/motion';

export function HabitGrid() {
  const { habits } = useAppStore();

  return (
    <motion.div 
      className="habits-grid"
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
