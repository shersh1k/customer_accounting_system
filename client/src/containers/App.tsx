import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import { History } from "history";

import { State } from "../store";

import NavBar from "../components/NavBar";
import Orders from "./Order/Orders";
import NoMatch from "../components/NoMatch";
import Login from './Login/Login';

import app from "../style/App.module.scss";
import NewOrder from './Order/NewOrder';

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
      <Redirect to="/login" />
      <Login />
    </>
  )

  redirectToMain = () => {
    if (!this.props.user.token) return (<Login />)
    else return (<Redirect to="/" />)
  }

  render() {
    const { user, history } = this.props
    return (
      <ConnectedRouter history={history}>
        <div className={app.appRoot}>
          {user.token && <NavBar className={app.navbar} />}
          <div className={app.content}>
            <Switch>
              {!user.token && <Route path="/" render={this.redirectToLogin} />}
              <Route exact path="/" component={Orders} />
              <Route path="/login" render={this.redirectToMain} />
              <Route path="/orders/neworder" component={NewOrder} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (store: State) => ({
  user: store.user
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
