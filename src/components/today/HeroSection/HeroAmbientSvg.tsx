import React, { useEffect, useState } from 'react';

type TimeOfDay = 'sunrise' | 'daytime' | 'sunset' | 'nighttime';

const getTimeOfDay = (hour: number): TimeOfDay => {
  if (hour >= 5 && hour < 9) return 'sunrise';
  if (hour >= 9 && hour < 17) return 'daytime';
  if (hour >= 17 && hour < 20) return 'sunset';
  return 'nighttime';
};

export const HeroAmbientSvg: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('daytime');

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      setTimeOfDay(getTimeOfDay(hour));
    };
    updateTime();
    // Update every minute to check for transitions
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (timeOfDay === 'sunrise') {
    return (
      <svg viewBox="0 0 100 100" className="hero-section__ambient-svg sunrise" aria-label="Sunrise">
        <defs>
          <linearGradient id="sunriseSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9E7D" />
            <stop offset="50%" stopColor="#FFD3A5" />
            <stop offset="100%" stopColor="#FFF2E6" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#sunriseSky)" />
        <circle cx="50" cy="45" r="14" fill="#FFA500" />
        <circle cx="50" cy="45" r="14" fill="#FFD700" opacity="0.6" style={{ filter: 'blur(2px)' }} />
        <path d="M15 75 c5 -8, 25 -8, 30 0 c10 -10, 30 -10, 40 0" fill="#FFFFFF" opacity="0.4" />
      </svg>
    );
  }

  if (timeOfDay === 'sunset') {
    return (
      <svg viewBox="0 0 100 100" className="hero-section__ambient-svg sunset" aria-label="Sunset">
        <defs>
          <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="40%" stopColor="#9D174D" />
            <stop offset="80%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#sunsetSky)" />
        <circle cx="50" cy="65" r="15" fill="#EF4444" />
        <circle cx="50" cy="65" r="15" fill="#F59E0B" opacity="0.5" />
        <path d="M5 80 h90 v-4 h-90 z" fill="#F43F5E" opacity="0.4" />
        <path d="M15 72 h70 v-2 h-70 z" fill="#8B5CF6" opacity="0.3" />
      </svg>
    );
  }

  if (timeOfDay === 'nighttime') {
    return (
      <svg viewBox="0 0 100 100" className="hero-section__ambient-svg nighttime" aria-label="Nighttime">
        <defs>
          <linearGradient id="nighttimeSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="70%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#311042" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#nighttimeSky)" />
        <circle cx="25" cy="30" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="75" cy="25" r="1" fill="#FFFFFF" opacity="0.5" />
        <circle cx="35" cy="60" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="65" cy="50" r="0.8" fill="#FFFFFF" opacity="0.9" />
        <path d="M55 25 c-10 0, -18 8, -18 18 c0 10, 8 18, 18 18 c3 0, 6 -0.8, 9 -2 c-6 -1, -11 -7, -11 -14 c0 -7, 5 -13, 11 -14 c-3 -1.2, -6 -2, -9 -2 z" fill="#FEF08A" />
      </svg>
    );
  }

  // Default to daytime
  return (
    <svg viewBox="0 0 100 100" className="hero-section__ambient-svg daytime" aria-label="Daytime">
      <defs>
        <linearGradient id="daytimeSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="60%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#F0F9FF" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#daytimeSky)" />
      <circle cx="65" cy="35" r="13" fill="#F59E0B" />
      <circle cx="65" cy="35" r="17" fill="#F59E0B" opacity="0.2" />
      <path d="M20 70 c-4 -4, -12 -2, -14 4 c-2 4, 1 10, 6 10 h45 c5 0, 10 -4, 8 -10 c-2 -4, -7 -5, -9 -3 c-4 -8, -15 -10, -20 -3 c-3 -4, -10 -3, -13 4 z" fill="#FFFFFF" opacity="0.85" />
    </svg>
  );
};
