import { Dispatch } from 'redux';
import { cancel } from '../../helpers/API'; //импортируем canceller (один на всех, или все таки на каждый запрос разный создается? надо как-то проверить)
import { iOrder, iExpense, iNote } from '../order/types';
import { AxiosResponse } from 'axios';
import {
  GetOrdersDeadline,
  GetOrdersStartWork,
  GetNotPayedOrders,
  UpdateOrder,
  PostExpense,
  PostNote
} from '../../helpers/API/Methods';
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  UPDATE_DATE_REQUEST,
  UPDATE_DATE_SUCCESS,
  UPDATE_DATE_FAIL,
  PUT_NOTE_REQUEST,
  PUT_NOTE_SUCCESS,
  PUT_NOTE_FAIL,
  PUT_EXPENSE_REQUEST,
  PUT_EXPENSE_SUCCESS,
  PUT_EXPENSE_FAIL,
  CHANGE_LIST,
  LoginActionTypes,
  Tabs
} from './types';

export function setList(listName: Tabs) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: CHANGE_LIST,
      listName: listName
    });
    if (listName === 'DateDeadline') return getList(dispatch, GetOrdersDeadline);
    if (listName === 'DateStartWork') return getList(dispatch, GetOrdersStartWork);
    if (listName === 'NotPayed') return getList(dispatch, GetNotPayedOrders);
  };
}

export function updateDate(order: iOrder) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: UPDATE_DATE_REQUEST,
      isPending: true
    });
    UpdateOrder(order)
      .then(response => {
        dispatch({
          type: UPDATE_DATE_SUCCESS,
          isPending: false,
          currentOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: UPDATE_DATE_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function addExpense(expense: iExpense) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: PUT_EXPENSE_REQUEST,
      isPending: true
    });
    return PostExpense(expense)
      .then(response => {
        dispatch({
          type: PUT_EXPENSE_SUCCESS,
          isPending: false,
          expense: response.data.expense
        });
      })
      .catch(response => {
        dispatch({
          type: PUT_EXPENSE_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function addNote(note: iNote) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    debugger;
    dispatch({
      type: PUT_NOTE_REQUEST,
      isPending: true
    });
    return PostNote(note)
      .then(response => {
        dispatch({
          type: PUT_NOTE_SUCCESS,
          isPending: false,
          note: response.data.note
        });
      })
      .catch(response => {
        dispatch({
          type: PUT_NOTE_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

function getList(dispatch: Dispatch<LoginActionTypes>, request: () => Promise<AxiosResponse<any>>) {
  if (cancel) cancel('cancelled');
  dispatch({
    type: GET_ORDERS_REQUEST,
    isPending: true,
    list: []
  });
  request()
    .then(response => {
      dispatch({
        type: GET_ORDERS_SUCCESS,
        isPending: false,
        list: response.data
      });
    })
    .catch(response => {
      dispatch({
        type: GET_ORDERS_FAIL,
        isPending: false,
        error: true,
        errorMessage: response.message
      });
    });
}
