import { useAppStore } from '../store/useAppStore';
import { TODAY, dateKey } from '../lib/utils';

export interface DayStats {
  total: number;
  done: number;
  pct: number;
}

export function useHabitStats() {
  const { habits } = useAppStore();
  const totalHabits = habits.length;

  const getDayStats = (key: string): DayStats => {
    if (totalHabits === 0) return { total: 0, done: 0, pct: 0 };
    const done = habits.filter(h => Boolean(h.days[key])).length;
    return { total: totalHabits, done, pct: (done / totalHabits) * 100 };
  };

  const countPerfectDays = () => {
    if (totalHabits === 0) return 0;
    const year = TODAY.getFullYear();
    const month = TODAY.getMonth();
    let count = 0;
    for (let day = 1; day <= TODAY.getDate(); day++) {
      const key = dateKey(new Date(year, month, day));
      if (habits.every(h => Boolean(h.days[key]))) count++;
    }
    return count;
  };

  const getOverallConsistency = () => {
    const year = TODAY.getFullYear();
    const month = TODAY.getMonth();
    let totalPossible = 0;
    let totalDone = 0;
    
    for (let day = 1; day <= TODAY.getDate(); day++) {
      const key = dateKey(new Date(year, month, day));
      totalPossible += totalHabits;
      totalDone += habits.filter(h => Boolean(h.days[key])).length;
    }
    
    return totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
  };

  const getMonthMetadata = () => {
    const year = TODAY.getFullYear();
    const month = TODAY.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { year, month, firstDay, daysInMonth };
  };

  return {
    habits,
    totalHabits,
    getDayStats,
    countPerfectDays,
    getOverallConsistency,
    getMonthMetadata,
    TODAY,
  };
}
