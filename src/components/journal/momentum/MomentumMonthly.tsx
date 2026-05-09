import React from 'react';
import { motion } from 'motion/react';
import { getToday, cn } from '../../../lib/utils';
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

const getMonthDotClass = (isFuture: boolean, isToday: boolean, done: number, total: number) => {
  return cn(
    "month-dot",
    isFuture && "future",
    !isFuture && total > 0 && done === total && "done",
    !isFuture && total > 0 && done > 0 && done < total && "partial",
    isToday && "is-today"
  );
};

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
  return (
    <motion.div
      key={dayKey}
      className={getMonthDotClass(isFuture, isToday, done, total)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={MOMENTUM_TRANSITIONS.dot(index)}
      onClick={() => !isFuture && total > 0 && onSelect(dayKey)}
      data-day-key={!isFuture && total > 0 ? dayKey : undefined}
    />
  );
};

export const MomentumMonthly: React.FC = () => {
  const { totalHabits, getRollingMonthlyDays } = useHabitStats();
  const { setSelectedDay } = useAppStore();
  const today = getToday();
  const rollingDays = getRollingMonthlyDays();

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

      {rollingDays.map((day, i) => (
        <MonthCell 
          key={day.dayKey}
          dayKey={day.dayKey}
          index={i}
          isFuture={day.isFuture}
          isToday={day.isToday}
          done={day.done}
          total={totalHabits}
          onSelect={setSelectedDay}
        />
      ))}
    </div>
  );
};

