import { iOrder } from '../order/types';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAIL = 'GET_ORDERS_FAIL';
export const PUT_ORDER_REQUEST = 'PUT_ORDER_REQUEST';
export const PUT_ORDER_SUCCESS = 'PUT_ORDER_SUCCESS';
export const PUT_ORDER_FAIL = 'PUT_ORDER_FAIL';
export const CHANGE_LIST = 'CHANGE_LIST';

export interface OrderListsState {
  listName: Tabs;
  list: iOrder[];
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

export type Tabs = 'DateDeadline' | 'DateStartWork' | 'NotPayed';

interface ChangeList {
  type: typeof CHANGE_LIST;
  listName?: Tabs;
}

interface PutOrderRequest {
  type: typeof PUT_ORDER_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
}

interface PutOrderSuccess {
  type: typeof PUT_ORDER_SUCCESS;
  isPending: boolean;
  currentOrder: iOrder;
}

interface PutOrderFail {
  type: typeof PUT_ORDER_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
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

export type LoginActionTypes =
  | GetOrderRequest
  | GetOrderSuccess
  | GetOrderFail
  | PutOrderRequest
  | PutOrderSuccess
  | PutOrderFail
  | ChangeList;
