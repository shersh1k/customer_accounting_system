import { iOrder, iNote, iExpense } from '../order/types';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAIL = 'GET_ORDERS_FAIL';
export const UPDATE_DATE_REQUEST = 'UPDATE_DATE_REQUEST';
export const UPDATE_DATE_SUCCESS = 'UPDATE_DATE_SUCCESS';
export const UPDATE_DATE_FAIL = 'UPDATE_DATE_FAIL';
export const CHANGE_LIST = 'CHANGE_LIST';
export const PUT_NOTE_REQUEST = 'PUT_NOTE_REQUEST';
export const PUT_NOTE_SUCCESS = 'PUT_NOTE_SUCCESS';
export const PUT_NOTE_FAIL = 'PUT_NOTE_FAIL';
export const PUT_EXPENSE_REQUEST = 'PUT_EXPENSE_REQUEST';
export const PUT_EXPENSE_SUCCESS = 'PUT_EXPENSE_SUCCESS';
export const PUT_EXPENSE_FAIL = 'PUT_EXPENSE_FAIL';
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
  type: typeof UPDATE_DATE_REQUEST;
  isPending: boolean;
  ordersList?: iOrder[];
}

interface PutOrderSuccess {
  type: typeof UPDATE_DATE_SUCCESS;
  isPending: boolean;
  currentOrder: iOrder;
}

interface PutOrderFail {
  type: typeof UPDATE_DATE_FAIL;
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
  | PutNoteRequest
  | PutNoteSuccess
  | PutNoteFail
  | PutExpenseRequest
  | PutExpenseSuccess
  | PutExpenseFail
  | ChangeList;
