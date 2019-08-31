import React from 'react';

import ShortDay from './ShortDay';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { DayStyles } from '../../styles/CalendarStyles';

export default function Day() {
  const classes = DayStyles();
  const { days } = useSelector((state: State) => state.calendar);
  return (
    <div className={classes.day}>
      {days.map((day, index) => day.events.map(event => <div key={index}>{event.title}</div>))}
    </div>
  );
}
