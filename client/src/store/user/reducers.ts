import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UserState,
  REGISTER_EMAIL_CHANGE,
  REGISTER_NAME_CHANGE,
  REGISTER_PASSWORD_CHANGE,
  REGISTER_SUBMIT_REQUEST,
  LoginActionTypes,
  REGISTER_SUBMIT_SUCCESS,
  REGISTER_SUBMIT_FAIL,
  LOGOUT
} from "./types";

let user: UserState = {};
let userString = localStorage.getItem("user");
if (userString) user = JSON.parse(userString);

const initialState: UserState = user;

export function userReducer(state = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case REGISTER_EMAIL_CHANGE:
      return { ...state, email: action.email };
    case REGISTER_NAME_CHANGE:
      return { ...state, username: action.username };
    case REGISTER_PASSWORD_CHANGE:
      return { ...state, password: action.password };

    case REGISTER_SUBMIT_REQUEST:
      return { ...state, ...action };
    case REGISTER_SUBMIT_SUCCESS:
      return { ...state, ...action };
    case REGISTER_SUBMIT_FAIL:
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
