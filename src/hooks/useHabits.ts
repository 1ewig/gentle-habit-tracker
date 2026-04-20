import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTodayKey, getYesterdayKey } from '../lib/utils';

export type Habit = {
  id: number;
  name: string;
  days: Record<string, boolean>;
};

export const useHabits = () => {
  const { habits, _toggleHabit, _addHabit, _removeHabit } = useAppStore();
  const [justCheckedIds, setJustCheckedIds] = useState<Set<number>>(new Set());

  const handleToggle = useCallback((habit: Habit, key?: string) => {
    const todayKey = getTodayKey();
    const yesterdayKey = getYesterdayKey();
    const resolvedKey = key ?? todayKey;

    // LATE LOGGING PROTECTION: Only allow Today or Yesterday
    const isLoggable = resolvedKey === todayKey || resolvedKey === yesterdayKey;
    if (!isLoggable) return;

    const isDone = Boolean(habit.days[resolvedKey]);
    _toggleHabit(habit.id, resolvedKey);

    if (resolvedKey === todayKey && !isDone) {
      setJustCheckedIds(prev => new Set(prev).add(habit.id));
      setTimeout(() => {
        setJustCheckedIds(prev => {
          const next = new Set(prev);
          next.delete(habit.id);
          return next;
        });
      }, 800);
    }
  }, [_toggleHabit]);

  const addHabit = useCallback((name: string) => {
    _addHabit(name);
  }, [_addHabit]);

  const removeHabit = useCallback((id: number) => {
    _removeHabit(id);
  }, [_removeHabit]);

  const justChecked = (habitId: number) => justCheckedIds.has(habitId);

  return {
    habits,
    addHabit,
    removeHabit,
    handleToggle,
    justChecked,
  };
};

export const useHabitToggle = (habit: Habit) => {
  const { handleToggle, justChecked } = useHabits();

  return {
    justChecked: justChecked(habit.id),
    handleToggle: (key?: string) => handleToggle(habit, key),
  };
};