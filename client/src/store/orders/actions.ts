import { Dispatch } from "redux";
import {
  API_GetOrdersByDateStartWork,
  API_GetOrdersByDateFinishWork,
  API_GetLastTenOrders,
  API_GetAllOrders,
  API_GetOrder
} from "../../helpers/API/Methods";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, LoginActionTypes } from "./types";

export function getOrdersByDateStartWork() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
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
    if (cancel) cancel("cancelled");
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
    if (cancel) cancel("cancelled");
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

export function getLastTenOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true,
      ordersList: []
    });
    return API_GetLastTenOrders()
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

export function getOrder(slug: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isFetching: true,
      currentOrder: {}
    });
    return API_GetOrder(slug)
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isFetching: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isFetching: false,
          currentOrder: {},
          error: true,
          errorMessage: response.message
        });
      });
  };
}
