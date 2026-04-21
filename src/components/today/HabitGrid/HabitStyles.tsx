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

// --- Style 2: Strike ---
export const StyleStrike: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Toggle strike for ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} />
    </>
  );
};

// --- Style 3: Switch ---
export const StyleSwitch: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const isDoneToday = !!habit.days[getTodayKey()];
  return (
    <>
      <div className="hcard-top">
        <div className="hcard-name">{habit.name}</div>
        <div 
          className="hcard-check" 
          onClick={() => handleToggle()}
          onKeyDown={(e) => onCardKeyDown(e, () => handleToggle())}
          role="switch"
          aria-checked={isDoneToday}
          tabIndex={0}
          aria-label={`Toggle ${habit.name}`}
        >
          <div className="hcard-knob"></div>
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} />
    </>
  );
};

// --- Style 4: Counter ---
export const StyleCounter: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Increment ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          {isDoneToday ? '1' : '0'}
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} indicator="bar" />
    </>
  );
};

// --- Style 5: Pure ---
export const StylePure: React.FC<HabitStyleProps> = ({ habit, handleToggle, justChecked }) => {
  const isDoneToday = !!habit.days[getTodayKey()];
  return (
    <>
      <div className="hcard-top">
        <div 
          className="hcard-name" 
          onClick={() => handleToggle()}
          onKeyDown={(e) => onCardKeyDown(e, () => handleToggle())}
          role="button"
          tabIndex={0}
          aria-label={`Toggle ${habit.name}`}
        >
          {habit.name}
        </div>
        <div 
          className="hcard-check" 
          onClick={() => handleToggle()}
          onKeyDown={(e) => onCardKeyDown(e, () => handleToggle())}
          role="button"
          tabIndex={0}
          aria-label={`Mark ${habit.name} as complete for today`}
          aria-pressed={isDoneToday}
        />
      </div>
      <WeekRow 
        habit={habit} 
        handleToggle={handleToggle} 
        renderIndicator={(isToday, done) => (
          <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}>
            {isToday && justChecked && <BloomEffect size={40} />}
          </div>
        )}
      />
    </>
  );
};

// --- Style 6: Pill ---
export const StylePill: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Toggle ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          <svg className="icon-plus" viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          <svg className="icon-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} />
    </>
  );
};

// --- Style 7: Block ---
export const StyleBlock: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Toggle ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} />
    </>
  );
};

// --- Style 8: Bar ---
export const StyleBar: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Toggle ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          Y
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} indicator="bar" />
    </>
  );
};

// --- Style 9: Arc ---
export const StyleArc: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Toggle ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          <svg viewBox="0 0 32 32" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
            <circle className="arc-bg" cx="16" cy="16" r="14" />
            <circle className="arc-fill" cx="16" cy="16" r="14" />
          </svg>
          <div className="arc-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} indicator="bar" />
    </>
  );
};

// --- Style 10: Peel ---
export const StylePeel: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
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
          aria-label={`Toggle ${habit.name}`}
          aria-pressed={isDoneToday}
        >
          <div className="peel-bg"></div>
          <div className="peel-icon">✦</div>
        </div>
      </div>
      <WeekRow habit={habit} handleToggle={handleToggle} />
    </>
  );
};

// --- Style Map Configuration ---
// Maps the user setting (ID) to the corresponding style component.
export const STYLE_MAP: Record<number, React.FC<HabitStyleProps>> = {
  1: StyleClassic,
  2: StyleStrike,
  3: StyleSwitch,
  4: StyleCounter,
  5: StylePure,
  6: StylePill,
  7: StyleBlock,
  8: StyleBar,
  9: StyleArc,
  10: StylePeel,
};
