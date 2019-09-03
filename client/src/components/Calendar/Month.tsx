import React from 'react';
import ShortDay from './ShortDay';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { MonthStyles } from '../../styles/CalendarStyles';

export default function Month() {
  const { days } = useSelector((state: State) => state.calendar);
  const classes = MonthStyles();
  return (
    <div className={classes.month}>
      {days.map((day, index) => (
        <ShortDay key={index} day={day} />
      ))}
    </div>
  );
}
