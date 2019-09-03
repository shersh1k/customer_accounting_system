import React from 'react';

import ShortDay from './ShortDay';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { YearStyles } from '../../styles/CalendarStyles';

export default function Year() {
  const classes = YearStyles();
  const { days } = useSelector((state: State) => state.calendar);
  return (
    <div className={classes.year}>
      {days.map((day, index) => (
        <ShortDay key={index} day={day} />
      ))}
    </div>
  );
}
