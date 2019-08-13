export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";
export const PUT_ORDER_REQUEST = "PUT_ORDER_REQUEST";
export const PUT_ORDER_SUCCESS = "PUT_ORDER_SUCCESS";
export const PUT_ORDER_FAIL = "PUT_ORDER_FAIL";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAIL = "POST_ORDER_FAIL";
export const SET_ORDER_EDIT_MODE = "SET_ORDER_EDIT_MODE";
export const SET_ORDER_READ_MODE = "SET_ORDER_READ_MODE";
export const HANDLE_CHANGE_NEW = "HANDLE_CHANGE_NEW";
export const HANDLE_CHANGE_EDIT = "HANDLE_CHANGE_EDIT";

export interface OrderState {
  order: iOrder;
  editedOrder: iOrder;
  newOrder: iOrder;
  isEdit: boolean;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

interface HandleChangeNew {
  type: typeof HANDLE_CHANGE_NEW;
  newOrder: {
    [field in keyof iOrder]: any;
  };
}

/* type HandleChangeNew = { [field in keyof iOrder]: any } & {
  type: typeof HANDLE_CHANGE_NEW;
};
 */
interface HandleChangeEdit {
  type: typeof HANDLE_CHANGE_EDIT;
  // (field: keyof iOrder): any;
}

interface PostOrderRequest {
  type: typeof POST_ORDER_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
}

interface PostOrderSuccess {
  type: typeof POST_ORDER_SUCCESS;
  isPending: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface PostOrderFail {
  type: typeof POST_ORDER_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
  currentOrder?: iOrder;
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
  isPending: boolean;
  ordersList?: iOrder[];
}

interface PutOrderSuccess {
  type: typeof PUT_ORDER_SUCCESS;
  isPending: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface PutOrderFail {
  type: typeof PUT_ORDER_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
  currentOrder?: iOrder;
}

interface GetOrderRequest {
  type: typeof GET_ORDER_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
}

interface GetOrderSuccess {
  type: typeof GET_ORDER_SUCCESS;
  isPending: boolean;
  ordersList?: iOrder[];
  currentOrder?: iOrder;
}

interface GetOrderFail {
  type: typeof GET_ORDER_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
  currentOrder?: iOrder;
}

export type LoginActionTypes =
  | GetOrderRequest
  | GetOrderSuccess
  | GetOrderFail
  | HandleChangeEdit
  | PutOrderRequest
  | PutOrderSuccess
  | PutOrderFail
  | SetOrderReadonlyMode
  | SetOrderEditMode
  | HandleChangeNew
  | PostOrderRequest
  | PostOrderSuccess
  | PostOrderFail;

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
