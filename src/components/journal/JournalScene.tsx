import React from 'react';
import { MomentumDock } from './momentum/MomentumDock';
import { NeuralWeb } from './NeuralWeb/NeuralWeb';
import { JournalDialog } from './JournalDialog';

export const JournalScene = () => {
  return (
    <div className="journal-scene">
      <NeuralWeb />
      <MomentumDock />
      <JournalDialog />
    </div>
  );
};

