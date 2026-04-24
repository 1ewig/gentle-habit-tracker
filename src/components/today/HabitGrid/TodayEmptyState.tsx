import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../../../store/useAppStore';
import { GRID_ITEM_VARIANTS } from '../../../lib/motion';

export function TodayEmptyState() {
  const { setCurrentPage } = useAppStore();

  return (
    <motion.div
      className="empty-state"
      variants={GRID_ITEM_VARIANTS}
    >
      <div className="empty-icon">✧</div>
      <div className="empty-text">
        it&apos;s a fresh beginning. <br />
        add your first habit to start the journey.
      </div>
      <button
        className="btn-primary empty-action"
        onClick={() => setCurrentPage('settings')}
      >
        configure habits
      </button>
    </motion.div>
  );
}
