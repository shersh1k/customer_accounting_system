import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect, useSelector } from 'react-redux';
import { History } from 'history';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

import { State } from '../store';

import Navigation from './Navigation';
import OrderLists from './OrderLists';
import NoMatch from './NoMatch';
import Login from './Login/Login';
import Order from './Order';

import NewOrder from './Order/NewOrder';
import Archive from './Archive';
import ReadMe from './Readme';
import { PermanentDrawerStyles } from '../styles/AppBarStyles';

interface iProps {
  history: History;
}
const redirectToMain = (token?: string) => () => (token ? <Redirect to='/' /> : <Login />);
const redirectToLogin = () => (
  <>
    <Redirect to='/login' />
    <Login />
  </>
);

export default function App(props: iProps) {
  const token = useSelector((state: State) => state.user.token);
  const classes = PermanentDrawerStyles();
  return (
    <ConnectedRouter history={props.history}>
      {token && <Navigation />}
      <main className={classes.content}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <Switch>
            {!token && <Route path='/' render={redirectToLogin} />}
            <Route exact path='/' component={OrderLists} />
            <Route path='/login' render={redirectToMain(token)} />
            <Route path='/archive' component={Archive} />
            <Route path='/calendar' render={() => <span>В процессе реализации</span>} />
            <Route path='/stats' render={() => <span>В процессе реализации</span>} />
            <Route path='/readme' component={ReadMe} />
            <Route path='/orders/neworder' component={NewOrder} />
            <Route path='/orders/:order' component={Order} />
            <Route component={NoMatch} />
          </Switch>
        </MuiPickersUtilsProvider>
      </main>
    </ConnectedRouter>
  );
}
