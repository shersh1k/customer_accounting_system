import API, { HTTP } from ".";
import { UserState } from "../../store/user/types";

export function Register(data: UserState) {
  return API(HTTP.POST, "/api/users", false, { user: { ...data } });
}

export function Login(data: UserState) {
  return API(HTTP.POST, "/api/users/login", false, { user: { ...data } });
}

export function postOrder(data: any) {
  return API(HTTP.POST, "/api/orders", true, { order: { ...data } });
}
