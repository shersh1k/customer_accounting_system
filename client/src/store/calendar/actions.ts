import { Dispatch } from 'redux';
import { cancel } from '../../helpers/API'; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { GetOrdersByRange } from '../../helpers/API/Methods';
import {
  GET_CALENDAR_ORDERS_REQUEST,
  GET_CALENDAR_ORDERS_SUCCESS,
  GET_CALENDAR_ORDERS_FAIL,
  SET_CALENDAR_VIEWTYPE,
  LoginActionTypes,
  ViewType,
  SET_CALENDAR_NEXT_RANGE,
  SET_CALENDAR_PREV_RANGE,
  RESSET_CALENDAR_RANGE,
  APPLY_DATE_FILTER,
  Interval
} from './types';
import { getRange, getDays } from './CalendarHelper';
import { addDays, subDays } from 'date-fns';

export function dateFilter(neededDates: string[]) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: APPLY_DATE_FILTER
    });
  };
}

export function setViewType(viewType: ViewType) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    const showingRange = getRange(viewType);
    dispatch({
      type: SET_CALENDAR_VIEWTYPE,
      viewType: viewType,
      showingRange: showingRange
    });
  };
}

export function setPrevRange(viewType: ViewType, currentRange: Interval) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    const showingRange = getRange(viewType, subDays(currentRange.start, 1));
    dispatch({
      type: SET_CALENDAR_PREV_RANGE,
      showingRange: showingRange
    });
  };
}

export function setNextRange(viewType: ViewType, currentRange: Interval) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    const showingRange = getRange(viewType, addDays(currentRange.end, 1));
    dispatch({
      type: SET_CALENDAR_NEXT_RANGE,
      showingRange: showingRange
    });
  };
}

export function resetRange(viewType: ViewType, currentRange: Interval) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    const showingRange = getRange(viewType);
    dispatch({
      type: RESSET_CALENDAR_RANGE,
      showingRange: showingRange
    });
  };
}

export function getOrdersForCalendar(range: Interval) {
  if (cancel) cancel('cancelled');
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: GET_CALENDAR_ORDERS_REQUEST,
      isPending: true,
      days: []
    });
    return GetOrdersByRange(range)
      .then(response => {
        const days = getDays(range, response.data);
        dispatch({
          type: GET_CALENDAR_ORDERS_SUCCESS,
          isPending: false,
          days: days
        });
      })
      .catch(response => {
        dispatch({
          type: GET_CALENDAR_ORDERS_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}
