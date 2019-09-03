import React from 'react';
import ShortDay from './ShortDay';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { WeekStyles } from '../../styles/CalendarStyles';

export default function Week() {
  const { days } = useSelector((state: State) => state.calendar);
  const classes = WeekStyles();
  return (
    <div className={classes.week}>
      {days.map((day, index) => (
        <ShortDay key={index} day={day} />
      ))}
    </div>
  );
}
