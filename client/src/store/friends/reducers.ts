import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAIL
} from "./types";

const initialState = {
  friends: [],
  isFetching: false,
  error: ""
};

export function friendsReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return { ...state, year: action.payload, isFetching: true, error: "" };
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload,
        isFetching: false,
        error: ""
      };
    case GET_FRIENDS_FAIL:
      return { ...state, error: action.payload.message, isFetching: false };
    default:
      return state;
  }
}
