import API, { HTTP } from ".";
import { iUser } from "../../store/user/types";
import { iOrder } from "../../store/orders/types";

export function API_Register(data: iUser) {
  return API(HTTP.POST, "/api/users", false, { user: { ...data } });
}

export function API_Login(data: iUser) {
  return API(HTTP.POST, "/api/users/login", false, { user: { ...data } });
}

export function API_PostOrder(data: iOrder) {
  return API(HTTP.POST, "/api/orders", true, { order: { ...data } });
}

export function API_GetOrders() {
  return API(HTTP.GET, "/api/orders", true);
}
