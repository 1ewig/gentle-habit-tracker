import React from 'react';
import { MONTHS, FULL_DAYS, getToday } from '../../lib/utils';
import './today-header.css';

export const TodayHeader = () => {
  const today = getToday();
  const displayTitle = `${FULL_DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;
  const displaySub = 'your personal evolution';

  return (
    <div className="today-header">
      <div className="today-header__info">
        <div className="today-header__title">{displayTitle}</div>
        <div className="today-header__sub">{displaySub}</div>
      </div>
    </div>
  );
};
