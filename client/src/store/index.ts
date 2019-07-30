import { createBrowserHistory, History } from "history";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerMiddleware, RouterState } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter } from "connected-react-router";
import { photosReducer } from "./photos/reducers";
import { friendsReducer } from "./friends/reducers";
import { userReducer } from "./user/reducers";
import { counterReducer } from "./counter/reducers";

export const history = createBrowserHistory();

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    photos: photosReducer,
    friends: friendsReducer,
    user: userReducer
  });

function configureStore() {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middleWareEnhancer = applyMiddleware(...middlewares, logger);
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(middleWareEnhancer)
  );
  return store;
}
export interface State {
  counter: any;
  user: any;
  photos: any;
  friends: any;
  router: RouterState;
}

export const store = configureStore();
