import React from 'react';
import { motion } from 'motion/react';
import { useHabitStats } from '../../../hooks/useHabitStats';
import { getToday, dateKey } from '../../../lib/utils';

export const HeroAmbientSvg: React.FC = () => {
  const { getDayStats } = useHabitStats();
  const todayKey = dateKey(getToday());
  const { pct } = getDayStats(todayKey);
  
  // Progress from 0 to 1 based on today's habit completion
  const progress = pct / 100;

  const sharedProps = {
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const transitionProps = {
    duration: 0.8,
    ease: "easeInOut" as const
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className="hero-section__ambient-svg outlined" 
      aria-label={`Daily Progress: ${Math.round(pct)}%`}
    >
      {/* Background Track (Faint Outline) */}
      <g stroke="var(--rim)" strokeWidth="3" {...sharedProps}>
        <line x1="12" y1="76" x2="88" y2="76" />
        <path d="M 25 76 A 6 6 0 0 1 30 66 A 8 8 0 0 1 46 68 A 6 6 0 0 1 45 76 Z" />
        <circle cx="50" cy="42" r="14" />
        <line x1="50" y1="22" x2="50" y2="16" />
        <line x1="50" y1="62" x2="50" y2="68" />
        <line x1="30" y1="42" x2="24" y2="42" />
        <line x1="70" y1="42" x2="76" y2="42" />
        <line x1="36" y1="28" x2="32" y2="24" />
        <line x1="64" y1="28" x2="68" y2="24" />
        <line x1="36" y1="56" x2="32" y2="60" />
        <line x1="64" y1="56" x2="68" y2="60" />
      </g>
      
      {/* Foreground Progress (Accent Outline that draws itself smoothly) */}
      <g stroke="var(--accent)" strokeWidth="3" {...sharedProps}>
        {/* Horizon Line */}
        <motion.line 
          x1="12" y1="76" x2="88" y2="76" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={transitionProps}
        />
        
        {/* Cloud */}
        <motion.path 
          d="M 25 76 A 6 6 0 0 1 30 66 A 8 8 0 0 1 46 68 A 6 6 0 0 1 45 76 Z" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={transitionProps}
        />
        
        {/* Sun Circle */}
        <motion.circle 
          cx="50" cy="42" r="14" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={transitionProps}
        />
        
        {/* Sun Rays */}
        <motion.line x1="50" y1="22" x2="50" y2="16" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="50" y1="62" x2="50" y2="68" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="30" y1="42" x2="24" y2="42" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="70" y1="42" x2="76" y2="42" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="36" y1="28" x2="32" y2="24" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="64" y1="28" x2="68" y2="24" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="36" y1="56" x2="32" y2="60" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
        <motion.line x1="64" y1="56" x2="68" y2="60" initial={{ pathLength: 0 }} animate={{ pathLength: progress }} transition={transitionProps} />
      </g>
    </svg>
  );
};

