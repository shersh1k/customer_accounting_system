import { iOrder } from '../order/types';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAIL = 'POST_ORDER_FAIL';
export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAIL = 'GET_ORDERS_FAIL';
export const HANDLE_CHANGE_NEW = 'HANDLE_CHANGE_NEW';
export const HANDLE_CHANGE_EDIT = 'HANDLE_CHANGE_EDIT';

export interface NewOrderState {
  newOrder: iNewOrder;
  list: iOrder[];
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

interface HandleChangeNew {
  type: typeof HANDLE_CHANGE_NEW;
  newOrder: { [field in keyof iNewOrder]?: any };
}

interface PostOrderRequest {
  type: typeof POST_ORDER_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
}

interface PostOrderSuccess {
  type: typeof POST_ORDER_SUCCESS;
  isPending: boolean;
  order: iOrder;
}

interface PostOrderFail {
  type: typeof POST_ORDER_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
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
}

interface GetOrderFail {
  type: typeof GET_ORDERS_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

export type LoginActionTypes =
  | HandleChangeNew
  | PostOrderRequest
  | PostOrderSuccess
  | PostOrderFail
  | GetOrderRequest
  | GetOrderSuccess
  | GetOrderFail;

export interface iNewOrder {
  title: string;
  description: string;
  dateOrder: Date;
  dateDeadline: Date;
  priceOrder: number;
  priceMaterials: number;
}
