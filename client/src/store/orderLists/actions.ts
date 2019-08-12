import { Dispatch } from "redux";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { iOrder } from "../order/types";
import {
  API_GetOrdersByDateStartWork,
  API_GetOrdersByDateFinishWork,
  API_GetNotPayedOrders,
  API_GetLastTenOrders,
  API_UpdateOrder
} from "../../helpers/API/Methods";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  LoginActionTypes,
} from "./types";

export function updateOrder(order: iOrder) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: PUT_ORDER_REQUEST,
      isFetching: true
    });
    return API_UpdateOrder(order)
      .then(response => {
        dispatch({
          type: PUT_ORDER_SUCCESS,
          isFetching: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: PUT_ORDER_FAIL,
          isFetching: false,
          currentOrder: {},
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function getOrdersByDateDeadline() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true
    });
    return API_GetOrdersByDateFinishWork()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          deadlineList: response.data
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

export function getOrdersByDateStartWork() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true
    });
    return API_GetOrdersByDateStartWork()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          startWorkList: response.data
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

export function getNotPayedOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true
    });
    return API_GetNotPayedOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          notPayedList: response.data
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

export function getLastTenOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true
    });
    return API_GetLastTenOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          lastTenList: response.data
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
