import { Dispatch } from 'redux';
import { GetAllOrders } from '../../helpers/API/Methods';
import { GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAIL, LoginActionTypes } from './types';

export function getAllOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
      isPending: true
    });
    return GetAllOrders()
      .then(response => {
        dispatch({
          type: GET_ALL_ORDERS_SUCCESS,
          isPending: false,
          data: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ALL_ORDERS_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}
