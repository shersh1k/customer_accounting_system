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
  OrderState,
  LoginActionTypes
} from './types';

const initialState: OrderState = {
  order: null,
  editedOrder: null,
  isEdit: false,
  isPending: false,
  error: false,
  errorMessage: ''
};

export function orderReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, ...action };
    case GET_ORDER_SUCCESS:
      return { ...state, ...action };
    case GET_ORDER_FAIL:
      return { ...state, ...action };

    case PUT_ORDER_REQUEST:
      return { ...state, ...action };
    case PUT_ORDER_SUCCESS:
      return { ...state, ...action };
    case PUT_ORDER_FAIL:
      return { ...state, ...action };

    case PUT_NOTE_REQUEST:
      return { ...state, ...action };
    case PUT_NOTE_SUCCESS: {
      const order = Object.assign({}, state.order);
      order.notes.push(action.note);
      return { ...state, ...action };
    }
    case PUT_NOTE_FAIL:
      return { ...state, ...action };

    case PUT_EXPENSE_REQUEST:
      return { ...state, ...action };
    case PUT_EXPENSE_SUCCESS: {
      const order = Object.assign({}, state.order);
      order.expenses.push(action.expense);
      return { ...state, ...action };
    }
    case PUT_EXPENSE_FAIL:
      return { ...state, ...action };

    case SET_ORDER_EDIT_MODE:
      return { ...state, ...action };
    case SET_ORDER_READ_MODE:
      return { ...state, isEdit: action.isEdit, editedOrder: state.order };

    case HANDLE_CHANGE:
      return { ...state, editedOrder: Object.assign({}, state.editedOrder, action.editedOrder) };
    default:
      return state;
  }
}
