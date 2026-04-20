import React from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { useHabits } from '../../../hooks/useHabits';
import { useHabitStats } from '../../../hooks/useHabitStats';
import { Dialog } from '../../shared/Dialog';
import { FULL_DAYS, MONTHS, dateKey, getToday, getYesterday } from '../../../lib/utils';

export const JournalDialog = () => {
  const { selectedDay, setSelectedDay } = useAppStore();
  const { habits, handleToggle } = useHabits();
  const { getDayStats } = useHabitStats();

  if (!selectedDay) return null;

  const closeDialog = () => setSelectedDay(null);

  // 1. Structural Logic (Date Formatting)
  const parts = selectedDay.split('-');
  const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const dialogTitle = `${FULL_DAYS[dateObj.getDay()]}, ${MONTHS[dateObj.getMonth()]} ${dateObj.getDate()}`;

  // 2. Offloaded Logic (Using useHabitStats)
  const { total, done } = getDayStats(selectedDay);
  const dialogPill = total === 0 ? 'no habits tracked' : `${done} of ${total} completed`;

  // 3. Late Logging Check
  const todayKey = dateKey(getToday());
  const yesterdayKey = dateKey(getYesterday());
  const isLoggable = selectedDay === todayKey || selectedDay === yesterdayKey;

  return (
    <Dialog isOpen={Boolean(selectedDay)} onClose={closeDialog} title={dialogTitle}>
      <span className="day-summary-pill">{dialogPill}</span>
      
      <div className="day-habits-list">
        {habits.map((h) => {
          const isDone = Boolean(h.days[selectedDay]);
          return (
            <div 
              key={h.id} 
              className={`day-habit-row ${isDone ? 'done' : ''} ${!isLoggable ? 'readonly' : ''}`}
              onClick={() => isLoggable && handleToggle(h, selectedDay)}
              role="button"
              tabIndex={isLoggable ? 0 : -1}
              aria-disabled={!isLoggable}
            >
              <div className="day-habit-dot">
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="day-habit-name">{h.name}</div>
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};
