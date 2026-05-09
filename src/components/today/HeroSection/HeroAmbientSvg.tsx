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

  const DrawGroup = ({ stroke, strokeWidth, animate }: { stroke: string; strokeWidth: number; animate?: boolean }) => {
    const motionProps = animate ? {
      initial: { pathLength: 0 },
      animate: { pathLength: progress },
      transition: { duration: 1, ease: "easeInOut" as const }
    } : {};

    const Path = animate ? motion.path : 'path';
    const Circle = animate ? motion.circle : 'circle';
    const Line = animate ? motion.line : 'line';

    return (
      <g stroke={stroke} strokeWidth={strokeWidth} {...sharedProps}>
        {/* Horizon Line */}
        <Line x1="12" y1="76" x2="88" y2="76" {...motionProps} />
        
        {/* Cloud */}
        <Path d="M 25 76 A 6 6 0 0 1 30 66 A 8 8 0 0 1 46 68 A 6 6 0 0 1 45 76 Z" {...motionProps} />
        
        {/* Sun Circle */}
        <Circle cx="50" cy="42" r="14" {...motionProps} />
        
        {/* Sun Rays (Inner to Outer) */}
        <Line x1="50" y1="22" x2="50" y2="16" {...motionProps} /> {/* Top */}
        <Line x1="50" y1="62" x2="50" y2="68" {...motionProps} /> {/* Bottom */}
        <Line x1="30" y1="42" x2="24" y2="42" {...motionProps} /> {/* Left */}
        <Line x1="70" y1="42" x2="76" y2="42" {...motionProps} /> {/* Right */}
        <Line x1="36" y1="28" x2="32" y2="24" {...motionProps} /> {/* TL */}
        <Line x1="64" y1="28" x2="68" y2="24" {...motionProps} /> {/* TR */}
        <Line x1="36" y1="56" x2="32" y2="60" {...motionProps} /> {/* BL */}
        <Line x1="64" y1="56" x2="68" y2="60" {...motionProps} /> {/* BR */}
      </g>
    );
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className="hero-section__ambient-svg outlined" 
      aria-label={`Daily Progress: ${Math.round(pct)}%`}
    >
      {/* Background Track (Faint Outline) */}
      <DrawGroup stroke="var(--rim)" strokeWidth={3} animate={false} />
      
      {/* Foreground Progress (Accent Outline that draws itself) */}
      <DrawGroup stroke="var(--accent)" strokeWidth={3} animate={true} />
    </svg>
  );
};

