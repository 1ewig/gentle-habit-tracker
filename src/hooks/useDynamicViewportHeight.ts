import { useEffect, useCallback } from 'react';

export function useDynamicViewportHeight() {
  const setVH = useCallback(() => {
    const vh = window.visualViewport?.height ?? window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
  }, []);

  useEffect(() => {
    setVH();

    window.visualViewport?.addEventListener('resize', setVH);
    window.addEventListener('resize', setVH);

    return () => {
      window.visualViewport?.removeEventListener('resize', setVH);
      window.removeEventListener('resize', setVH);
    };
  }, [setVH]);
}