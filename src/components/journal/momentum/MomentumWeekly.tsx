import React from 'react';
import { motion } from 'motion/react';
import { WEEK, TODAY, TODAY_IDX, dateKey, DAY_LABELS, cn } from '../../../lib/utils';
import { useMomentum } from '../../../hooks/useMomentum';
import { useAppStore } from '../../../store/useAppStore';
import { MOMENTUM_TRANSITIONS } from '../../../lib/motion';

export const MomentumWeekly: React.FC = () => {
  const { totalHabits, getDayStats } = useMomentum();
  const { setSelectedDay } = useAppStore();

  return (
    <div className="weekly-chart">
      {WEEK.map((d, i) => {
        const key = dateKey(d);
        const isFuture = d > TODAY;
        const { pct } = getDayStats(key);
        const isToday = i === TODAY_IDX;
        
        // Mathematical constant for minimal visibility
        const MIN_VISIBILITY_PCT = totalHabits > 0 ? 10 : 2;
        const displayPct = isFuture ? MIN_VISIBILITY_PCT : Math.max(pct, MIN_VISIBILITY_PCT);
        const isEmpty = pct === 0;

        return (
          <div
            key={key}
            className="day-bar-wrap"
            onClick={() => !isFuture && totalHabits > 0 && setSelectedDay(key)}
          >
            <div className="day-bar-track">
              <motion.div
                className={cn("day-bar-fill", isFuture && "is-future", isEmpty && "is-empty")}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: displayPct / 100 }}
                style={{ originY: 1, height: '100%' }}
                transition={MOMENTUM_TRANSITIONS.bar(i)}
              />
            </div>
            <motion.div 
              className={cn("day-bar-label", isToday && "is-today")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={MOMENTUM_TRANSITIONS.label(i)}
            >
              {DAY_LABELS[i]}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
