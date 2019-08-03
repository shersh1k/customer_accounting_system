import { Dispatch } from "redux";
import { VKLogin } from "../../helpers/VK.API/index";
import { Register, Login } from "../../helpers/API/Login";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_EMAIL_CHANGE,
  REGISTER_NAME_CHANGE,
  REGISTER_PASSWORD_CHANGE,
  REGISTER_SUBMIT_REQUEST,
  REGISTER_SUBMIT_SUCCESS,
  REGISTER_SUBMIT_FAIL,
  LOGOUT
} from "./types";

export function emailChange(value: string) {
  return {
    type: REGISTER_EMAIL_CHANGE,
    email: value
  };
}

export function nameChange(value: string) {
  return {
    type: REGISTER_NAME_CHANGE,
    name: value
  };
}

export function passwordChange(value: string) {
  return {
    type: REGISTER_PASSWORD_CHANGE,
    password: value
  };
}

export function logout() {
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
    password: undefined,
    email: undefined,
    username: undefined,
    isFetching: undefined,
    error: undefined,
    token: undefined
  };
}

export function submitRegister(email: string, password: string, username: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REGISTER_SUBMIT_REQUEST,
      isFetching: true
    });
    Register({ email, password, username }).then(
      response => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({
          type: REGISTER_SUBMIT_SUCCESS,
          isFetching: false,
          password: undefined,
          ...response.data.user
        });
      },
      response => {
        dispatch({
          type: REGISTER_SUBMIT_FAIL,
          isFetching: false,
          error: true
        });
      }
    );
  };
}

export function submitLogin(email: string, password: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      isFetching: true
    });
    Login({ email, password }).then(
      response => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({
          type: LOGIN_SUCCESS,
          isFetching: false,
          password: undefined,
          ...response.data.user
        });
      },
      response => {
        dispatch({
          type: LOGIN_FAIL,
          isFetching: false,
          error: true
        });
      }
    );
  };
}

export function submitLoginVK() {
  return function(dispatch: Dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
      isFetching: true
    });
    VKLogin((r: any) => {
      if (r.session) {
        let username = r.session.user.first_name;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: username
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error("Ошибка авторизации")
        });
      }
    });
  };
}
