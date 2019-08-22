import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  StatsState,
  LoginActionTypes
} from './types';

export const initStateArchiveReducer: StatsState = {
  data: [],
  isPending: false,
  error: false
};

export function statsReducer(state = initStateArchiveReducer, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { ...state, ...action };
    case GET_ALL_ORDERS_SUCCESS:
      return { ...state, ...action };
    case GET_ALL_ORDERS_FAIL:
      if (action.errorMessage === 'cancelled') action.isPending = true;
      return { ...state, ...action };

    default:
      return state;
  }
}
