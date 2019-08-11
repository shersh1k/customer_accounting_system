export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAIL = "GET_ORDERS_FAIL";

export interface OrdersState {
  isFetching: boolean;
  error: boolean;
  deadlineList: iOrder[];
  notPayedList: iOrder[];
  startWorkList: iOrder[];
  lastTenList: iOrder[];
  allOrdersList: iOrder[];
  errorMessage?: string;
  currentOrder: iOrder;
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

export type LoginActionTypes = GetOrderRequest | GetOrderSuccess | GetOrderFail;

export interface iOrder {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  dateOrder?: Date;
  dateStartWork?: Date;
  dateDeadline?: Date;
  dateFinishWork?: Date;
  datePay?: Date;
  priceMaterials?: number;
  priceOrder?: number;
  comments?: string[]; // | iComment
  recipient?: string; // | iRecipient;
  createdAt?: Date;
  updatedAt?: Date;
  author?: string; // | iUserJSON
  __v?: 0;
}
