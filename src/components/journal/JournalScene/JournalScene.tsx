import React from 'react';
import { MomentumDock } from '../momentum/MomentumDock';
import { NeuralWeb } from './NeuralWeb';

export const JournalScene = () => {
  return (
    <div className="neural-container">
      <NeuralWeb />
      <MomentumDock />
    </div>
  );
};

