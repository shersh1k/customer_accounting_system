import API, { HTTP } from '.';
import { iUser } from '../../store/user/types';
import { iOrder, iNote, iExpense } from '../../store/order/types';
import { iNewOrder } from '../../store/newOrder/types';
import { Interval } from '../../store/calendar/types';
import { iGenerateParams } from '../../components/Generator';

export function Generate(params: iGenerateParams) {
  const fromDate = params.fromDate ? params.fromDate.toString() : new Date(2018, 0, 1).toString();
  const toDate = params.toDate ? params.toDate.toString() : new Date(2020, 0, 1).toString();
  return API(HTTP.GET, `/generate?fromDate=${fromDate}&toDate=${toDate}&count=${params.count}`, true);
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

export function GetOrdersByRange(range: Interval) {
  return API(HTTP.GET, `/api/orders/byRange?from=${range.start.toString()}&to=${range.end.toString()}`, true);
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

export function PostNote(data: iNote) {
  return API(HTTP.POST, '/api/notes', true, { note: { ...data } });
}

export function PostExpense(data: iExpense) {
  return API(HTTP.POST, '/api/expenses', true, { expense: { ...data } });
}
