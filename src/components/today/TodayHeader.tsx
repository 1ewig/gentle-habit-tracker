import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useHabitStats } from '../../hooks/useHabitStats';
import { getToday, dateKey, DAY_LABELS, cn } from '../../lib/utils';
import avatarImg from '../../assets/avatar.png';

export const TodayHeader = () => {
  const { profile } = useAppStore();
  const { habits } = useHabitStats();
  
  const today = getToday();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 5 + i);
    return d;
  });

  return (
    <div className="today-header">
      <div className="today-header__pfp-container">
        <img src={avatarImg} alt={profile.name} className="today-header__pfp" />
      </div>
      <h1 className="today-header__greeting">Hi, {profile.name}</h1>
      
      <div className="today-header__timeline" role="group" aria-label="Weekly visual summary">
        {week.map((d, i) => {
          const key = dateKey(d);
          const isToday = i === 5;
          const done = habits.length > 0 && habits.some(h => !!h.days[key]);
          const dayLabel = DAY_LABELS[d.getDay()].toUpperCase();

          return (
            <div 
              key={key} 
              className={cn(
                "today-header__timeline-day", 
                isToday && "is-today",
                done && "is-done"
              )}
            >
              {done ? (
                <div className="today-header__timeline-circle">
                  {dayLabel}
                </div>
              ) : (
                <span className="today-header__timeline-label">{dayLabel}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
