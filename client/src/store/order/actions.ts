import { Dispatch } from "redux";
import { UpdateOrder, GetOrder, PostOrder } from "../../helpers/API/Methods";
import { cancel } from "../../helpers/API"; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
  SET_ORDER_READ_MODE,
  SET_ORDER_EDIT_MODE,
  HANDLE_CHANGE_NEW,
  LoginActionTypes,
  iOrder
} from "./types";

export function getOrder(slug: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    if (cancel) cancel("cancelled");
    dispatch({
      type: GET_ORDER_REQUEST,
      isPending: true,
      currentOrder: {}
    });
    return GetOrder(slug)
      .then(response => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          isPending: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDER_FAIL,
          isPending: false,
          currentOrder: {},
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function handleChange(field: keyof iOrder, value: any) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: HANDLE_CHANGE_NEW,
      newOrder: {
        [field]: value
      }
    });
  };
}

export function postOrder(order: iOrder) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: POST_ORDER_REQUEST,
      isPending: true,
      currentOrder: {}
    });
    return PostOrder(order)
      .then(response => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          isPending: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: POST_ORDER_FAIL,
          isPending: false,
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
      isPending: true
    });
    return UpdateOrder(order)
      .then(response => {
        dispatch({
          type: PUT_ORDER_SUCCESS,
          isPending: false,
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
          isPending: false,
          currentOrder: {},
          error: true,
          errorMessage: response.message
        });
      });
  };
}
