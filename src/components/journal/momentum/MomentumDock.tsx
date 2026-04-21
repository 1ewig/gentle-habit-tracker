import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import { MomentumWeekly } from './MomentumWeekly';
import { MomentumMonthly } from './MomentumMonthly';
import { MomentumStats } from './MomentumStats';
import { PANEL_VARIANTS } from '../../../lib/motion';

type TabType = 'weekly' | 'monthly' | 'stats';

const MomentumHeader = ({ activeTab, onTabChange }: { activeTab: TabType; onTabChange: (t: TabType) => void }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'weekly', label: 'weekly' },
    { id: 'monthly', label: 'monthly' },
    { id: 'stats', label: 'stats' },
  ];

  return (
    <div className="momentum-header">
      <div className="momentum-title">momentum</div>
      <div className="momentum-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn("mtab", activeTab === tab.id && "active")}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export function MomentumDock() {
  const [activeTab, setActiveTab] = useState<TabType>('weekly');

  return (
    <div id="momentum-dock">
      <motion.div
        className="momentum-card"
        variants={PANEL_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <MomentumHeader activeTab={activeTab} onTabChange={setActiveTab} />
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