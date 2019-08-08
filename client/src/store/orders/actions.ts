import { Dispatch } from "redux";
import {
  API_GetOrdersByDateStartWork,
  API_GetOrdersByDateFinishWork,
  API_GetAllOrders
} from "../../helpers/API/Methods";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, LoginActionTypes } from "./types";

export function getOrdersByDateStartWork() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("Operation canceled by another operation");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true,
      ordersList: []
    });
    return API_GetOrdersByDateStartWork()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          ordersList: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isFetching: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function getOrdersByDateFinishWork() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("Operation canceled by another operation");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true,
      ordersList: []
    });
    return API_GetOrdersByDateFinishWork()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          ordersList: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isFetching: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function getAllOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("Operation canceled by another operation");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true,
      ordersList: []
    });
    return API_GetAllOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          ordersList: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isFetching: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}
