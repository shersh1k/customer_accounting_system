import { routerMiddleware, RouterState, connectRouter } from "connected-react-router";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory, History } from "history";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

// import { photosReducer } from "./photos/reducers";
// import { friendsReducer } from "./friends/reducers";
import { userReducer } from "./user/reducers";
import { orderListsReducer } from "./orderLists/reducers";
import { orderReducer } from "./order/reducers";

import { UserState } from "./user/types";
import { OrderListsState } from "./orderLists/types";
import { OrderState } from "./order/types";

export const history = createBrowserHistory();

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    order: orderReducer,
    orderLists: orderListsReducer
    // photos: photosReducer,
    // friends: friendsReducer
  });

function configureStore() {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middleWareEnhancer = applyMiddleware(...middlewares, logger);
  const store = createStore(rootReducer(history), composeWithDevTools(middleWareEnhancer));
  return store;
}
export interface State {
  router: RouterState;
  user: UserState;
  orderLists: OrderListsState;
  order: OrderState;
  // photos: any;
  // friends: any;
}

export const store = configureStore();
