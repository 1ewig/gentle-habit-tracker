import { memo } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { NAV_BUTTON_VARIANTS } from '../../lib/motion';

export const Navigation = memo(function Navigation() {
  const { currentPage, setCurrentPage } = useAppStore();

  return (
    <div id="nav" style={{ isolation: 'isolate' }}>
      <div className="nav-pill">
        <motion.button
          className={cn("nav-btn", currentPage === 'today' && "active")}
          onClick={() => setCurrentPage('today')}
          whileHover={NAV_BUTTON_VARIANTS.hover}
          whileTap={NAV_BUTTON_VARIANTS.tap}
          transition={NAV_BUTTON_VARIANTS.transition}
          aria-label="Today's Habits"
          aria-current={currentPage === 'today' ? 'page' : undefined}
          title="Today"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
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