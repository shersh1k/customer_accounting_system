import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PUT_ORDER_REQUEST,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
  SET_ORDER_READ_MODE,
  SET_ORDER_EDIT_MODE,
  HANDLE_CHANGE_NEW,
  OrderState,
  LoginActionTypes
} from "./types";

function increaseDate(date: Date, number: number) {
  return new Date(date.setDate(date.getDate() + number));
}

const initialState: OrderState = {
  order: {},
  editedOrder: {},
  newOrder: {
    title: "",
    description: "",
    dateOrder: new Date(),
    dateDeadline: increaseDate(new Date(), 5),
    priceOrder: 0,
    priceMaterials: 0
  },
  isEdit: false,
  isPending: false,
  error: false,
  errorMessage: "cancelled"
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

    case POST_ORDER_REQUEST:
      return { ...state, ...action };
    case POST_ORDER_SUCCESS:
      return { ...state, ...action };
    case POST_ORDER_FAIL:
      return { ...state, ...action };

    case SET_ORDER_EDIT_MODE:
      return { ...state, ...action };
    case SET_ORDER_READ_MODE:
      return { ...state, ...action };

    case HANDLE_CHANGE_NEW:
      return { ...state, newOrder: Object.assign({}, state.newOrder, action.newOrder) };
    default:
      return state;
  }
}
