import React, { Component, MouseEvent } from 'react';
import { Button } from '@material-ui/core';
import { setViewType } from '../../store/calendar/actions';
import { useDispatch } from 'react-redux';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

export default function Panel() {
  const dispatch = useDispatch();
  return (
    <>
      <div /* className={panel.direction} */>
        <Button onClick={() => {} /* this.props.setDateRange('prev') */}>
          <ChevronLeft />
        </Button>
        <Button /* className={panel.dateRange} */ onClick={() => {} /*  this.props.setSelection() */}>Сегодня</Button>
        <Button onClick={() => {} /* this.props.setDateRange('next') */}>
          <ChevronRight />
        </Button>
      </div>

      <Button onClick={() => dispatch(setViewType('Week'))}>Неделя</Button>
      <Button onClick={() => dispatch(setViewType('Month'))}>Месяц</Button>
      <Button onClick={() => dispatch(setViewType('Year'))}>Год</Button>
    </>
  );
}
