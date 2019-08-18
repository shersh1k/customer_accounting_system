import { Dispatch } from 'redux';
import { UpdateOrder, GetOrder, PostNote, PostExpense } from '../../helpers/API/Methods';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  PUT_NOTE_REQUEST,
  PUT_NOTE_SUCCESS,
  PUT_NOTE_FAIL,
  PUT_EXPENSE_REQUEST,
  PUT_EXPENSE_SUCCESS,
  PUT_EXPENSE_FAIL,
  SET_ORDER_READ_MODE,
  SET_ORDER_EDIT_MODE,
  HANDLE_CHANGE,
  LoginActionTypes,
  iOrder,
  iNote,
  iExpense
} from './types';

export function setEditState() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: SET_ORDER_EDIT_MODE,
      isEdit: true
    });
  };
}

export function cancelEditState() {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: SET_ORDER_READ_MODE,
      isEdit: false
    });
  };
}

export function handleChange(field: keyof iOrder, value: any) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: HANDLE_CHANGE,
      editedOrder: {
        [field]: value
      }
    });
  };
}

export function getOrder(slug: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: GET_ORDER_REQUEST,
      isPending: true
    });
    return GetOrder(slug)
      .then(response => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          isPending: false,
          order: response.data,
          editedOrder: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: GET_ORDER_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.message
        });
      });
  };
}

export function updateOrder(order: iOrder) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: PUT_ORDER_REQUEST,
      isPending: true
    });
    return UpdateOrder(order)
      .then(response => {
        dispatch({
          type: PUT_ORDER_SUCCESS,
          isPending: false,
          order: response.data,
          editedOrder: response.data
        });
        dispatch({
          type: SET_ORDER_READ_MODE,
          isEdit: false
        });
      })
      .catch(response => {
        dispatch({
          type: PUT_ORDER_FAIL,
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
