import {
  GET_CALENDAR_ORDERS_REQUEST,
  GET_CALENDAR_ORDERS_SUCCESS,
  GET_CALENDAR_ORDERS_FAIL,
  CalendarState,
  LoginActionTypes,
  SET_CALENDAR_VIEWTYPE,
  SET_CALENDAR_NEXT_RANGE,
  SET_CALENDAR_PREV_RANGE,
  RESSET_CALENDAR_RANGE
} from './types';
import { getRange } from './CalendarHelper';

const initialViewType = 'Month';
const initialRange = getRange(initialViewType);

export const initStateCalendarReducer: CalendarState = {
  days: [],
  showingRange: initialRange,
  viewType: initialViewType,
  isPending: false,
  error: false
};

export function calendarReducer(state = initStateCalendarReducer, action: LoginActionTypes) {
  switch (action.type) {
    case GET_CALENDAR_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_CALENDAR_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_CALENDAR_ORDERS_FAIL:
      return { ...state, ...action };

    case SET_CALENDAR_NEXT_RANGE:
      return { ...state, ...action };
    case SET_CALENDAR_PREV_RANGE:
      return { ...state, ...action };
    case RESSET_CALENDAR_RANGE:
      return { ...state, ...action };

    case SET_CALENDAR_VIEWTYPE:
      return { ...state, ...action };
    default:
      return state;
  }
}
