import React, { useLayoutEffect } from 'react';

import Panel from './Panel';
import Day from './Day';
import Week from './Week';
import Month from './Month';
import Year from './Year';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersForCalendar } from '../../store/calendar/actions';
import { State } from '../../store';
import { RootStyles } from '../../styles/CalendarStyles';

export default function Calendar() {
  const dispatch = useDispatch();
  const { viewType, showingRange /*  isPending, error, errorMessage  */ } = useSelector(
    (state: State) => state.calendar
  );

  useLayoutEffect(() => {
    dispatch(getOrdersForCalendar(showingRange));
  }, [dispatch, showingRange]);

  const classes = RootStyles();
  return (
    <div className={classes.root}>
      <Panel />
      {viewType === 'Day' && <Day />}
      {viewType === 'Week' && <Week />}
      {viewType === 'Month' && <Month />}
      {viewType === 'Year' && <Year />}
    </div>
  );
}
