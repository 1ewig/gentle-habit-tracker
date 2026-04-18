import React from 'react';
import { useMomentum } from '../../../hooks/useMomentum';

export const MomentumStats: React.FC = () => {
  const { getOverallConsistency, countPerfectDays } = useMomentum();
  
  const consistency = getOverallConsistency();
  const perfectDays = countPerfectDays();

  return (
    <div className="stats-split">
      <div className="stat-block">
        <div className="stat-big">
          {consistency}
          <span className="stat-unit">%</span>
        </div>
        <div className="stat-lbl">consistency</div>
      </div>
      <div className="stats-divider" />
      <div className="stat-block">
        <div className="stat-big accent">{perfectDays}</div>
        <div className="stat-lbl">perfect days</div>
      </div>
    </div>
  );
};