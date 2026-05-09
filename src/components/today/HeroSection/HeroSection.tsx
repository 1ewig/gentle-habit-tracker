import React from 'react';
import { HeroAmbientSvg } from './HeroAmbientSvg';
import { HeroGreeting } from './HeroGreeting';
import { HeroTimeline } from './HeroTimeline';

export const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-section__ambient-container">
        <HeroAmbientSvg />
      </div>
      <HeroGreeting />
      <HeroTimeline />
    </div>
  );
};
