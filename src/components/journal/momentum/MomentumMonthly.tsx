import React from 'react';
import { motion } from 'motion/react';
import { dateKey, getToday, cn } from '../../../lib/utils';
import { useHabitStats } from '../../../hooks/useHabitStats';
import { useAppStore } from '../../../store/useAppStore';
import { MOMENTUM_TRANSITIONS } from '../../../lib/motion';

export const MomentumMonthly: React.FC = () => {
  const { totalHabits, getDayStats, getMonthMetadata } = useHabitStats();
  const { setSelectedDay } = useAppStore();
  const { year, month, firstDay, daysInMonth } = getMonthMetadata();
  const today = getToday();
  const todayKey = dateKey(today);

  const labels = ['s', 'm', 't', 'w', 't', 'f', 's'];

  return (
    <div className="monthly-grid">
      {labels.map((l, i) => (
        <motion.div 
          key={`lbl-${i}`} 
          className={cn("month-day-lbl", i === today.getDay() && "is-today")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.02 }}
        >
          {l}
        </motion.div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={`empty-${i}`} className="month-dot empty-cell" />
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1;
        const d = new Date(year, month, day);
        const key = dateKey(d);
        const isFuture = d > today;
        const isToday = key === todayKey;
        const { done, total } = getDayStats(key);

        const cls = cn(
          "month-dot",
          isFuture && "future",
          !isFuture && total > 0 && done === total && "done",
          !isFuture && total > 0 && done > 0 && done < total && "partial",
          isToday && "is-today"
        );

        return (
          <motion.div
            key={key}
            className={cls}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={MOMENTUM_TRANSITIONS.dot(firstDay + i)}
            onClick={() => !isFuture && totalHabits > 0 && setSelectedDay(key)}
            data-day-key={!isFuture && total > 0 ? key : undefined}
          />
        );
      })}
    </div>
  );
};
