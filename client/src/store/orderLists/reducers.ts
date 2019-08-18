import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  UPDATE_DATE_REQUEST,
  UPDATE_DATE_SUCCESS,
  UPDATE_DATE_FAIL,
  CHANGE_LIST,
  OrderListsState,
  LoginActionTypes
} from './types';

const initialState: OrderListsState = {
  list: [],
  listName: 'DateDeadline',
  isPending: false,
  error: false,
  errorMessage: ''
};

export function orderListsReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_ORDERS_FAIL:
      if (action.errorMessage === 'cancelled') action.isPending = true;
      return { ...state, ...action };

    case UPDATE_DATE_REQUEST:
      return { ...state, ...action };
    case UPDATE_DATE_SUCCESS:
      const list = state.list.filter(order => order.id !== action.currentOrder.id);
      return { ...state, ...action, list };
    case UPDATE_DATE_FAIL:
      return { ...state, ...action };

    case CHANGE_LIST:
      return { ...state, ...action };

    default:
      return state;
  }
}
