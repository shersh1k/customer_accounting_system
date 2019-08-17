import { Dispatch } from 'redux';
import { PostOrder, GetLastTenOrders } from '../../helpers/API/Methods';
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  HANDLE_CHANGE_NEW,
  LoginActionTypes,
  iNewOrder
} from './types';

export function handleChange(field: keyof iNewOrder, value: any) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: HANDLE_CHANGE_NEW,
      newOrder: {
        [field]: value
      }
    });
  };
}

export function postOrder(order: iNewOrder) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: POST_ORDER_REQUEST,
      isPending: true
    });
    return PostOrder(order)
      .then(response => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          isPending: false,
          order: response.data.order
        });
      })
      .catch(response => {
        dispatch({
          type: POST_ORDER_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function getLastTen() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: GET_ORDERS_REQUEST,
      isPending: true
    });
    GetLastTenOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          list: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}
