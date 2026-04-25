import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore, THEMES, THEME_COLORS } from '../../../store/useAppStore';
import { Dialog } from '../../shared/Dialog';
import { cn } from '../../../lib/utils';
import { GRID_ITEM_VARIANTS, HOVER_TAP } from '../../../lib/motion';


export function AtmosphereSection() {
  const { settings, setSettings } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'cards'>('theme');

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
            <svg width="12" height="12" viewBox="0 0 12 12" className="theme-dot" style={{ '--theme-acc': THEME_COLORS[settings.theme].acc } as React.CSSProperties}>
              <circle cx="6" cy="6" r="5" />
            </svg>
            {settings.theme}
          </div>
        </div>
      </motion.div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="customization">
        <div className="dialog-tabs-container">
          <div className="dialog-tabs">
            <button 
              className={cn("dtab", activeTab === 'theme' && "active")}
              onClick={() => setActiveTab('theme')}
            >
              theme
            </button>
            <button 
              className={cn("dtab", activeTab === 'cards' && "active")}
              onClick={() => setActiveTab('cards')}
            >
              cards
            </button>
          </div>
        </div>

        {activeTab === 'theme' && (
          <div className="theme-grid">
            {THEMES.map(theme => (
              <button
                key={theme}
                className={cn("theme-btn", settings.theme === theme && "active")}
                style={{ '--theme-acc': THEME_COLORS[theme].acc } as React.CSSProperties}
                onClick={() => setSettings({ ...settings, theme })}
                aria-label={`Switch to ${theme} theme`}
                aria-pressed={settings.theme === theme}
              >
                <span className="theme-btn-label">
                  <span className="t-emoji">
                    <svg width="14" height="14" viewBox="0 0 14 14" className="theme-dot">
                      <circle cx="7" cy="7" r="6" />
                    </svg>
                  </span>
                  <span className="t-name">{theme}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="theme-grid">
            {[1, 2].map(styleId => (
              <button
                key={styleId}
                className={cn("theme-btn", settings.style === styleId && "active")}
                style={{ '--theme-acc': THEME_COLORS[settings.theme].acc } as React.CSSProperties}
                onClick={() => setSettings({ ...settings, style: styleId })}
                aria-label={`Switch to style ${styleId}`}
                aria-pressed={settings.style === styleId}
              >
                <span className="theme-btn-label">
                  <span className="t-name">style {styleId}</span>
                </span>
              </button>
            ))}
          </div>
        )}



      </Dialog>
    </>
  );
}
