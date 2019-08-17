import API, { HTTP } from '.';
import { iUser } from '../../store/user/types';
import { iOrder } from '../../store/order/types';
import { iNewOrder } from '../../store/newOrder/types';

export function Generate() {
  return API(HTTP.GET, '/generate', true);
}

export function Register(data: iUser) {
  return API(HTTP.POST, '/api/users', false, { user: { ...data } });
}

export function Login(data: iUser) {
  return API(HTTP.POST, '/api/users/login', false, { user: { ...data } });
}

export function GetOrdersStartWork() {
  return API(HTTP.GET, '/api/orders/byDateStartWork', true);
}

export function GetOrdersDeadline() {
  return API(HTTP.GET, '/api/orders/byDateDeadline', true);
}

export function GetNotPayedOrders() {
  return API(HTTP.GET, '/api/orders/notPayed', true);
}

export function GetLastTenOrders() {
  return API(HTTP.GET, '/api/orders/lastTen', true);
}

export function GetAllOrders() {
  return API(HTTP.GET, '/api/orders', true);
}

export function GetOrder(slug: string) {
  return API(HTTP.GET, `/api/orders/${slug}`, true);
}

export function PostOrder(data: iNewOrder) {
  return API(HTTP.POST, '/api/orders', true, { order: { ...data } });
}

export function UpdateOrder(data: iOrder) {
  return API(HTTP.PUT, '/api/orders', true, { order: { ...data } });
}
