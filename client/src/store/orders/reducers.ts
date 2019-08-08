import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, OrdersState, LoginActionTypes } from "./types";

const initialState: OrdersState = {
  ordersList: [],
  isFetching: false,
  error: false,
  errorMessage: "cancelled"
};

export function ordersReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_ORDERS_FAIL:
      if (action.errorMessage === "cancelled") action.isFetching = true;
      return { ...state, ...action };

    default:
      return state;
  }
}
