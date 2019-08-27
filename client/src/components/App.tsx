import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { History } from 'history';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { Container } from '@material-ui/core';

import { State } from '../store';

import Navigation from './Navigation';
import OrderLists from './OrderLists';
import NoMatch from './NoMatch';
import Login from './Login';
import Order from './Order';
import Calendar from './Calendar';
import Stats from './Stats';

import NewOrder from './Order/NewOrder';
import Archive from './Archive';
import ReadMe from './Readme';
import { AppStyles } from '../styles/AppBarStyles';
import SideMenu from './Navigation/SideMenu';
import { Hidden } from '@material-ui/core';

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
  const classes = AppStyles();
  return (
    <ConnectedRouter history={props.history}>
      {token && <Navigation />}
      <div className={classes.mainWrapper}>
        <Container maxWidth='lg'>
          <main className={classes.main}>
            <div className={classes.menuDesktop}>
              {token && (
                <Hidden mdDown>
                  <SideMenu />
                </Hidden>
              )}
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <Switch>
                {!token && <Route path='/' render={redirectToLogin} />}
                <Route exact path='/' component={OrderLists} />
                <Route path='/login' render={redirectToMain(token)} />
                <Route path='/archive' component={Archive} />
                <Route path='/calendar' component={Calendar} />
                <Route path='/stats' component={Stats} />
                <Route path='/readme' component={ReadMe} />
                <Route path='/neworder' component={NewOrder} />
                <Route path='/orders/:order' component={Order} />
                <Route component={NoMatch} />
              </Switch>
            </MuiPickersUtilsProvider>
          </main>
        </Container>
      </div>
    </ConnectedRouter>
  );
}
