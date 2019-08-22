import React from 'react';
import { iDay } from './CalendarHelper';

interface iProps {
  day: iDay;
}

export default function ShortDay(props: iProps) {
  return (
    <div>
      {props.day.events.map(item => {
        return item.title;
      })}
    </div>
  );
}
