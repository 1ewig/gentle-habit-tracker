import React from 'react';
import { motion } from 'motion/react';
import { dateKey, getToday, cn } from '../../../lib/utils';
import { useHabitStats } from '../../../hooks/useHabitStats';
import { useAppStore } from '../../../store/useAppStore';
import { MOMENTUM_TRANSITIONS } from '../../../lib/motion';

const LABELS = [
  { id: 'sun', label: 's' },
  { id: 'mon', label: 'm' },
  { id: 'tue', label: 't' },
  { id: 'wed', label: 'w' },
  { id: 'thu', label: 't' },
  { id: 'fri', label: 'f' },
  { id: 'sat', label: 's' }
];

const MonthCell = ({ 
  dayKey, 
  isFuture, 
  isToday, 
  done, 
  total, 
  index, 
  onSelect 
}: { 
  dayKey: string; 
  isFuture: boolean; 
  isToday: boolean; 
  done: number; 
  total: number; 
  index: number; 
  onSelect: (key: string) => void;
}) => {
  const cls = cn(
    "month-dot",
    isFuture && "future",
    !isFuture && total > 0 && done === total && "done",
    !isFuture && total > 0 && done > 0 && done < total && "partial",
    isToday && "is-today"
  );

  return (
    <motion.div
      key={dayKey}
      className={cls}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={MOMENTUM_TRANSITIONS.dot(index)}
      onClick={() => !isFuture && total > 0 && onSelect(dayKey)}
      data-day-key={!isFuture && total > 0 ? dayKey : undefined}
    />
  );
};

export const MomentumMonthly: React.FC = () => {
  const { totalHabits, getDayStats, getMonthMetadata } = useHabitStats();
  const { setSelectedDay } = useAppStore();
  const { year, month, firstDay, daysInMonth } = getMonthMetadata();
  const today = getToday();
  const todayKey = dateKey(today);

  return (
    <div className="monthly-grid">
      {LABELS.map((item, i) => (
        <motion.div 
          key={item.id} 
          className={cn("month-day-lbl", i === today.getDay() && "is-today")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.02 }}
        >
          {item.label}
        </motion.div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={`month-pad-${year}-${month}-${i}`} className="month-dot empty-cell" />
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const dateObj = new Date(year, month, i + 1);
        const dayKey = dateKey(dateObj);
        const { done, total } = getDayStats(dayKey);

        return (
          <MonthCell 
            key={dayKey}
            dayKey={dayKey}
            index={firstDay + i}
            isFuture={dateObj > today}
            isToday={dayKey === todayKey}
            done={done}
            total={totalHabits}
            onSelect={setSelectedDay}
          />
        );
      })}
    </div>
  );
};
