import React from 'react';
import { cn, getToday, getTodayKey, getYesterdayKey, dateKey, DAY_LABELS, onCardKeyDown } from '../../../lib/utils';
import { Habit } from '../../../hooks/useHabits';

interface WeekRowProps {
  habit: Habit;
  handleToggle: (key?: string) => void;
  indicator?: 'dot' | 'bar';
  renderIndicator?: (isToday: boolean, done: boolean) => React.ReactNode;
}

export const WeekRow: React.FC<WeekRowProps> = ({ habit, handleToggle, indicator = 'dot', renderIndicator }) => {
  const today = getToday();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 5 + i);
    return d;
  });
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();


  return (
    <div className="week-row" role="group" aria-label="Weekly progress">
      {week.map((d, i) => {
        const key = dateKey(d);
        const done = !!habit.days[key];
        const isToday = i === 5;
        const isYesterday = key === yesterdayKey;
        const canToggle = isToday || isYesterday;
        return (
          <div 
            key={key} 
            className={cn("wd", isToday && "is-today", isYesterday && "is-yesterday")} 
            onClick={canToggle ? () => handleToggle(isToday ? todayKey : key) : undefined}
            onKeyDown={canToggle ? (e) => onCardKeyDown(e, () => handleToggle(isToday ? todayKey : key)) : undefined}
            role={canToggle ? "button" : "presentation"}
            tabIndex={canToggle ? 0 : -1}
            aria-label={isToday ? `Toggle ${habit.name} for today` : `${DAY_LABELS[d.getDay()]} ${done ? 'completed' : 'not completed'}`}
          >
            <div className="wd-label" aria-hidden="true">{DAY_LABELS[d.getDay()]}</div>
            {renderIndicator ? renderIndicator(isToday, done) : (
              <div className={cn(indicator === 'dot' ? "wd-dot" : "wd-bar", done && (isToday ? "today-done" : "past-done"))}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
