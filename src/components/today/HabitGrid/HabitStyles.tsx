import React from 'react';
import { cn, getTodayKey, onCardKeyDown } from '../../../lib/utils';
import { HabitStyleProps } from '../../../store/useAppStore';
import { BloomEffect } from './BloomEffect';
import { WeekRow } from './WeekRow';

// --- Style 1: Lists (Classic) ---
export const StyleLists: React.FC<HabitStyleProps> = ({ habit, handleToggle, justChecked }) => {
  const isDoneToday = !!habit.days[getTodayKey()];
  return (
    <>
      <div className="hcard-top">
        <div className="hcard-name">{habit.name}</div>
        <div 
          className="hcard-check" 
          onClick={() => handleToggle()}
          onKeyDown={(e) => onCardKeyDown(e, () => handleToggle())}
          role="button"
          tabIndex={0}
          aria-label={`Mark ${habit.name} as complete for today`}
          aria-pressed={isDoneToday}
        >
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          {justChecked && <BloomEffect />}
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} />
    </>
  );
};


// --- Style 2: Cards (Grid) ---
export const StyleCards: React.FC<HabitStyleProps> = ({ habit, justChecked }) => {
  return (
    <>
      <div className="scard-top">
        <div className="scard-check">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>

      <div className="scard-bottom">
        <div className="hcard-name">{habit.name}</div>
      </div>
    </>
  );
};

// --- Style Map Configuration ---
// Maps the user setting (ID) to the corresponding style component.
export const STYLE_MAP: Record<string, React.FC<HabitStyleProps>> = {
  lists: StyleLists,
  cards: StyleCards,
};

