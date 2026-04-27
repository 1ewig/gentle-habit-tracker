import React from 'react';
import { MONTHS, FULL_DAYS, getToday } from '../../lib/utils';


export const TodayHeader = () => {
  const today = getToday();
  const dateLabel = `${FULL_DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;
  const displayTitle = "your day, your pace.";

  return (
    <div className="today-header">
      <div className="today-header__info">
        <div className="today-header__date">{dateLabel}</div>
        <h1 className="today-header__title">{displayTitle}</h1>
      </div>
    </div>
  );
};
