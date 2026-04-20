import React from 'react';
import { NeuralWeb } from './NeuralWeb';
import { MomentumDock } from './momentum/MomentumDock';

export function NeuralContainer() {
  return (
    <div className="neural-container">
      <NeuralWeb />
      <MomentumDock />
    </div>
  );
}
