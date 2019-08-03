import axios from "axios";
import { store } from "../../store";

export enum HTTP {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}
export default function API(http: HTTP, url: string, data: any, auth: boolean = false) {
  /* может потом имеет смысл много интерфейсов пихнуть в data */
  if (auth) return Authorized(http, url, data);
  else return Guest(http, url, data);
}

function Authorized(http: HTTP, url: string, data: any) {
  const token = store.getState().user.token;
  const headers = { headers: { Authorization: `Token ${token}` } };
  if (!token) throw new Error("Войдите под своим именем пожалуйста или зарегистрируйтесь");
  switch (http) {
    case HTTP.GET:
      return axios.get(url, headers);
    case HTTP.POST:
      return axios.post(url, data, headers);
    case HTTP.PUT:
      return axios.put(url, data, headers);
    case HTTP.DELETE:
      return axios.delete(url, headers);
    default:
      throw new Error("Использован неизвестный HTTP метод");
  }
}

function Guest(http: HTTP, url: string, data: any) {
  switch (http) {
    case HTTP.GET:
      return axios.get(url);
    case HTTP.POST:
      return axios.post(url, data);
    case HTTP.PUT:
      return axios.put(url, data);
    case HTTP.DELETE:
      return axios.delete(url);
    default:
      throw new Error("Использован неизвестный HTTP метод");
  }
}
