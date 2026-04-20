import React from 'react';
import { MONTHS, FULL_DAYS, getToday } from '../../lib/utils';
import './today-header.css';

export function TodayHeader() {
  const today = getToday();
  const displayTitle = `${FULL_DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;
  const displaySub = 'your personal evolution';

  return (
    <div className="header">
      <div className="header-info">
        <div className="header-title">{displayTitle}</div>
        <div className="header-sub">{displaySub}</div>
      </div>
    </div>
  );
}
