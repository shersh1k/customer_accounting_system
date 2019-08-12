import { Dispatch } from "redux";
import { API_UpdateOrder, API_GetOrder } from "../../helpers/API/Methods";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  SET_ORDER_READ_MODE,
  SET_ORDER_EDIT_MODE,
  LoginActionTypes,
  iOrder
} from "./types";

export function getOrder(slug: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDER_REQUEST,
      isFetching: true,
      currentOrder: {}
    });
    return API_GetOrder(slug)
      .then(response => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          isFetching: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDER_FAIL,
          isFetching: false,
          currentOrder: {},
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function toggleEditState(currentMode: boolean) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (currentMode)
      dispatch({
        type: SET_ORDER_READ_MODE,
        isEdit: false
      });
    else
      dispatch({
        type: SET_ORDER_EDIT_MODE,
        isEdit: true
      });
  };
}

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
        dispatch({
          type: SET_ORDER_READ_MODE,
          isEdit: false
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
