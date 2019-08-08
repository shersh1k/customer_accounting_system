import axios, { Canceler } from "axios";
import { store } from "../../store";

export let cancel: Canceler;

export enum HTTP {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}
export default function API(http: HTTP, url: string, auth: boolean = false, data?: any) {
  /* может потом имеет смысл много интерфейсов пихнуть в data */
  if (auth) return Authorized(http, url, data);
  else return Guest(http, url, data);
}

function Authorized(http: HTTP, url: string, data: any) {
  const token = store.getState().user.token;
  const options = {
    headers: {
      Authorization: `Token ${token}`
    },
    cancelToken: new axios.CancelToken(function executor(canceler) {
      cancel = canceler;
    })
  };
  if (!token) throw new Error("Войдите под своим именем пожалуйста или зарегистрируйтесь");
  switch (http) {
    case HTTP.GET:
      return axios.get(url, options);
    case HTTP.POST:
      return axios.post(url, data, options);
    case HTTP.PUT:
      return axios.put(url, data, options);
    case HTTP.DELETE:
      return axios.delete(url, options);
    default:
      throw new Error("Использован неизвестный HTTP метод");
  }
}

function Guest(http: HTTP, url: string, data: any) {
  const options = {
    cancelToken: new axios.CancelToken(function executor(canceler) {
      cancel = canceler;
    })
  };
  switch (http) {
    case HTTP.GET:
      return axios.get(url, options);
    case HTTP.POST:
      return axios.post(url, data, options);
    case HTTP.PUT:
      return axios.put(url, data, options);
    case HTTP.DELETE:
      return axios.delete(url, options);
    default:
      throw new Error("Использован неизвестный HTTP метод");
  }
}
