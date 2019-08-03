import axios from "axios";
import { UserState } from "../../store/user/types";

export function Register(data: UserState) {
  return axios.post("/api/users", { user: { ...data } });
}

export function Login(data: any) {
  return axios.post("/api/users/login", { user: { ...data } });
}

/*
export function User() {
  return axios.post("/api/users/login", { headers: { Authorization: `Token ${token}` } });
}
*/
