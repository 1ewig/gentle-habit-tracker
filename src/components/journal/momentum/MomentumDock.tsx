import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../../../store/useAppStore';
import { cn } from '../../../lib/utils';
import { MomentumWeekly } from './MomentumWeekly';
import { MomentumMonthly } from './MomentumMonthly';
import { MomentumStats } from './MomentumStats';
import { PAGE_VARIANTS, GRID_ITEM_VARIANTS, PANEL_VARIANTS } from '../../../lib/motion';

type TabType = 'weekly' | 'monthly' | 'stats';

export function MomentumDock() {
  const [activeTab, setActiveTab] = useState<TabType>('weekly');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'weekly', label: 'weekly' },
    { id: 'monthly', label: 'monthly' },
    { id: 'stats', label: 'stats' },
  ];

  return (
    <div id="momentum-dock">
      <motion.div
        className="momentum-card"
        variants={PAGE_VARIANTS}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <div className="momentum-header">
          <div className="momentum-title">momentum</div>
          <div className="momentum-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={cn("mtab", activeTab === tab.id && "active")}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="mtab-panel active"
              variants={PANEL_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {activeTab === 'weekly' && <MomentumWeekly />}
              {activeTab === 'monthly' && <MomentumMonthly />}
              {activeTab === 'stats' && <MomentumStats />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}