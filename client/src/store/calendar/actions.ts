import { Dispatch } from 'redux';
import { GetAllOrders } from '../../helpers/API/Methods';
import {
  GET_CALENDAR_ORDERS_REQUEST,
  GET_CALENDAR_ORDERS_SUCCESS,
  GET_CALENDAR_ORDERS_FAIL,
  SET_VIEWTYPE,
  LoginActionTypes,
  ViewType
} from './types';

export function getAllOrdersForCalendar() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: GET_CALENDAR_ORDERS_REQUEST,
      isPending: true
    });
    return GetAllOrders()
      .then(response => {
        dispatch({
          type: GET_CALENDAR_ORDERS_SUCCESS,
          isPending: false,
          data: response.data
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

export function setViewType(viewType: ViewType) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: SET_VIEWTYPE,
      viewType: viewType
    });
  };
}
