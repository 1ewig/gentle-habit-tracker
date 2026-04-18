import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TODAY_KEY } from '../lib/utils';

export const THEMES = ['midnight', 'parchment', 'ink', 'moss', 'void', 'sand', 'ocean', 'ruby', 'amethyst', 'frost', 'sakura', 'birch', 'linen', 'voltage'];
export const THEME_COLORS: Record<string, { bg: string, border: string }> = {
  midnight: { bg: '#12100e', border: '#332d28' },
  parchment: { bg: '#f4edd8', border: '#cfc1a5' },
  ink: { bg: '#0b101a', border: '#2a364d' },
  moss: { bg: '#141712', border: '#364031' },
  void: { bg: '#050507', border: '#22222c' },
  sand: { bg: '#1a1510', border: '#3d3226' },
  ocean: { bg: '#0c1420', border: '#223d54' },
  ruby: { bg: '#0f0c0e', border: '#30222c' },
  amethyst: { bg: '#09091a', border: '#23253d' },
  frost: { bg: '#f2f6fa', border: '#b4c8d8' },
  sakura: { bg: '#fff5f7', border: '#f48fb1' },
  birch: { bg: '#f7f7f5', border: '#d4d4d1' },
  linen: { bg: '#f8f9fa', border: '#cfd4da' },
  voltage: { bg: '#000000', border: '#f0ff00' }
};

export type Profile = { name: string; bio: string };
export type Settings = { theme: string; style: number };
export type Habit = { id: number; name: string; days: Record<string, boolean> };

export interface HabitStyleProps {
  habit: Habit;
  handleToggle: (key?: string) => void;
  justChecked: boolean;
}

interface AppState {
  profile: Profile;
  settings: Settings;
  habits: Habit[];
  currentPage: 'today' | 'journal' | 'settings';
  selectedDay: string | null;
  
  // Actions
  setProfile: (profile: Profile) => void;
  setSettings: (settings: Settings) => void;
  setHabits: (habits: Habit[]) => void;
  setCurrentPage: (page: 'today' | 'journal' | 'settings') => void;
  setSelectedDay: (day: string | null) => void;
  
  // Habit Logic
  toggleHabit: (id: number, key?: string) => void;
  addHabit: (name: string) => void;
  removeHabit: (id: number) => void;
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
      setSettings: (settings) => {
        document.documentElement.setAttribute('data-theme', settings.theme);
        set({ settings });
      },
      setHabits: (habits) => set({ habits }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setSelectedDay: (selectedDay) => set({ selectedDay }),

      toggleHabit: (id, key = TODAY_KEY) => 
        set((state) => ({
          habits: state.habits.map((h) => {
            if (h.id === id) {
              const isDone = !h.days[key];
              if (navigator.vibrate) navigator.vibrate(isDone ? [10, 30, 10] : 10);
              return { ...h, days: { ...h.days, [key]: isDone } };
            }
            return h;
          })
        })),

      addHabit: (name) =>
        set((state) => ({
          habits: [...state.habits, { id: Date.now(), name, days: {} }]
        })),

      removeHabit: (id) =>
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
