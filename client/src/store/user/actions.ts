import { Dispatch } from "redux";
import { VKLogin } from "../../helpers/VK.API/index";
import { Register, Login } from "../../helpers/API/Methods";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LoginActionTypes
} from "./types";

export function submitRegister(email: string, password: string, username: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: REGISTER_REQUEST,
      isPending: true
    });
    Register({ email, password, username }).then(
      response => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({
          type: REGISTER_SUCCESS,
          isPending: false,
          password: undefined,
          ...response.data.user
        });
      },
      response => {
        dispatch({
          type: REGISTER_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.response.data.message
        });
      }
    );
  };
}

export function submitLogin(email: string, password: string) {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      isPending: true
    });
    Login({ email, password }).then(
      response => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({
          type: LOGIN_SUCCESS,
          isPending: false,
          password: undefined,
          ...response.data.user
        });
      },
      response => {
        dispatch({
          type: LOGIN_FAIL,
          isPending: false,
          error: true,
          errorMessage: response.response.data.message
        });
      }
    );
  };
}

export function submitLoginVK() {
  return function(dispatch: Dispatch<LoginActionTypes>) {
    dispatch({
      type: LOGIN_REQUEST,
      isPending: true
    });
    VKLogin((r: any) => {
      if (r.session) {
        dispatch({
          type: LOGIN_SUCCESS,
          isPending: false,
          password: undefined,
          ...r.session.data.user
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          isPending: false,
          error: true,
          errorMessage: r.session.response.data.message
        });
      }
    });
  };
}

export function logout() {
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
    password: undefined,
    email: undefined,
    username: undefined,
    isPending: undefined,
    error: undefined,
    token: undefined
  };
}
