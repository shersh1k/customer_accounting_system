import React from 'react';

import ShortDay from './ShortDay';
import { iWeek, iDay } from './CalendarHelper';

interface iProps {
  weeks: iWeek[];
}

export default function Month(props: iProps) {
  const weeks = props.weeks;
  return (
    <div>
      {weeks.map((week, index) => (
        <div key={index}>
          {week.days.map((day, index) => (
            <ShortDay key={index} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
}
