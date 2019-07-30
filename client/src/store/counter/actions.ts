import { Message, SEND_MESSAGE, DELETE_MESSAGE } from "./types";

export function sendMessage(newMessage: Message) {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  };
}

export function deleteMessage(timestamp: number) {
  return {
    type: DELETE_MESSAGE,
    meta: {
      timestamp
    }
  };
}
// export const increment = (/* accessToken: string */): incrementType => {
//   return { type: "COUNTER_INCREMENT" };
// };
// export const decrement = (/* isFetching: boolean */): decrementType => {
//   return { type: "COUNTER_DECREMENT" };
// };

/* 
export function increment(): ThunkAction<{}, {}, {}, any> {
  return function(dispatch: ThunkDispatch) {
    dispatch({
      type: COUNTER_INCREMENT,
      payload: "increment"
    });
  };
}
export function decrement() {
  return function(dispatch: any) {
    dispatch({
      type: COUNTER_DECREMENT,
      payload: "decrement"
    });
  };
}
 */
