import React from "react";
import { connect } from "react-redux";
import { getPhotos } from "../store/photos/actions";
import { getFriends } from "../store/friends/actions";
import { handleLogin } from "../store/user/actions";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { State } from "../store";
import NavBar from "../components/NavBar";
import { Switch, Route } from "react-router";
import Home from "../components/Home";
import Hello from "../components/Hello";
import Counter from "../components/Counter";
import NoMatch from "../components/NoMatch";
import app from "../style/App.module.scss";
interface iProps {
  history: History;
}

const mapStateToProps = (store: State) => {
  return {
    user: store.user,
    photos: store.photos,
    friends: store.friends
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getPhotosAction: (year: number) => dispatch(getPhotos(year)),
  handleLoginAction: () => dispatch(handleLogin()),
  getFriendsAction: () => dispatch(getFriends())
});

class App extends React.Component<iProps> {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className={app.appRoot}>
          <NavBar className={app.navbar} />
          <div className={app.content}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/hello" component={Hello} />
              <Route path="/counter" component={Counter} count={1} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
