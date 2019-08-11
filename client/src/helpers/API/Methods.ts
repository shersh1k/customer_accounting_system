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

export function API_UpdateOrder(data: iOrder) {
  return API(HTTP.PUT, "/api/orders", true, { order: { ...data } });
}

export function API_GetOrdersByDateStartWork() {
  return API(HTTP.GET, "/api/orders/byDateStartWork", true);
}

export function API_GetOrdersByDateFinishWork() {
  return API(HTTP.GET, "/api/orders/byDateDeadline", true);
}

export function API_GetNotPayedOrders() {
  return API(HTTP.GET, "/api/orders/notPayed", true);
}

export function API_GetLastTenOrders() {
  return API(HTTP.GET, "/api/orders/lastTen", true);
}

export function API_GetAllOrders() {
  return API(HTTP.GET, "/api/orders", true);
}

export function API_GetOrder(slug: string) {
  return API(HTTP.GET, `/api/orders/${slug}`, true);
}
