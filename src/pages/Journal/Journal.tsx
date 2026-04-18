import React from 'react';
import { motion } from 'motion/react';
import { Dialog } from '../../components/shared/Dialog';
import { JournalCanvas } from '../../components/journal/JournalCanvas';
import { DayHabitList } from '../../components/journal/momentum/DayHabitList';
import { useAppStore } from '../../store/useAppStore';
import { FULL_DAYS, MONTHS } from '../../lib/utils';
import { PAGE_VARIANTS } from '../../lib/motion';
import { MomentumDock } from '../../components/journal/momentum/MomentumDock';

export function Journal() {
  const { habits, selectedDay, setSelectedDay } = useAppStore();

  const closeDialog = () => setSelectedDay(null);

  // Orchestrator Data Preparation
  let dialogTitle = '';
  let dialogPill = '';
  let dayHabits: { name: string; done: boolean }[] = [];

  if (selectedDay) {
    const parts = selectedDay.split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    dialogTitle = `${FULL_DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
    
    dayHabits = habits.map(h => ({ 
      name: h.name, 
      done: !!h.days[selectedDay] 
    }));
    
    const total = habits.length;
    const doneCount = dayHabits.filter(h => h.done).length;
    dialogPill = total === 0 ? 'no habits tracked' : `${doneCount} of ${total} completed`;
  }

  return (
    <motion.div
      className="page journal active"
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/* 1. Positioning handled by journal-canvas ID in journal.css (page) */}
      <JournalCanvas />

      {/* 2. Dialog Orchestration */}
      <Dialog isOpen={!!selectedDay} onClose={closeDialog} title={dialogTitle}>
        <span className="day-summary-pill">{dialogPill}</span>
        <DayHabitList habits={dayHabits} />
      </Dialog>

      {/* 3. Global feature orchestration */}
      <MomentumDock />
    </motion.div>
  );
}
