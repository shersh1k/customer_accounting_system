import {
  GET_CALENDAR_ORDERS_REQUEST,
  GET_CALENDAR_ORDERS_SUCCESS,
  GET_CALENDAR_ORDERS_FAIL,
  CalendarState,
  LoginActionTypes,
  SET_VIEWTYPE
} from './types';

export const initStateArchiveReducer: CalendarState = {
  data: [],
  viewType: 'Month',
  isPending: false,
  error: false
};

export function calendarReducer(state = initStateArchiveReducer, action: LoginActionTypes) {
  switch (action.type) {
    case GET_CALENDAR_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_CALENDAR_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_CALENDAR_ORDERS_FAIL:
      return { ...state, ...action };

    case SET_VIEWTYPE:
      return { ...state, ...action };
    default:
      return state;
  }
}
