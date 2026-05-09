import React from 'react';
import { useHabitStats } from '../../../hooks/useHabitStats';
import { getToday, dateKey, DAY_LABELS, cn } from '../../../lib/utils';

export const HeroTimeline: React.FC = () => {
  const { getDayStats } = useHabitStats();
  const today = getToday();

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 5 + i);
    return d;
  });

  return (
    <div className="hero-section__timeline" role="group" aria-label="Weekly visual summary">
      {week.map((d, i) => {
        const key = dateKey(d);
        const isToday = i === 5;
        const { done: doneCount } = getDayStats(key);
        const done = doneCount > 0;
        const dayLabel = DAY_LABELS[d.getDay()].toUpperCase();

        return (
          <div 
            key={key} 
            className={cn(
              "hero-section__timeline-day", 
              isToday && "is-today",
              done && "is-done"
            )}
          >
            {done ? (
              <div className="hero-section__timeline-circle">
                {dayLabel}
              </div>
            ) : isToday ? (
              <div className="hero-section__timeline-outline">
                {dayLabel}
              </div>
            ) : (
              <span className="hero-section__timeline-label">{dayLabel}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
