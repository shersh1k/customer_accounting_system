export const REGISTER_PASSWORD_CHANGE = "REGISTER_PASSWORD_CHANGE";
export const REGISTER_EMAIL_CHANGE = "REGISTER_EMAIL_CHANGE";
export const REGISTER_NAME_CHANGE = "REGISTER_NAME_CHANGE";
export const REGISTER_SUBMIT_REQUEST = "REGISTER_SUBMIT_REQUEST";
export const REGISTER_SUBMIT_SUCCESS = "REGISTER_SUBMIT_SUCCESS";
export const REGISTER_SUBMIT_FAIL = "REGISTER_SUBMIT_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export interface UserState {
  password?: string;
  email?: string;
  username?: string;
  isFetching?: boolean;
  error?: boolean;
}
interface PasswordChange {
  type: typeof REGISTER_PASSWORD_CHANGE;
  password: string;
}
interface EmailChange {
  type: typeof REGISTER_EMAIL_CHANGE;
  email: string;
}
interface NameChange {
  type: typeof REGISTER_NAME_CHANGE;
  username: string;
}
interface SubmitRegisterRequest {
  type: typeof REGISTER_SUBMIT_REQUEST;
  isFetching: boolean;
}
interface SubmitRegisterSuccess {
  type: typeof REGISTER_SUBMIT_SUCCESS;
  user: UserState;
  isFetching: boolean;
  password: undefined;
}

interface SubmitRegisterFail {
  type: typeof REGISTER_SUBMIT_FAIL;
  error: boolean;
  isFetching: boolean;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  isFetching: boolean;
}
interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  user: UserState;
  isFetching: boolean;
  password: undefined;
}
interface LoginFail {
  type: typeof LOGIN_FAIL;
  error: boolean;
  isFetching: boolean;
}

interface Logout {
  type: typeof LOGOUT;
  password: undefined;
  email: undefined;
  username: undefined;
  isFetching: undefined;
  error: undefined;
  token: undefined;
}

export type LoginActionTypes =
  | PasswordChange
  | EmailChange
  | NameChange
  | SubmitRegisterRequest
  | SubmitRegisterSuccess
  | SubmitRegisterFail
  | LoginRequest
  | LoginFail
  | LoginSuccess
  | Logout;
