import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTodayKey } from '../lib/utils';

export const THEMES = ['midnight', 'parchment', 'ink', 'moss', 'void', 'sand', 'ocean', 'ruby', 'amethyst', 'frost', 'sakura', 'birch', 'linen', 'voltage', 'hydra'];
export const THEME_COLORS: Record<string, { bg: string, border: string, acc: string }> = {
  midnight: { bg: '#12100e', border: '#332d28', acc: '#8ca379' },
  parchment: { bg: '#f4edd8', border: '#cfc1a5', acc: '#4a5d8c' },
  ink: { bg: '#0b101a', border: '#2a364d', acc: '#c4a97d' },
  moss: { bg: '#141712', border: '#364031', acc: '#d4a373' },
  void: { bg: '#050507', border: '#22222c', acc: '#ff1a6e' },
  sand: { bg: '#1a1510', border: '#3d3226', acc: '#e8956d' },
  ocean: { bg: '#0c1420', border: '#223d54', acc: '#7ec8e3' },
  ruby: { bg: '#0f0c0e', border: '#30222c', acc: '#e8607a' },
  amethyst: { bg: '#09091a', border: '#23253d', acc: '#9d7dff' },
  frost: { bg: '#f2f6fa', border: '#b4c8d8', acc: '#1a7abf' },
  sakura: { bg: '#fff5f7', border: '#f48fb1', acc: '#ff80ab' },
  birch: { bg: '#f7f7f5', border: '#d4d4d1', acc: '#5c8c6d' },
  linen: { bg: '#f8f9fa', border: '#cfd4da', acc: '#5885af' },
  voltage: { bg: '#000000', border: '#f0ff00', acc: '#f0ff00' },
  hydra: { bg: '#f0f7ff', border: '#b3d4ff', acc: '#0066ff' }
};

export type Profile = { name: string; bio: string };
export type Settings = { theme: string; style: number };

export interface HabitStyleProps {
  habit: import('../hooks/useHabits').Habit;
  handleToggle: (key?: string) => void;
  justChecked: boolean;
}

interface AppState {
  profile: Profile;
  settings: Settings;
  habits: import('../hooks/useHabits').Habit[];
  currentPage: 'today' | 'journal' | 'settings';
  selectedDay: string | null;
  
  // Actions
  setProfile: (profile: Profile) => void;
  setSettings: (settings: Settings) => void;
  setHabits: (habits: import('../hooks/useHabits').Habit[]) => void;
  setCurrentPage: (page: 'today' | 'journal' | 'settings') => void;
  setSelectedDay: (day: string | null) => void;
  
  /** @internal Use useHabits() instead */
  _toggleHabit: (id: number, key?: string) => void;
  /** @internal Use useHabits() instead */
  _addHabit: (name: string) => void;
  /** @internal Use useHabits() instead */
  _removeHabit: (id: number) => void;
}

const STORE_NAME = 'gentle_habit_store_v1';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: { name: 'wanderer', bio: 'taking it one day at a time.' },
      settings: { theme: 'midnight', style: 1 },
      habits: [
        { id: 1, name: 'morning movement', days: {} },
        { id: 2, name: 'read a little', days: {} }
      ],
      currentPage: 'today',
      selectedDay: null,

      setProfile: (profile) => set({ profile }),
      setSettings: (settings) => set({ settings }),
      setHabits: (habits) => set({ habits }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setSelectedDay: (selectedDay) => set({ selectedDay }),

      _toggleHabit: (id: number, key?: string) =>
        set((state) => {
          const resolvedKey = key ?? getTodayKey();
          return {
          habits: state.habits.map((h) => {
            if (h.id === id) {
              const isDone = !h.days[resolvedKey];
              if (navigator.vibrate) navigator.vibrate(isDone ? [10, 30, 10] : 10);
              return { ...h, days: { ...h.days, [resolvedKey]: isDone } };
            }
            return h;
          })
          };
        }),

      _addHabit: (name: string) =>
        set((state) => ({
          habits: [...state.habits, { id: Date.now(), name, days: {} }]
        })),

      _removeHabit: (id: number) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id)
        })),
    }),
    {
      name: STORE_NAME,
      // Only persist specific keys if needed, here we persist most of them
      partialize: (state) => ({
        profile: state.profile,
        settings: state.settings,
        habits: state.habits
      }),
    }
  )
);
