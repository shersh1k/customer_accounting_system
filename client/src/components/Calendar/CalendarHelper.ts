import { ViewType } from '../../store/calendar/types';
import { iOrder } from '../../store/calendar/types';

export function getDateRangeHelper(viewType: ViewType, selection?: iDay | iWeek | iMonth) {
  let date = new Date();
  if (selection)
    switch (selection._type) {
      case 'iDay':
        date = selection.date;
        break;
      case 'iMonth':
        date = selection.days[0].date;
        break;
    }
  let dayOfWeek = date.getDay() ? date.getDay() - 1 : 6;
  if (viewType == 'Week') return new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayOfWeek + 1, 8);
  if (viewType == 'Month') return new Date(date.getFullYear(), date.getMonth(), 1, 8);
  if (viewType == 'Year') return new Date(date.getFullYear(), 0, 1, 8);
  return new Date();
}

export function getDateRange(dateRangeHelper: Date, viewType: ViewType, direction?: string) {
  if (direction == 'reset') dateRangeHelper = new Date();
  let dates: Date[] = [];
  if (viewType == 'Week') {
    if (direction == 'next')
      dateRangeHelper = new Date(
        dateRangeHelper.getFullYear(),
        dateRangeHelper.getMonth(),
        dateRangeHelper.getDate() + 7,
        8
      );
    if (direction == 'prev')
      dateRangeHelper = new Date(
        dateRangeHelper.getFullYear(),
        dateRangeHelper.getMonth(),
        dateRangeHelper.getDate() - 7,
        8
      );
    dates = getWeekDates(dateRangeHelper);
  }
  if (viewType == 'Month') {
    if (direction == 'next')
      dateRangeHelper = new Date(dateRangeHelper.getFullYear(), dateRangeHelper.getMonth() + 1, 1, 8);
    if (direction == 'prev')
      dateRangeHelper = new Date(dateRangeHelper.getFullYear(), dateRangeHelper.getMonth() - 1, 1, 8);
    dates = getMonthDates(dateRangeHelper);
  }
  if (viewType == 'Year') {
    if (direction == 'next') dateRangeHelper = new Date(dateRangeHelper.getFullYear() + 1, 0, 1, 8);
    if (direction == 'prev') dateRangeHelper = new Date(dateRangeHelper.getFullYear() - 1, 0, 1, 8);
    dates = getYearDates(dateRangeHelper);
  }
  return { dateRangeHelper: dateRangeHelper, dateFrom: dates[0], dateTo: dates[1] };
}

export function getWeekDates(date: Date) {
  let days: Date[] = [];
  let currDay = date.getDay() || 7; // 7 - фикс воскресенья
  let currDate = date.getDate();
  for (let i = 1; i <= 7; i++) {
    let fillDate = new Date(date.getFullYear(), date.getMonth(), currDate - currDay + i, 8);
    days.push(fillDate);
  }
  return [days[0], days[6]];
}

export function getMonthDates(date: Date) {
  let firstDayInMonth = new Date(date.getFullYear(), date.getMonth(), 1, 8);
  let firstDayinViewMonth = getWeekDates(firstDayInMonth)[0];
  let daysInMonth = 32 - new Date(date.getFullYear(), date.getMonth(), 32, 8).getDate();
  let lastDayInMonth = new Date(date.getFullYear(), date.getMonth(), daysInMonth, 8);
  let lastDayinViewMonth = getWeekDates(lastDayInMonth)[1];
  return [firstDayinViewMonth, lastDayinViewMonth];
}

export function getYearDates(date: Date) {
  let firstDayInYear = new Date(date.getFullYear(), 0, 1, 8);
  let lastDayInYear = new Date(date.getFullYear(), 11, 31, 8);
  return [firstDayInYear, lastDayInYear];
}

export function parseDateRange(dateFrom: Date, dateTo: Date) {
  let yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo;
  yearFrom = dateFrom.getFullYear();
  yearTo = dateTo.getFullYear();
  monthFrom = dateFrom.getMonth() + 1 < 10 ? '0' + (dateFrom.getMonth() + 1) : dateFrom.getMonth() + 1;
  monthTo = dateTo.getMonth() + 1 < 10 ? '0' + (dateTo.getMonth() + 1) : dateTo.getMonth() + 1;
  dayFrom = dateFrom.getDate() < 10 ? '0' + dateFrom.getDate() : dateFrom.getDate();
  dayTo = dateTo.getDate() < 10 ? '0' + dateTo.getDate() : dateTo.getDate();
  return `${yearFrom}-${monthFrom}-${dayFrom}:${yearTo}-${monthTo}-${dayTo}`;
}

export function getDatesArr(dateFrom: Date, dateTo: Date): Date[] {
  let dates: Date[] = [];
  let currentDate: Date = dateFrom;
  let addDays = function(currentDate: Date, num: number) {
    let date = new Date(currentDate.valueOf());
    date.setDate(date.getDate() + num);
    return date;
  };
  while (currentDate <= dateTo) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
}

export function getDays(dateRange: iDateRange, events?: iOrder[], selection?: iDay | iWeek | iMonth): iDay[] {
  let days: iDay[] = getDatesArr(dateRange.dateFrom, dateRange.dateTo).map((date, i, array) => {
    let isSelected: boolean = false;
    if (selection)
      switch (selection._type) {
        case 'iDay':
          isSelected = selection.date.setHours(8, 0, 0, 0) == date.setHours(8, 0, 0, 0);
          break;
        // case "iMonth": isSelected = selection.days[0].date.setHours(8, 0, 0, 0) == date.setHours(8, 0, 0, 0); break;
      }
    return {
      date: date,
      events: events ? fillDayEvents(events, date) : [],
      isToday: new Date().setHours(8, 0, 0, 0) == date.setHours(8, 0, 0, 0),
      //если длина дней больше 45 то это ViewType=год и соотв не надо ставить notCurrentMonth
      notCurrentMonth: array.length > 45 ? undefined : dateRange.dateRangeHelper.getMonth() != date.getMonth(),
      isSelected: isSelected,
      _type: 'iDay'
    } as iDay;
  });

  return days;
}

export function getWeeks(days: iDay[], selection?: iDay | iWeek | iMonth): iWeek[] {
  let weeks: iWeek[] = [];
  days.forEach((item, index) => {
    if (index % 7 == 0)
      weeks.push({
        days: [item],
        isSelected: false,
        _type: 'iWeek'
      } as iWeek);
    else weeks[Math.floor(index / 7)].days.push(item);
  });
  return weeks;
}

export function getMonths(days: iDay[], selection?: iDay | iWeek | iMonth): iMonth[] {
  let months: iMonth[] = MONTHS_FULL.im.map((name, index) => {
    let isSelected: boolean = false;
    if (selection)
      switch (selection._type) {
        case 'iMonth':
          isSelected = selection.index == index;
          break;
      }
    return { name: name, index: index, days: [], isSelected: isSelected, fromWeekDay: 0, _type: 'iMonth' } as iMonth;
  });

  let countMonth: number = 0;
  days.forEach((day, index) => {
    if (!index) months[countMonth].fromWeekDay = day.date.getDay() || 7;
    if (day.date.getMonth() <= countMonth) {
      months[countMonth].days.push(day);
    } else {
      countMonth++;
      months[countMonth].fromWeekDay = day.date.getDay() || 7;
      months[countMonth].days.push(day);
    }
  });

  months.forEach(month => {
    let arr = [];
    while (arr.length < month.fromWeekDay - 1)
      arr.push({
        date: month.days[0].date,
        events: [],
        isToday: false,
        isSelected: false,
        mock: true,
        _type: 'iDay'
      } as iDay);
    month.days.splice(0, 0, ...arr);
  });
  return months;
}

export function fillDayEvents(events: iOrder[], date: Date) {
  return events.filter(event => new Date(event.dateOrder).setHours(8, 0, 0, 0) == date.setHours(8, 0, 0, 0));
}

export function toDayFormatter(date: Date) {
  let dayOfWeek = date.getDay() ? date.getDay() - 1 : 6;
  return `${DAYS_FULL[dayOfWeek]}, ${date.getDate()} ${MONTHS_FULL.rod[date.getMonth()]} ${date.getFullYear()}`;
}

export function toWeekFormatter(dateFrom: Date, dateTo: Date) {
  let isDifMonth: boolean = dateFrom.getMonth() != dateTo.getMonth();
  return `Неделя с ${dateFrom.getDate()} ${
    isDifMonth ? MONTHS_FULL.rod[dateFrom.getMonth()] : ''
  } по ${dateTo.getDate()} ${MONTHS_FULL.rod[dateTo.getMonth()]}`;
}

export function toMonthFormatter(date: Date) {
  return `${MONTHS_FULL.im[date.getMonth()]} ${date.getFullYear()}`;
}

export function DateFormatter(viewType: ViewType, dateRange: iDateRange, toDay?: boolean) {
  if (toDay) return toDayFormatter(new Date());
  else if (viewType == 'Week') return toWeekFormatter(dateRange.dateFrom, dateRange.dateTo);
  else if (viewType == 'Month') return toMonthFormatter(dateRange.dateRangeHelper);
  else return dateRange.dateRangeHelper.getFullYear().toString();
}

export function clickDiffer(callback: Function, item: iMonth | iDay, isDblClick: boolean) {
  let timer: NodeJS.Timeout;
  let prevent: boolean = false;
  let delay: number = 100;
  const handleClick = (month: iMonth | iDay, callback: Function) => {
    timer = setTimeout(() => {
      if (!prevent) callback(month);
      prevent = false;
    }, delay);
  };
  const handleDoubleClick = (month: iMonth | iDay, callback: Function) => {
    clearTimeout(timer);
    prevent = true;
    callback(month);
  };
  if (isDblClick) handleDoubleClick(item, callback);
  else handleClick(item, callback);
}

export interface iDateRange {
  dateFrom: Date;
  dateTo: Date;
  dateRangeHelper: Date;
}
export interface iDay {
  date: Date;
  events: iOrder[];
  isToday: boolean;
  isSelected: boolean;
  notCurrentMonth?: boolean;
  mock?: boolean;
  _type: 'iDay';
}

export interface iWeek {
  days: iDay[];
  isSelected: boolean;
  numberInYear?: number;
  _type: 'iWeek';
}

export interface iMonth {
  name: string;
  index: number;
  days: iDay[];
  isSelected: boolean;
  fromWeekDay: number;
  _type: 'iMonth';
}
export const MONTHS_FULL = {
  im: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  rod: [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ]
};
export const MONTHS_SHORT = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
export const DAYS_FULL = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
export const DAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
