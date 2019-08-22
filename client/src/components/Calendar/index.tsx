import React, { useEffect } from 'react';

import Panel from './Panel';
import Year from './Year';
import Month from './Month';
import Week from './Week';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForCalendar } from '../../store/calendar/actions';
import { State } from '../../store';
import { getDays, getWeeks } from './CalendarHelper';

export default function Calendar() {
  const dispatch = useDispatch();
  const { data, viewType, isPending, error, errorMessage } = useSelector((state: State) => state.calendar);
  useEffect(() => {
    dispatch(getAllOrdersForCalendar());
  }, []);
  const dates = getDays({ dateFrom: new Date(2019, 7, 1), dateTo: new Date(2019, 7, 31), dateRangeHelper: new Date() }, data);
  const weeks = getWeeks(dates);
  console.log(weeks);


  return (
    <div>
      <Panel />
      {viewType === 'Month' && <Month weeks={weeks} />}
      {/* {viewType === 'Week' && <Week weeks={data} />} */}
      {/* {viewType === 'Year' && <Year weeks={data} />} */}
    </div>
  );
}
