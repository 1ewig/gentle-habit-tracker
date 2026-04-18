import React from 'react';
import { MONTHS, TODAY, FULL_DAYS } from '../../lib/utils';

export function TodayHeader() {
  const displayTitle = `${FULL_DAYS[TODAY.getDay()]}, ${MONTHS[TODAY.getMonth()]} ${TODAY.getDate()}`;
  const displaySub = 'your personal evolution';

  return (
    <div className="header">
      <div className="header-title">{displayTitle}</div>
      <div className="header-sub">{displaySub}</div>
    </div>
  );
}
