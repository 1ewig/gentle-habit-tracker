import React from 'react';
import { useHeroGreeting } from '../../../hooks/useHeroGreeting';

export const HeroGreeting: React.FC = () => {
  const { title, subtitle } = useHeroGreeting();

  return (
    <div className="hero-section__intro">
      <h1 className="hero-section__greeting">{title}</h1>
      <p className="hero-section__subtext">{subtitle}</p>
    </div>
  );
};
