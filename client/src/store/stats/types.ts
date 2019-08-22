export const GET_ALL_ORDERS_REQUEST = 'GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_SUCCESS = 'GET_ALL_ORDERS_SUCCESS';
export const GET_ALL_ORDERS_FAIL = 'GET_ALL_ORDERS_FAIL';

export interface StatsState {
  data: iOrder[];
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

interface GetOrderRequest {
  type: typeof GET_ALL_ORDERS_REQUEST;
  isPending: boolean;
}

interface GetOrderSuccess {
  type: typeof GET_ALL_ORDERS_SUCCESS;
  isPending: boolean;
  data: iOrder[];
}

interface GetOrderFail {
  type: typeof GET_ALL_ORDERS_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

export type LoginActionTypes = GetOrderRequest | GetOrderSuccess | GetOrderFail;


export interface iOrder {
  title: string;
  priceOrder: string;
  dateOrder: string;
  dateDeadline: string;
  datePay: string;
}
