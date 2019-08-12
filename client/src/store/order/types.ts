export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";
export const PUT_ORDER_REQUEST = "PUT_ORDER_REQUEST";
export const PUT_ORDER_SUCCESS = "PUT_ORDER_SUCCESS";
export const PUT_ORDER_FAIL = "PUT_ORDER_FAIL";
export const SET_ORDER_EDIT_MODE = "SET_ORDER_EDIT_MODE";
export const SET_ORDER_READ_MODE = "SET_ORDER_READONLY_MODE";

export interface OrderState {
  currentOrder: iOrder;
  isEdit: boolean;
  isFetching: boolean;
  error: boolean;
  errorMessage?: string;
}

interface SetOrderEditMode {
  type: typeof SET_ORDER_EDIT_MODE;
  isEdit: boolean;
}

interface SetOrderReadonlyMode {
  type: typeof SET_ORDER_READ_MODE;
  isEdit: boolean;
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
  type: typeof GET_ORDER_REQUEST;
  isFetching: boolean;
  ordersList?: iOrder[];
}

interface GetOrderSuccess {
  type: typeof GET_ORDER_SUCCESS;
  isFetching: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface GetOrderFail {
  type: typeof GET_ORDER_FAIL;
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
  | PutOrderFail
  | SetOrderReadonlyMode
  | SetOrderEditMode;

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
