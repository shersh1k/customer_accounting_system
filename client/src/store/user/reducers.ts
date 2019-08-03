import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  UserState,
  LoginActionTypes
} from "./types";

let user: UserState = {};
let userString = localStorage.getItem("user");
if (userString) user = JSON.parse(userString);

const initialState: UserState = user;

export function userReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, ...action };
    case REGISTER_SUCCESS:
      return { ...state, ...action };
    case REGISTER_FAIL:
      return { ...state, ...action };

    case LOGIN_REQUEST:
      return { ...state, ...action };
    case LOGIN_SUCCESS:
      return { ...state, ...action };
    case LOGIN_FAIL:
      return { ...state, ...action };

    case LOGOUT:
      return { ...state, ...action };

    default:
      return state;
  }
}
