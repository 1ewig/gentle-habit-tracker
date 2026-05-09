import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useHabitStats } from './useHabitStats';
import { getToday, dateKey } from '../lib/utils';
import {
  GREETING_POOL,
  GreetingCategory,
  PerformanceBracket,
  TimeOfDay
} from '../lib/greetings';

const getDeterministicIndex = (str: string, max: number): number => {
  if (max <= 1) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
};

export function useHeroGreeting() {
  const { profile, habits } = useAppStore();
  const { getDayStats } = useHabitStats();
  
  const today = getToday();
  const todayKey = dateKey(today);

  // Freeze the greeting on mount by computing it exactly once inside useState
  const [frozenGreeting] = useState(() => {
    const { pct } = getDayStats(todayKey);

    // 1. Determine Time of Day
    const hour = new Date().getHours();
    let timeOfDay: TimeOfDay = 'night';
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';

    // 2. Determine Performance Bracket
    let bracket: PerformanceBracket = 'zero';
    if (pct === 100) bracket = 'complete';
    else if (pct > 0) bracket = 'partial';

    // 3. Determine Greeting Category based on total completed days historically
    const completedDays = new Set<string>();
    habits.forEach((habit) => {
      Object.keys(habit.days).forEach((dayKey) => {
        if (habit.days[dayKey]) {
          completedDays.add(dayKey);
        }
      });
    });
    
    const totalTrackedDays = completedDays.size;
    let category: GreetingCategory = 'new';
    
    if (totalTrackedDays > 7) category = 'experienced';
    else if (totalTrackedDays > 2) category = 'building';
    else if (totalTrackedDays > 0) category = 'starter';

    // 4. Retrieve matching pool
    const pool = GREETING_POOL[category][bracket][timeOfDay];

    // 5. Select greeting deterministically (so it is stable for the current day/bracket/user)
    const seed = `${todayKey}-${category}-${bracket}-${timeOfDay}`;
    const index = getDeterministicIndex(seed, pool.length);
    const selectedGreeting = pool[index];

    return {
      titleTemplate: selectedGreeting.title,
      subtitleTemplate: selectedGreeting.subtitle,
      pct,
      totalTrackedDays,
      category,
      timeOfDay,
      bracket
    };
  });

  // Format templates with the user name during render to stay responsive to profile changes
  const format = (text: string) => text.replace(/{name}/g, profile.name);

  return {
    title: format(frozenGreeting.titleTemplate),
    subtitle: format(frozenGreeting.subtitleTemplate),
    pct: frozenGreeting.pct,
    totalTrackedDays: frozenGreeting.totalTrackedDays,
    category: frozenGreeting.category,
    timeOfDay: frozenGreeting.timeOfDay,
    bracket: frozenGreeting.bracket
  };
}
