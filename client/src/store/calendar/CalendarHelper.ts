import { ViewType, iOrder, iDay, Interval } from './types';
import {
  startOfWeek as startOfWeekSunday,
  endOfWeek as endOfWeekSaturday,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  startOfDay,
  endOfDay
} from 'date-fns';

export function getDays(dateRange: Interval, events: iOrder[]): iDay[] {
  let days: iDay[] = eachDayOfInterval(dateRange).map((date, i, array) => {
    let isSelected: boolean = false;
    return {
      date: date,
      orders: events ? fillDayEvents(events, date) : [],
      isToday: new Date().setHours(8, 0, 0, 0) === date.setHours(8, 0, 0, 0),
      notCurrentMonth: undefined,
      isSelected: isSelected,
      _type: 'iDay'
    } as iDay;
  });

  return days;
}

export function getRange(viewType: ViewType, date: Date = new Date()) {
  if (viewType === 'Day') return getRangeDay(date);
  if (viewType === 'Week') return getRangeWeek(date);
  if (viewType === 'Month') return getRangeMonth(date);
  if (viewType === 'Year') return getRangeYear(date);
  return { start: new Date(), end: new Date() };
}

function startOfWeek(date: Date) {
  return startOfWeekSunday(date, { weekStartsOn: 1 });
}

function endOfWeek(date: Date) {
  return endOfWeekSaturday(date, { weekStartsOn: 1 });
}

function getRangeDay(date: Date) {
  const start = startOfDay(date);
  const end = endOfDay(date);
  return { start, end };
}

function getRangeWeek(date: Date) {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return { start, end };
}

function getRangeMonth(date: Date) {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  return { start, end };
}

function getRangeYear(date: Date) {
  const start = startOfWeek(startOfYear(date));
  const end = endOfWeek(endOfYear(date));
  return { start, end };
}

export function fillDayEvents(events: iOrder[], date: Date) {
  return events.filter(event => new Date(event.dateDeadline).setHours(8, 0, 0, 0) === date.setHours(8, 0, 0, 0));
}

export const MONTHS_SHORT = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
export const DAYS_FULL = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
export const DAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
