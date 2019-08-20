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

export default function App(props: iProps) {
  const user = useSelector((state: State) => state.user);
  const classes = PermanentDrawerStyles();
  return (
    <ConnectedRouter history={props.history}>
      {user.token && <Navigation />}
      <main className={classes.content}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <Switch>
            {!user.token && <Route path='/' render={redirectToLogin} />}
            <Route exact path='/' component={OrderLists} />
            <Route path='/login' render={redirectToMain} />
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

const redirectToLogin = () => (
  <>
    <Redirect to='/login' />
    <Login />
  </>
);

const redirectToMain = (user: any) => {
  if (!user.token) return <Login />;
  else return <Redirect to='/' />;
};

/* class App extends React.Component<iProps> {
  redirectToLogin = () => (
    <>
      <Redirect to='/login' />
      <Login />
    </>
  );

  redirectToMain = () => {
    if (!this.props.user.token) return <Login />;
    else return <Redirect to='/' />;
  };

  render() {
    const { user, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        {user.token && <Navigation />}
        <main>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <Switch>
              {!user.token && <Route path='/' render={this.redirectToLogin} />}
              <Route exact path='/' component={OrderLists} />
              <Route path='/login' render={this.redirectToMain} />
              <Route path='/archive' component={Archive} />
              <Route path='/calendar' render={() => <span>В процессе реализации :)</span>} />
              <Route path='/stats' render={() => <span>В процессе реализации :)</span>} />
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
}

const mapStateToProps = (store: State) => ({
  user: store.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
 */
