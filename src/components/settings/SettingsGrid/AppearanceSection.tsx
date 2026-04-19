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
        aria-label="Customize interface atmosphere and card style"
        whileTap={HOVER_TAP.tap}
      >
        <div className="bs-info">
          <div className="bs-title">atmosphere</div>
          <div className="bs-val">{settings.theme} · s{settings.style}</div>
        </div>
      </motion.div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="customization">
        <div className="section-lbl">atmosphere</div>
        <div className="grid-5">
          {THEMES.map(theme => (
            <button
              key={theme}
              className={cn("theme-btn", settings.theme === theme && "active")}
              style={{ 
                background: THEME_COLORS[theme].bg, 
                borderColor: THEME_COLORS[theme].border 
              }}
              onClick={() => setSettings({ ...settings, theme })}
              aria-label={`Switch to ${theme} theme`}
              aria-pressed={settings.theme === theme}
            />
          ))}
        </div>

        <div className="section-lbl">card style</div>
        <div className="grid-5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(style => (
            <button
              key={style}
              className={cn("style-btn", settings.style === style && "active")}
              onClick={() => setSettings({ ...settings, style })}
              aria-label={`Use card style number ${style}`}
              aria-pressed={settings.style === style}
            >
              s{style}
            </button>
          ))}
        </div>
      </Dialog>
    </>
  );
}
