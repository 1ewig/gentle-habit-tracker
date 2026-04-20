import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../../../store/useAppStore';
import { useHabits } from '../../../hooks/useHabits';
import { Dialog } from '../../shared/Dialog';
import { GRID_ITEM_VARIANTS, HOVER_TAP } from '../../../lib/motion';

export function HabitSection() {
  const { habits, addHabit, removeHabit } = useHabits();
  const [isOpen, setIsOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const handleAdd = () => {
    if (newHabitName.trim()) {
      addHabit(newHabitName.trim().toLowerCase());
      setNewHabitName('');
    }
  };

  return (
    <>
      <motion.div
        className="settings-card card-habits"
        variants={GRID_ITEM_VARIANTS}
        onClick={() => setIsOpen(true)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Manage your habits list"
        whileTap={HOVER_TAP.tap}
      >
        <div className="bs-info">
          <div className="bs-title">habits</div>
          <div className="bs-val">{habits.length} active</div>
        </div>
      </motion.div>

      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="manage habits"
        footer={
          <div className="add-form">
            <input
              type="text"
              value={newHabitName}
              onChange={e => setNewHabitName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="something gentle to build…"
              maxLength={32}
            />
            <button className="btn-primary" onClick={handleAdd}>add habit</button>
          </div>
        }
      >
        <div className="settings-list">
          {habits.map(h => (
            <div key={h.id} className="scard">
              <div className="scard-name">{h.name}</div>
              <div 
                className="scard-remove" 
                onClick={() => removeHabit(h.id)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && removeHabit(h.id)}
                role="button"
                tabIndex={0}
                aria-label={`Remove habit: ${h.name}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}
