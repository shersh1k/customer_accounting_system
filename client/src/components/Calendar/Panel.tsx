import React from 'react';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import { setViewType, setNextRange, setPrevRange, resetRange } from '../../store/calendar/actions';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { State } from '../../store';
import { ViewType, Interval } from '../../store/calendar/types';
import { format, addDays } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { PanelStyles } from '../../styles/CalendarStyles';

export default function Panel() {
  const classes = PanelStyles();
  const dispatch = useDispatch();
  const { viewType, showingRange } = useSelector((state: State) => state.calendar);
  const formatDate = (viewType: ViewType, showingRange?: Interval) => {
    if (viewType === 'Day' && showingRange)
      return format(showingRange.start, 'EEEE, do MMMM yyyy', { locale: ruLocale });
    if (viewType === 'Day') return 'Сегодня ' + format(new Date(), 'EEEE, do MMMM yyyy', { locale: ruLocale });
    if (!showingRange) return '';
    if (viewType === 'Week')
      return (
        `${format(showingRange.start, 'do MMMM', { locale: ruLocale })}` +
        ` по ${format(showingRange.end, 'do MMMM', { locale: ruLocale })}`
      );
    if (viewType === 'Month') {
      return format(addDays(showingRange.start, 15), 'LLLL', { locale: ruLocale });
    }
    if (viewType === 'Year') {
      return format(addDays(showingRange.start, 15), 'yyyy', { locale: ruLocale });
    }
  };
  return (
    <div className={classes.panel}>
      <Button className={classes.today} color='primary' onClick={() => dispatch(resetRange(viewType, showingRange))}>
        {formatDate('Day')}
      </Button>
      <div className={classes.direction}>
        <Button color='primary' onClick={() => dispatch(setPrevRange(viewType, showingRange))}>
          <ChevronLeft />
        </Button>
        <Typography variant='button'>{formatDate(viewType, showingRange)}</Typography>
        <Button color='primary' onClick={() => dispatch(setNextRange(viewType, showingRange))}>
          <ChevronRight />
        </Button>
      </div>
      <ButtonGroup className={classes.viewChanger}>
        <Button color='primary' onClick={() => dispatch(setViewType('Day'))}>
          День
        </Button>
        <Button color='primary' onClick={() => dispatch(setViewType('Week'))}>
          Неделя
        </Button>
        <Button color='primary' onClick={() => dispatch(setViewType('Month'))}>
          Месяц
        </Button>
        <Button color='primary' onClick={() => dispatch(setViewType('Year'))}>
          Год
        </Button>
      </ButtonGroup>
    </div>
  );
}
