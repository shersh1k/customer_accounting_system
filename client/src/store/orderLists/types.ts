import { iOrder } from "../order/types";

export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAIL = "GET_ORDERS_FAIL";
export const PUT_ORDER_REQUEST = "PUT_ORDER_REQUEST";
export const PUT_ORDER_SUCCESS = "PUT_ORDER_SUCCESS";
export const PUT_ORDER_FAIL = "PUT_ORDER_FAIL";

export interface OrderListsState {
  deadlineList: iOrder[];
  startWorkList: iOrder[];
  notPayedList: iOrder[];
  lastTenList: iOrder[];
  isFetching: boolean;
  error: boolean;
  errorMessage?: string;
}

interface PutOrderRequest {
  type: typeof PUT_ORDER_REQUEST;
  isFetching: boolean;
  ordersList?: iOrder[];
}

interface PutOrderSuccess {
  type: typeof PUT_ORDER_SUCCESS;
  isFetching: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface PutOrderFail {
  type: typeof PUT_ORDER_FAIL;
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
  currentOrder?: iOrder;
}

interface GetOrderRequest {
  type: typeof GET_ORDERS_REQUEST;
  isFetching: boolean;
  ordersList?: iOrder[];
}

interface GetOrderSuccess {
  type: typeof GET_ORDERS_SUCCESS;
  isFetching: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface GetOrderFail {
  type: typeof GET_ORDERS_FAIL;
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
  currentOrder?: iOrder;
}

export type LoginActionTypes =
  | GetOrderRequest
  | GetOrderSuccess
  | GetOrderFail
  | PutOrderRequest
  | PutOrderSuccess
  | PutOrderFail;
