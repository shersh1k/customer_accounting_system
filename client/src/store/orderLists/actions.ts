import { Dispatch } from "redux";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { iOrder } from "../order/types";
import {
  GetOrdersDeadline,
  GetOrdersStartWork,
  GetLastTenOrders,
  GetNotPayedOrders,
  UpdateOrder
} from "../../helpers/API/Methods";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  CHANGE_LIST,
  LoginActionTypes,
  Tabs
} from "./types";
import { AxiosResponse } from "axios";

export function setList(listName: Tabs) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: CHANGE_LIST,
      listName: listName
    });
    if (listName === "DateDeadline") return getList(dispatch, GetOrdersDeadline);
    if (listName === "DateStartWork") return getList(dispatch, GetOrdersStartWork);
    if (listName === "LastTen") return getList(dispatch, GetLastTenOrders);
    if (listName === "NotPayed") return getList(dispatch, GetNotPayedOrders);
  };
}

export function updateOrder(order: iOrder) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: PUT_ORDER_REQUEST,
      isPending: true
    });
    UpdateOrder(order)
      .then(response => {
        dispatch({
          type: PUT_ORDER_SUCCESS,
          isPending: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: PUT_ORDER_FAIL,
          isPending: false,
          currentOrder: {},
          error: true,
          errorMessage: response.message
        });
      });
  };
}

function getList(dispatch: Dispatch<LoginActionTypes>, request: () => Promise<AxiosResponse<any>>) {
  if (cancel) cancel("cancelled");
  dispatch({
    type: GET_ORDERS_REQUEST,
    isPending: true,
    list: []
  });
  request()
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
}
