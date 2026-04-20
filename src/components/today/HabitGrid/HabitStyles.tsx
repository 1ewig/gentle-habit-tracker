import React from 'react';
import { cn, getWeek, getTodayIdx, getTodayKey, getYesterdayKey, dateKey, DAY_LABELS, onCardKeyDown } from '../../../lib/utils';
import { HabitStyleProps } from '../../../store/useAppStore';
import { BloomEffect } from './BloomEffect';

// --- Style 1: Classic ---
// Standard dots with a simple checkmark and Bloom Effect support.
export const StyleClassic: React.FC<HabitStyleProps> = ({ habit, handleToggle, justChecked }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 2: Strike ---
// Minimalist dots where today and yesterday can be toggled via a simple check icon.
export const StyleStrike: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 3: Switch ---
// Uses a toggle switch component for completion instead of a simple icon.
export const StyleSwitch: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 4: Counter ---
// Numeric display (0/1) for a checklist-style feel. Supports YESTERDAY_KEY toggling.
export const StyleCounter: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-bar", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 5: Pure ---
// Extremely minimal: Click the habit name itself to toggle. Dots also act as triggers.
export const StylePure: React.FC<HabitStyleProps> = ({ habit, handleToggle, justChecked }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
        {/* Ghost CTA: top right empty space marks as done */}
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
              <div 
                className={cn("wd-dot relative", done && (isToday ? "today-done" : "past-done"))} 
              >
                {isToday && justChecked && <BloomEffect size={40} />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 6: Pill ---
// Plus icon turns into a checkmark. Highlights active interaction range (today/yesterday).
export const StylePill: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 7: Block ---
// Simple checkbox icon with standard progress dots.
export const StyleBlock: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 8: Bar ---
// Progress is visualized via vertical bars instead of dots. Includes 'Y' icon placeholder.
export const StyleBar: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-bar", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 9: Arc ---
// Circular progress indicator (SVG arc) surrounding the check icon.
export const StyleArc: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-bar", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- Style 10: Peel ---
// Aesthetic 'shimmer' peel effect with a spark icon.
export const StylePeel: React.FC<HabitStyleProps> = ({ habit, handleToggle }) => {
  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();
  const week = getWeek();
  const todayIdx = getTodayIdx();
  const isDoneToday = !!habit.days[todayKey];
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
              aria-label={`${DAY_LABELS[i]} ${done ? 'completed' : 'not completed'}`}
            >
              <div className="wd-label" aria-hidden="true">{DAY_LABELS[i]}</div>
              <div className={cn("wd-dot", done && (isToday ? "today-done" : "past-done"))}></div>
            </div>
          );
        })}
      </div>
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
