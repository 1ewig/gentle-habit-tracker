import React from 'react';
import { cn, getWeek, getTodayIdx, getTodayKey, getYesterdayKey, dateKey, DAY_LABELS, onCardKeyDown } from '../../../lib/utils';
import { Habit } from '../../../hooks/useHabits';

interface WeekRowProps {
  habit: Habit;
  handleToggle: (key?: string) => void;
  indicator?: 'dot' | 'bar';
  renderIndicator?: (isToday: boolean, done: boolean) => React.ReactNode;
}

export const WeekRow: React.FC<WeekRowProps> = ({ habit, handleToggle, indicator = 'dot', renderIndicator }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();

  return (
    <div className="week-row" role="group" aria-label="Weekly progress">
      {week.map((d, i) => {
        const key = dateKey(d);
        const done = !!habit.days[key];
        const isToday = i === todayIdx;
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
            aria-label={isToday ? `Toggle ${habit.name} for today` : `${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
          >
            <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
            {renderIndicator ? renderIndicator(isToday, done) : (
              <div className={cn(indicator === 'dot' ? "wd-dot" : "wd-bar", done && (isToday ? "today-done" : "past-done"))}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
