import { ChatState, SEND_MESSAGE, DELETE_MESSAGE, ChatActionTypes } from "./types";

const initialState: ChatState = {
  messages: []
};

export function chatReducer(state = initialState, action: ChatActionTypes): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      };
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(message => message.timestamp !== action.meta.timestamp)
      };
    default:
      return state;
  }
}

/* import { incrementType, decrementType } from "./types";

const initialState = {
  count: 0
};

export function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case "COUNTER_DECREMENT":
      return { ...state, count: state.count - 1 };
    case "COUNTER_INCREMENT":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
 */
