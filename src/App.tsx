import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Navigation } from './components/shared/Navigation';
import { Today } from './pages/Today/Today';
import { Journal } from './pages/Journal/Journal';
import { Settings } from './pages/Settings/Settings';
import { AnimatePresence } from 'motion/react';
import { useDynamicViewportHeight } from './hooks/useDynamicViewportHeight';

function AppContent() {
  const { currentPage, settings } = useAppStore();

  useDynamicViewportHeight();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  return (
    <div id="app-root">
      <div id="body">
        <AnimatePresence mode="wait">
          {currentPage === 'today' && <Today key="today" />}
          {currentPage === 'journal' && <Journal key="journal" />}
          {currentPage === 'settings' && <Settings key="settings" />}
        </AnimatePresence>
      </div>
      <Navigation />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
