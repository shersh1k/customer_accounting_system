import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  HANDLE_CHANGE_NEW,
  NewOrderState,
  LoginActionTypes,
  iNewOrder
} from './types';

function increaseDate(date: Date, number: number) {
  return new Date(date.setDate(date.getDate() + number));
}

const cleanOrder: iNewOrder = {
  title: '',
  description: '',
  dateOrder: new Date(),
  dateDeadline: increaseDate(new Date(), 5),
  priceOrder: 0,
  priceMaterials: 0
};

const initialState: NewOrderState = {
  newOrder: cleanOrder,
  list: [],
  isPending: false,
  error: false,
  errorMessage: ''
};

export function newOrderReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return { ...state, ...action };
    case POST_ORDER_SUCCESS:
      const list = state.list.slice();
      list.unshift(action.order);
      return { ...state, list: list, isPending: action.isPending, type: action.type, newOrder: cleanOrder };
    case POST_ORDER_FAIL:
      return { ...state, ...action };

    case GET_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_ORDERS_FAIL:
      return { ...state, ...action };

    case HANDLE_CHANGE_NEW:
      return { ...state, newOrder: Object.assign({}, state.newOrder, action.newOrder) };
    default:
      return state;
  }
}
