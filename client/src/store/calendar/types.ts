export const GET_CALENDAR_ORDERS_REQUEST = 'GET_CALENDAR_ORDERS_REQUEST';
export const GET_CALENDAR_ORDERS_SUCCESS = 'GET_CALENDAR_ORDERS_SUCCESS';
export const GET_CALENDAR_ORDERS_FAIL = 'GET_CALENDAR_ORDERS_FAIL';
export const SET_CALENDAR_VIEWTYPE = 'SET_CALENDAR_VIEWTYPE';
export const SET_CALENDAR_NEXT_RANGE = 'SET_CALENDAR_NEXT_RANGE';
export const SET_CALENDAR_PREV_RANGE = 'SET_CALENDAR_PREV_RANGE';
export const RESSET_CALENDAR_RANGE = 'RESSET_CALENDAR_RANGE';
export const APPLY_DATE_FILTER = 'APPLY_DATE_FILTER';

export interface CalendarState {
  days: iDay[];
  showingRange: Interval;
  viewType: ViewType;
  selection?: iDay | iWeek | iMonth;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

export type ViewType = 'Week' | 'Month' | 'Year' | 'Day';

interface ApplyDateFilter {
  type: typeof APPLY_DATE_FILTER;
}

interface SetViewType {
  type: typeof SET_CALENDAR_VIEWTYPE;
  viewType: ViewType;
}

interface SetNextRange {
  type: typeof SET_CALENDAR_NEXT_RANGE;
  showingRange: Interval;
}

interface SetPrevRange {
  type: typeof SET_CALENDAR_PREV_RANGE;
  showingRange: Interval;
}

interface ResetRange {
  type: typeof RESSET_CALENDAR_RANGE;
  showingRange: Interval;
}

interface GetCalendarOrdersRequest {
  type: typeof GET_CALENDAR_ORDERS_REQUEST;
  isPending: boolean;
}

interface GetCalendarOrdersSuccess {
  type: typeof GET_CALENDAR_ORDERS_SUCCESS;
  isPending: boolean;
  days: iDay[];
}

interface GetCalendarOrdersFail {
  type: typeof GET_CALENDAR_ORDERS_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

export type LoginActionTypes =
  | GetCalendarOrdersRequest
  | GetCalendarOrdersSuccess
  | GetCalendarOrdersFail
  | SetViewType
  | SetNextRange
  | SetPrevRange
  | ResetRange
  | ApplyDateFilter;

export interface iOrder {
  title: string;
  priceOrder: string;
  dateOrder: string;
  dateDeadline: string;
  datePay: string;
}
export interface Interval {
  start: Date | number;
  end: Date | number;
}
export interface iDateRange {
  dateFrom: Date;
  dateTo: Date;
  dateRangeHelper: Date;
}
export interface iDay {
  date: Date;
  orders: iOrder[];
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
