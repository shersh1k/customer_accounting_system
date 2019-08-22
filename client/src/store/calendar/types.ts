export const GET_CALENDAR_ORDERS_REQUEST = 'GET_CALENDAR_ORDERS_REQUEST';
export const GET_CALENDAR_ORDERS_SUCCESS = 'GET_CALENDAR_ORDERS_SUCCESS';
export const GET_CALENDAR_ORDERS_FAIL = 'GET_CALENDAR_ORDERS_FAIL';
export const SET_VIEWTYPE = 'SET_VIEWTYPE';

export interface CalendarState {
  data: iOrder[];
  viewType: ViewType;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

export type ViewType = 'Week' | 'Month' | 'Year';

interface SetViewType {
  type: typeof SET_VIEWTYPE;
  viewType: ViewType;
}

interface GetCalendarOrdersRequest {
  type: typeof GET_CALENDAR_ORDERS_REQUEST;
  isPending: boolean;
}

interface GetCalendarOrdersSuccess {
  type: typeof GET_CALENDAR_ORDERS_SUCCESS;
  isPending: boolean;
  data: iOrder[];
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
  | SetViewType;

export interface iOrder {
  title: string;
  priceOrder: string;
  dateOrder: string;
  dateDeadline: string;
  datePay: string;
}
