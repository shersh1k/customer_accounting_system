export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';
export const PUT_ORDER_REQUEST = 'PUT_ORDER_REQUEST';
export const PUT_ORDER_SUCCESS = 'PUT_ORDER_SUCCESS';
export const PUT_ORDER_FAIL = 'PUT_ORDER_FAIL';
export const PUT_NOTE_REQUEST = 'PUT_NOTE_REQUEST';
export const PUT_NOTE_SUCCESS = 'PUT_NOTE_SUCCESS';
export const PUT_NOTE_FAIL = 'PUT_NOTE_FAIL';
export const PUT_EXPENSE_REQUEST = 'PUT_EXPENSE_REQUEST';
export const PUT_EXPENSE_SUCCESS = 'PUT_EXPENSE_SUCCESS';
export const PUT_EXPENSE_FAIL = 'PUT_EXPENSE_FAIL';
export const SET_ORDER_EDIT_MODE = 'SET_ORDER_EDIT_MODE';
export const SET_ORDER_READ_MODE = 'SET_ORDER_READ_MODE';
export const HANDLE_CHANGE = 'HANDLE_CHANGE';

export interface OrderState {
  order: iOrder | null;
  editedOrder: iOrder | null;
  isEdit: boolean;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

interface HandleChange {
  type: typeof HANDLE_CHANGE;
  editedOrder: { [field in keyof iOrder]?: any };
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
interface PutNoteRequest {
  type: typeof PUT_NOTE_REQUEST;
  isPending: boolean;
}

interface PutNoteSuccess {
  type: typeof PUT_NOTE_SUCCESS;
  isPending: boolean;
  note: iNote;
}

interface PutNoteFail {
  type: typeof PUT_NOTE_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

interface PutExpenseRequest {
  type: typeof PUT_EXPENSE_REQUEST;
  isPending: boolean;
}

interface PutExpenseSuccess {
  type: typeof PUT_EXPENSE_SUCCESS;
  isPending: boolean;
  expense: iExpense;
}

interface PutExpenseFail {
  type: typeof PUT_EXPENSE_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

interface GetOrderRequest {
  type: typeof GET_ORDER_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
  order: iOrder | null;
  editedOrder: iOrder | null;
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
  | PutOrderRequest
  | PutOrderSuccess
  | PutNoteRequest
  | PutNoteSuccess
  | PutNoteFail
  | PutExpenseRequest
  | PutExpenseSuccess
  | PutExpenseFail
  | PutOrderFail
  | SetOrderReadonlyMode
  | SetOrderEditMode
  | HandleChange;

export interface iOrder {
  id: string;
  _id: string;
  slug: string;
  title: string;
  priceOrder: number;
  description: string;
  dateOrder: Date;
  dateStartWork?: Date;
  dateDeadline: Date;
  dateFinishWork?: Date;
  datePay?: Date;
  expenses: iExpense[];
  notes: iNote[];
  customer?: iCustomer;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

export interface iExpense {
  _id?: string;
  description: string;
  cost: number;
  spendDate?: Date;
  order: string;
}

export interface iNote {
  _id?: string;
  title: string;
  body: string;
  order: string;
  createdAt?: Date;
}

export interface iCustomer {}
