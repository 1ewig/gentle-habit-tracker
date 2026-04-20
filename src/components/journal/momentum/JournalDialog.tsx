import React from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { useHabits } from '../../../hooks/useHabits';
import { useHabitStats } from '../../../hooks/useHabitStats';
import { Dialog } from '../../shared/Dialog';
import { FULL_DAYS, MONTHS } from '../../../lib/utils';

export function JournalDialog() {
  const { selectedDay, setSelectedDay } = useAppStore();
  const { habits, handleToggle } = useHabits();
  const { getDayStats } = useHabitStats();

  if (!selectedDay) return null;

  const closeDialog = () => setSelectedDay(null);

  // 1. Structural Logic (Date Formatting)
  const parts = selectedDay.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const dialogTitle = `${FULL_DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;

  // 2. Offloaded Logic (Using useHabitStats)
  const { total, done } = getDayStats(selectedDay);
  const dialogPill = total === 0 ? 'no habits tracked' : `${done} of ${total} completed`;

  return (
    <Dialog isOpen={!!selectedDay} onClose={closeDialog} title={dialogTitle}>
      <span className="day-summary-pill">{dialogPill}</span>
      
      <div className="day-habits-list">
        {habits.map((h) => {
          const isDone = !!h.days[selectedDay];
          return (
            <div 
              key={h.id} 
              className={`day-habit-row ${isDone ? 'done' : ''}`}
              onClick={() => handleToggle(h, selectedDay)}
              role="button"
              tabIndex={0}
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
}
