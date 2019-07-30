import { COUNTER_DECREMENT, COUNTER_INCREMENT } from "./types";

export function increment() {
  return function(dispatch: any) {
    dispatch({
      type: COUNTER_INCREMENT,
      payload: "year"
    });
  };
}
export function decrement() {
  return function(dispatch: any) {
    dispatch({
      type: COUNTER_DECREMENT,
      payload: "year"
    });
  };
}
