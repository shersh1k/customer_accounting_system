import { Dispatch } from "redux";
import { API_GetOrders } from "../../helpers/API/Methods";
import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, LoginActionTypes } from "./types";

export function getOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true
    });
    API_GetOrders().then(
      response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          ordersList: response.data
        });
      },
      response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isFetching: false,
          error: true,
          errorMessage: response.response.data.message
        });
      }
    );
  };
}
