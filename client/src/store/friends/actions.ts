import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAIL
} from "./types";
import { VKGetFriends } from "../../VK.API";

export function getFriends() {
  return (dispatch: Function) => {
    dispatch({
      type: GET_FRIENDS_REQUEST,
      payload: "year"
    });
    try {
      VKGetFriends((friends: any[]) => {
        dispatch({
          type: GET_FRIENDS_SUCCESS,
          payload: friends
        });
      });
    } catch (e) {
      dispatch({
        type: GET_FRIENDS_FAIL,
        error: true,
        payload: new Error(e)
      });
    }
  };
}
