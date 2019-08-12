import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  SET_ORDER_EDIT_MODE,
  SET_ORDER_READ_MODE,
  OrderState,
  LoginActionTypes
} from "./types";

const initialState: OrderState = {
  currentOrder: {},
  isEdit: false,
  isFetching: false,
  error: false,
  errorMessage: "cancelled",
};

export function orderReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, ...action };
    case GET_ORDER_SUCCESS:
      return { ...state, ...action };
    case GET_ORDER_FAIL:
      if (action.errorMessage === "cancelled") action.isFetching = true;
      return { ...state, ...action };

    case PUT_ORDER_REQUEST:
      return { ...state, ...action };
    case PUT_ORDER_SUCCESS:
      return { ...state, ...action };
    case PUT_ORDER_FAIL:
      if (action.errorMessage === "cancelled") action.isFetching = true;
      return { ...state, ...action };

    case SET_ORDER_EDIT_MODE:
      return { ...state, ...action };
    case SET_ORDER_READ_MODE:
      return { ...state, ...action };

    default:
      return state;
  }
}
