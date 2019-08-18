import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { History } from 'history';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

import { State } from '../store';

import NavBar from '../components/NavBar';
import OrderLists from './OrderLists';
import NoMatch from '../components/NoMatch';
import Login from './Login/Login';
import Order from './Order';

import app from '../style/App.module.scss';
import NewOrder from './Order/NewOrder';
import Archive from './Archive';
import ReadMe from '../components/Readme';

interface iProps {
  history: History;
  user: any;
}

interface iUser {
  name: string;
  email: string;
  token: string;
}

class App extends React.Component<iProps> {
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
        <div className={app.appRoot}>
          {user.token && <NavBar className={app.navbar} />}
          <div className={app.content}>
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
          </div>
        </div>
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
