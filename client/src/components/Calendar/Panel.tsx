import React from 'react';
import {
  Button,
  Typography,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  Theme
} from '@material-ui/core';
import { setViewType, setNextRange, setPrevRange, resetRange, dateFilter } from '../../store/calendar/actions';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { State } from '../../store';
import { ViewType, Interval } from '../../store/calendar/types';
import { format, addDays } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { PanelStyles } from '../../styles/CalendarStyles';
import { useTheme } from '@material-ui/core/styles';

const dates = [
  { name: 'Дата заказа', value: 'dateOrder' },
  { name: 'Дата начала работы', value: 'dateStartWork' },
  { name: 'Дата окончания работы', value: 'dateFinishWork' },
  { name: 'Дедлайн', value: 'dateDeadline' },
  { name: 'Дата оплаты', value: 'datePay' }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function Panel() {
  const classes = PanelStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [date, setDate] = React.useState<string[]>([]);
  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setDate(event.target.value as string[]);
    dispatch(dateFilter(event.target.value as string[]));
    // dateFilte
  }
  const { viewType, showingRange } = useSelector((state: State) => state.calendar);
  const buttonVariant = (view: ViewType) => (view === viewType ? 'contained' : 'text');
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
        <Button variant={buttonVariant('Day')} color='primary' onClick={() => dispatch(setViewType('Day'))}>
          День
        </Button>
        <Button variant={buttonVariant('Week')} color='primary' onClick={() => dispatch(setViewType('Week'))}>
          Неделя
        </Button>
        <Button variant={buttonVariant('Month')} color='primary' onClick={() => dispatch(setViewType('Month'))}>
          Месяц
        </Button>
        <Button variant={buttonVariant('Year')} color='primary' onClick={() => dispatch(setViewType('Year'))}>
          Год
        </Button>
      </ButtonGroup>
      <FormControl className={classes.choosedDates}>
        <InputLabel>Chip</InputLabel>
        <Select
          multiple
          value={date}
          onChange={e => handleChange(e)}
          input={<Input id='select-multiple-chip' />}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}>
          {dates.map(dateItem => (
            <MenuItem key={dateItem.value} value={dateItem.value} style={getStyles(dateItem.name, date, theme)}>
              {dateItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function getStyles(name: string, date: string[], theme: Theme) {
  return {
    fontWeight: date.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}
