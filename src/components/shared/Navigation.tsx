import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { useHabitStats } from '../../hooks/useHabitStats';
import { cn, getTodayKey } from '../../lib/utils';
import { NAV_BUTTON_VARIANTS } from '../../lib/motion';

export const Navigation = memo(function Navigation() {
  const { currentPage, setCurrentPage } = useAppStore();
  const { getDayStats } = useHabitStats();
  
  const { pct } = getDayStats(getTodayKey());
  const isDone = pct === 100;

  return (
    <div id="nav" style={{ isolation: 'isolate' }}>
      <div className="nav-pill">
        <motion.button
          className={cn("nav-btn", currentPage === 'today' && "active", isDone && "is-done")}
          onClick={() => setCurrentPage('today')}
          whileHover={NAV_BUTTON_VARIANTS.hover}
          whileTap={NAV_BUTTON_VARIANTS.tap}
          transition={NAV_BUTTON_VARIANTS.transition}
          aria-label="Today's Habits"
          aria-current={currentPage === 'today' ? 'page' : undefined}
          title="Today"
        >
          <AnimatePresence mode="wait">
            {isDone ? (
              <motion.svg 
                key="star"
                viewBox="0 0 24 24" 
                fill="currentColor"
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
            ) : (
              <motion.svg 
                key="grid"
                viewBox="0 0 24 24" 
                aria-hidden="true"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
        <motion.button
          className={cn("nav-btn", currentPage === 'journal' && "active")}
          onClick={() => setCurrentPage('journal')}
          whileHover={NAV_BUTTON_VARIANTS.hover}
          whileTap={NAV_BUTTON_VARIANTS.tap}
          transition={NAV_BUTTON_VARIANTS.transition}
          aria-label="Habit Journal"
          aria-current={currentPage === 'journal' ? 'page' : undefined}
          title="Journal"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </motion.button>
        <motion.button
          className={cn("nav-btn", currentPage === 'settings' && "active")}
          onClick={() => setCurrentPage('settings')}
          whileHover={NAV_BUTTON_VARIANTS.hover}
          whileTap={NAV_BUTTON_VARIANTS.tap}
          transition={NAV_BUTTON_VARIANTS.transition}
          aria-label="Application Settings"
          aria-current={currentPage === 'settings' ? 'page' : undefined}
          title="Settings"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
});