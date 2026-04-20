import React from 'react';
import { MomentumDock } from '../momentum/MomentumDock';
import { NeuralWeb } from './NeuralWeb';

export function JournalScene() {
  return (
    <div className="neural-container">
      <NeuralWeb />
      <MomentumDock />
    </div>
  );
}

