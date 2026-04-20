import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../../../store/useAppStore';
import { getTodayKey, cn } from '../../../lib/utils';
import { useHabitToggle } from '../../../hooks/useHabits';
import { STYLE_MAP } from './HabitStyles';
import { GRID_ITEM_VARIANTS, HOVER_TAP } from '../../../lib/motion';
import type { Habit } from '../../../hooks/useHabits';

export interface HabitCardProps {
  habit: Habit;
  index: number;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, index }) => {
  const { settings } = useAppStore();
  const { justChecked, handleToggle } = useHabitToggle(habit);
  
  const isDoneToday = !!habit.days[getTodayKey()];
  const StyleComponent = STYLE_MAP[settings.style] || STYLE_MAP[1];

  return (
    <motion.div
      variants={GRID_ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
      whileHover={HOVER_TAP.hover}
      whileTap={HOVER_TAP.tap}
      custom={index}
      className={cn(
        `hcard s${settings.style}`, 
        isDoneToday && 'checked', 
        justChecked && 'just-checked'
      )}
    >
      <StyleComponent 
        habit={habit} 
        handleToggle={handleToggle} 
        justChecked={justChecked} 
      />
    </motion.div>
  );
};
