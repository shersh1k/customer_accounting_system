import { iOrder } from "../order/types";

export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAIL = "GET_ORDERS_FAIL";

export interface OrdersState {
  isPending: boolean;
  error: boolean;
  deadlineList: iOrder[];
  notPayedList: iOrder[];
  startWorkList: iOrder[];
  lastTenList: iOrder[];
  allOrdersList: iOrder[];
  errorMessage?: string;
  currentOrder?: iOrder;
}

interface GetOrderRequest {
  type: typeof GET_ORDERS_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
}

interface GetOrderSuccess {
  type: typeof GET_ORDERS_SUCCESS;
  isPending: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface GetOrderFail {
  type: typeof GET_ORDERS_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
  currentOrder?: iOrder;
}

export type LoginActionTypes = GetOrderRequest | GetOrderSuccess | GetOrderFail;

