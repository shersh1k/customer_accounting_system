export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAIL = "GET_ORDERS_FAIL";

export interface OrdersState {
  ordersList: iOrder[]; //iOrder
  isFetching: boolean;
  error: boolean;
  lastPostedOrder?: iOrder;
  errorMessage?: string;
}

interface GetOrderRequest {
  type: typeof GET_ORDERS_REQUEST;
  isFetching: boolean;
}

interface GetOrderSuccess {
  type: typeof GET_ORDERS_SUCCESS;
  isFetching: boolean;
  ordersList: iOrder[];
}

interface GetOrderFail {
  type: typeof GET_ORDERS_FAIL;
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
}

export type LoginActionTypes = GetOrderRequest | GetOrderSuccess | GetOrderFail;

export interface iOrder {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  priceMaterials?: number;
  priceOrder?: number;
  dateFinishWork?: Date;
  dateOrder?: Date;
  datePay?: Date;
  dateStartWork?: Date;
  comments?: string[]; // | iComment
  recipient?: string; // | iRecipient;
  createdAt?: Date;
  updatedAt?: Date;
  author?: string; // | iUserJSON
  __v?: 0;
}
