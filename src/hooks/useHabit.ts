import { useState, useCallback } from 'react';
import { useAppStore, Habit } from '../store/useAppStore';
import { TODAY_KEY } from '../lib/utils';

export function useHabit(habit: Habit) {
  const { toggleHabit } = useAppStore();
  const [justChecked, setJustChecked] = useState(false);

  const handleToggle = useCallback((key: string = TODAY_KEY) => {
    const isDoneToday = !!habit.days[TODAY_KEY];
    
    toggleHabit(habit.id, key);
    
    // Trigger "Burst" animation effect for today's toggle (only when completing)
    if (key === TODAY_KEY && !isDoneToday) {
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 800);
    }
  }, [habit.id, habit.days, toggleHabit]);

  return {
    justChecked,
    handleToggle
  };
}
