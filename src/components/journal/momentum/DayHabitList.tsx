import React from 'react';

interface DayHabit {
  name: string;
  done: boolean;
}

interface DayHabitListProps {
  habits: DayHabit[];
}

export function DayHabitList({ habits }: DayHabitListProps) {
  return (
    <div className="day-habits-list">
      {habits.map((h, i) => (
        <div key={i} className={`day-habit-row ${h.done ? 'done' : ''}`}>
          <div className="day-habit-dot">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="day-habit-name">{h.name}</div>
        </div>
      ))}
    </div>
  );
}
