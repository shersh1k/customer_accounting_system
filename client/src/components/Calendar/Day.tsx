import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { DayStyles } from '../../styles/CalendarStyles';

export default function Day() {
  const { days } = useSelector((state: State) => state.calendar);
  if (!days.length) return null;
  const orders = days[0].events;
  const classes = DayStyles();
  return (
    <div className={classes.day}>
      {orders.map((event, index) => (
        <div key={index}>{event.title}</div>
      ))}
    </div>
  );
}
