import React from 'react';
import { useAppStore } from '../../../store/useAppStore';

export const HeroGreeting: React.FC = () => {
  const { profile } = useAppStore();

  return (
    <div className="hero-section__intro">
      <h1 className="hero-section__greeting">Hi, {profile.name}</h1>
      <p className="hero-section__subtext">{profile.bio}</p>
    </div>
  );
};
