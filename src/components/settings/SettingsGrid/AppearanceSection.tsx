import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore, THEMES, THEME_COLORS } from '../../../store/useAppStore';
import { Dialog } from '../../shared/Dialog';
import { cn } from '../../../lib/utils';
import { GRID_ITEM_VARIANTS, HOVER_TAP } from '../../../lib/motion';


export function AppearanceSection() {
  const { settings, setSettings } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="settings-card card-appearance"
        variants={GRID_ITEM_VARIANTS}
        onClick={() => setIsOpen(true)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Customize interface atmosphere"
        whileTap={HOVER_TAP.tap}
      >
        <div className="bs-info">
          <div className="bs-title">atmosphere</div>
          <div className="bs-val">
            <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
              <circle cx="6" cy="6" r="5" fill={THEME_COLORS[settings.theme].acc} />
            </svg>
            {settings.theme}
          </div>
        </div>
      </motion.div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="customization">
        <div className="section-lbl">atmosphere</div>
        <div className="theme-grid">
          {THEMES.map(theme => (
            <button
              key={theme}
              className={cn("theme-btn", settings.theme === theme && "active")}
              style={settings.theme === theme ? { 
                borderColor: THEME_COLORS[theme].acc 
              } : {}}
              onClick={() => setSettings({ ...settings, theme })}
              aria-label={`Switch to ${theme} theme`}
              aria-pressed={settings.theme === theme}
            >
              <span className="theme-btn-label">
                <span className="t-emoji">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="6" fill={THEME_COLORS[theme].acc} />
                  </svg>
                </span>
                <span className="t-name">{theme}</span>
              </span>
            </button>
          ))}
        </div>



      </Dialog>
    </>
  );
}
