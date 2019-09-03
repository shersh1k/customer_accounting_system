import React from 'react';
import { iDay } from '../../store/calendar/types';
import { ShortDayStyles } from '../../styles/CalendarStyles';

interface iProps {
  day: iDay;
}

export default function ShortDay(props: iProps) {
  const classes = ShortDayStyles();
  return (
    <div className={classes.day}>
      {props.day.events.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}
