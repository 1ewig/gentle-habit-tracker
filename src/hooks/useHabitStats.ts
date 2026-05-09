import { useAppStore } from '../store/useAppStore';
import { getToday, dateKey } from '../lib/utils';

export interface DayStats {
  total: number;
  done: number;
  pct: number;
}

export function useHabitStats() {
  const { habits } = useAppStore();
  const totalHabits = habits.length;
  const today = getToday();

  const getDayStats = (key: string): DayStats => {
    if (totalHabits === 0) return { total: 0, done: 0, pct: 0 };
    const done = habits.filter(h => !!h.days[key]).length;
    return { total: totalHabits, done, pct: (done / totalHabits) * 100 };
  };

  const countPerfectDays = () => {
    if (totalHabits === 0) return 0;
    const year = today.getFullYear();
    const month = today.getMonth();
    let count = 0;
    for (let day = 1; day <= today.getDate(); day++) {
      const key = dateKey(new Date(year, month, day));
      if (habits.every(h => !!h.days[key])) count++;
    }
    return count;
  };

  const getOverallConsistency = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    let totalPossible = 0;
    let totalDone = 0;
    
    for (let day = 1; day <= today.getDate(); day++) {
      const key = dateKey(new Date(year, month, day));
      totalPossible += totalHabits;
      totalDone += habits.filter(h => !!h.days[key]).length;
    }
    
    return totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
  };

  const getMonthMetadata = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { year, month, firstDay, daysInMonth };
  };

  const getRollingMonthlyDays = () => {
    // 1. Anchor Today at index 26 (2nd-to-last slot of a 28-day grid)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 26);

    const todayKey = dateKey(today);

    // 2. Pre-compute cell properties for a 28-day window
    return Array.from({ length: 28 }, (_, i) => {
      const dateObj = new Date(startDate);
      dateObj.setDate(startDate.getDate() + i);
      const dayKey = dateKey(dateObj);
      const { done } = getDayStats(dayKey);

      return {
        dayKey,
        isFuture: dateObj > today,
        isToday: dayKey === todayKey,
        done,
      };
    });
  };

  return {
    habits,
    totalHabits,
    getDayStats,
    countPerfectDays,
    getOverallConsistency,
    getMonthMetadata,
    getRollingMonthlyDays,
    TODAY: today,
  };
}
