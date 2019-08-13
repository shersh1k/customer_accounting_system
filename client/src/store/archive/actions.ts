import { Dispatch } from "redux";
import {
  GetOrdersStartWork,
  GetOrdersDeadline,
  GetNotPayedOrders,
  GetLastTenOrders,
  GetAllOrders,
  GetOrder
} from "../../helpers/API/Methods";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, LoginActionTypes } from "./types";

export function getOrder(slug: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isPending: true,
      currentOrder: {}
    });
    return GetOrder(slug)
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDERS_FAIL,
          isPending: false,
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
      isPending: true
    });
    return GetOrdersDeadline()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          deadlineList: response.data
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

export function getOrdersByDateStartWork() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isPending: true
    });
    return GetOrdersStartWork()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          startWorkList: response.data
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
export function getNotPayedOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isPending: true
    });
    return GetNotPayedOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          notPayedList: response.data
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

export function getLastTenOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isPending: true
    });
    return GetLastTenOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          lastTenList: response.data
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

export function getAllOrders() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDERS_REQUEST,
      isPending: true
    });
    return GetAllOrders()
      .then(response => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          isPending: false,
          allOrdersList: response.data
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
