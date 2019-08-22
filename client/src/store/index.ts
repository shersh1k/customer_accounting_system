import { routerMiddleware, RouterState, connectRouter } from 'connected-react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, History } from 'history';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import { userReducer } from './user/reducers';
import { UserState } from './user/types';
import { orderListsReducer } from './orderLists/reducers';
import { OrderListsState } from './orderLists/types';
import { orderReducer } from './order/reducers';
import { OrderState } from './order/types';
import { newOrderReducer } from './newOrder/reducers';
import { NewOrderState } from './newOrder/types';
import { archiveReducer } from './archive/reducers';
import { ArchiveState } from './archive/types';
import { calendarReducer } from './calendar/reducers';
import { CalendarState } from './calendar/types';
import { statsReducer } from './stats/reducers';
import { StatsState } from './stats/types';

export const history = createBrowserHistory();

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    newOrder: newOrderReducer,
    orderLists: orderListsReducer,
    archive: archiveReducer,
    calendar: calendarReducer,
    stats: statsReducer,
    order: orderReducer
  });

function configureStore() {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middleWareEnhancer = applyMiddleware(...middlewares, logger);
  const store = createStore(rootReducer(history), composeWithDevTools(middleWareEnhancer));
  return store;
}

export const store = configureStore();

export interface State {
  router: RouterState;
  user: UserState;
  orderLists: OrderListsState;
  order: OrderState;
  newOrder: NewOrderState;
  archive: ArchiveState;
  calendar: CalendarState;
  stats: StatsState;
}
