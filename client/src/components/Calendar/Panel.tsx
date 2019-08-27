import React, { Component, MouseEvent } from 'react';
import { Button } from '@material-ui/core';
import { setViewType } from '../../store/calendar/actions';
import { useDispatch } from 'react-redux';

export default function Panel() {
  const dispatch = useDispatch();
  return (
    <>
      <span>Сегодня</span>
      <div /* className={panel.direction} */>
        <Button onClick={() => {} /* this.props.setDateRange('prev') */}>prev</Button>
        <div /* className={panel.dateRange} */ onClick={() => {} /*  this.props.setSelection() */}>
          {/* {DateFormatter(this.props.viewType, this.props.dateRange)} */}
        </div>
        <Button onClick={() => {} /* this.props.setDateRange('next') */}>next</Button>
      </div>

      <Button onClick={() => dispatch(setViewType('Week'))}>Week</Button>
      <Button onClick={() => dispatch(setViewType('Month'))}>Month</Button>
      <Button onClick={() => dispatch(setViewType('Year'))}>Year</Button>
    </>
  );
}
