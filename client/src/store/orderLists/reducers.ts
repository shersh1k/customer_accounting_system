import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  OrderListsState,
  LoginActionTypes
} from "./types";

const initialState: OrderListsState = {
  deadlineList: [],
  startWorkList: [],
  lastTenList: [],
  notPayedList: [],
  isFetching: false,
  error: false,
  errorMessage: ""
};

export function orderListsReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_ORDERS_FAIL:
      if (action.errorMessage === "cancelled") action.isFetching = true;
      return { ...state, ...action };

    case PUT_ORDER_REQUEST:
      return { ...state, ...action };
    case PUT_ORDER_SUCCESS:
      return { ...state, ...action };
    case PUT_ORDER_FAIL:
      return { ...state, ...action };

    default:
      return state;
  }
}
