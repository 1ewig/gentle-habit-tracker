import React from 'react';
import { cn, getTodayKey, onCardKeyDown } from '../../../lib/utils';
import { HabitStyleProps } from '../../../store/useAppStore';
import { BloomEffect } from './BloomEffect';
import { WeekRow } from './WeekRow';

// --- Style 1: Classic ---
export const StyleClassic: React.FC<HabitStyleProps> = ({ habit, handleToggle, justChecked }) => {
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


// --- Style 2: Grid (3:4 ratio) ---
export const StyleGrid: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  return (
    <>
      <div className="s2-check">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <div className="hcard-name">{habit.name}</div>
      {/* Invisible overlay to make the whole card clickable */}
      <div 
        className="s2-overlay"
        onClick={() => handleToggle()}
        onKeyDown={(e) => onCardKeyDown(e, () => handleToggle())}
        role="button"
        tabIndex={0}
        aria-label={`Mark ${habit.name} as complete for today`}
        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
      />
    </>
  );
};

// --- Style Map Configuration ---
// Maps the user setting (ID) to the corresponding style component.
export const STYLE_MAP: Record<number, React.FC<HabitStyleProps>> = {
  1: StyleClassic,
  2: StyleGrid,
};

