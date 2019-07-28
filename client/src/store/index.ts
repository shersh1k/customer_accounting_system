import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger'
import { composeWithDevTools } from "redux-devtools-extension";

import { photosReducer } from "./photos/reducers";
import { friendsReducer } from "./friends/reducers";
import { userReducer } from "./user/reducers";

const rootReducer = combineReducers({
  photos: photosReducer,
  friends: friendsReducer,
  user: userReducer
});
// export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares, logger);
  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}