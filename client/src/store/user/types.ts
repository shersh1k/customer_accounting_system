export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export interface UserState {
  password?: string;
  email?: string;
  username?: string;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
  token?: string;
}
interface SubmitRegisterRequest {
  type: typeof REGISTER_REQUEST;
  isPending: boolean;
}
interface SubmitRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  user: UserState;
  isPending: boolean;
  password: undefined;
}

interface SubmitRegisterFail {
  type: typeof REGISTER_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  isPending: boolean;
}
interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  user: UserState;
  isPending: boolean;
  password: undefined;
}
interface LoginFail {
  type: typeof LOGIN_FAIL;
  isPending: boolean;
  error: boolean;
  errorMessage: string;
}

interface Logout {
  type: typeof LOGOUT;
  password: undefined;
  email: undefined;
  username: undefined;
  isPending: false;
  error: false;
  token: undefined;
}

export type LoginActionTypes =
  | SubmitRegisterRequest
  | SubmitRegisterSuccess
  | SubmitRegisterFail
  | LoginRequest
  | LoginFail
  | LoginSuccess
  | Logout;

export interface iUser {
  email: string;
  password: string;
  username?: string;
}
