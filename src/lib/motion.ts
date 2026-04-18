import { Variants } from 'motion/react';

/**
 * Standard Spring Presets
 * Following the Agency-Grade "Mathematical Precision" guidelines.
 */
export const SPRINGS = {
  stiff: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
    mass: 1
  },
  smooth: {
    type: "spring" as const,
    stiffness: 260,
    damping: 26,
    mass: 1
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 15,
    mass: 1
  }
} as const;

/**
 * Page Transitions
 * Shared across Today, Journal, and Settings
 */
export const PAGE_VARIANTS: Variants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    scale: 0.98 
  },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: SPRINGS.smooth
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" as const }
  }
};

/**
 * Grid/List Stagger Pattern
 * Unified entrance for card grids, lists, and grouped elements
 */
export const GRID_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08
    }
  }
};

export const GRID_ITEM_VARIANTS: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16, 
    scale: 0.98 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: SPRINGS.smooth
  }
};

/**
 * List & Card Entrances
 * Staggered entrance for clusters of items
 */
export const LIST_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const ITEM_VARIANTS: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16, 
    scale: 0.98 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: SPRINGS.smooth
  }
};

/**
 * Shared Interactions
 */
export const HOVER_TAP = {
  hover: { 
    y: -2, 
    transition: { type: "spring" as const, stiffness: 400, damping: 25 } 
  },
  tap: { 
    scale: 0.98, 
    transition: { type: "spring" as const, stiffness: 500, damping: 15 } 
  }
};

/**
 * Panel & Dialog Transitions
 */
export const PANEL_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.15, ease: "easeIn" as const } }
};

/**
 * Dialog & Modal Transitions
 */
export const DIALOG_VARIANTS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" as const } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } }
  },
  content: {
    initial: { opacity: 0, y: '100%' },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, damping: 28, stiffness: 350 } 
    },
    exit: { 
      opacity: 0, 
      y: '100%', 
      transition: { duration: 0.2, ease: "easeIn" as const } 
    }
  }
};

/**
 * Special Effects
 */
export const BLOOM_VARIANTS = {
  initial: { scale: 0, opacity: 1 },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { 
      type: "spring" as const,
      stiffness: 120,
      damping: 25,
      opacity: { duration: 0.8 }
    }
  }
};

/**
 * Global Shell Components
 */
export const HEADER_VARIANTS = {
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }
  },
  hidden: { 
    opacity: 0, 
    y: -40,
    transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const }
  }
};

export const NAV_BUTTON_VARIANTS = {
  hover: { y: -2 },
  tap: { scale: 0.9, y: 0 },
  transition: { 
    type: "spring" as const,
    stiffness: 400,
    damping: 17
  }
};

/**
 * Momentum Charts
 */
export const MOMENTUM_TRANSITIONS = {
  bar: (i: number) => ({ 
    type: "spring" as const,
    stiffness: 200,
    damping: 32,
    mass: 1.2,
    delay: i * 0.1 
  }),
  label: (i: number) => ({ 
    duration: 0.6,
    delay: 0.3 + i * 0.04, 
    ease: [0.23, 1, 0.32, 1] as const 
  }),
  dot: (i: number) => ({ 
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
    delay: i * 0.012 
  })
};
