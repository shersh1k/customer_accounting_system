import React from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { User } from "../components/User";
import { Photos } from "../components/Photos";
import { Friends } from "../components/Friends";
import { getPhotos } from "../store/photos/actions";
import { getFriends } from "../store/friends/actions";
import { submitLoginVK } from "../store/user/actions";
import axios from "axios";
// import app from '../style/App.module.scss';

interface iProps {
  user?: any;
  photos?: any;
  friends?: any;
  getPhotosAction: Function;
  handleLoginAction: () => {};
  getFriendsAction: Function;
}

interface iState {
  text: string;
  title: string;
  login: boolean;
}

const mapStateToProps = (store: any) => {
  return {
    user: store.user, // вытащили из стора (из редьюсера user все в переменную thid.props.user)
    photos: store.photos,
    friends: store.friends
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPhotosAction: (year: number) => dispatch(getPhotos(year)),
    // "приклеили" в this.props.handleLoginAction функцию, которая умеет диспатчить handleLogin
    handleLoginAction: () => dispatch(submitLoginVK()),
    getFriendsAction: () => dispatch(getFriends())
  };
};

class App extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      title: "",
      text: "",
      login: false
    };
  }

  async componentDidMount() {
    let data = await axios.get("/notes/5c37c32601bc411280c0c778");
    this.setState({
      title: data.data.title,
      text: data.data.text
    });
  }

  responseGoogleonSuccess = (response: any) => {
    this.setState({ login: true });
  };
  responseGoogleonFailure = (response: any) => { };
  postUser = () => {
    let user = {
      birthDate: new Date(),
      registrationDate: new Date(),
      firstName: "andrew",
      lastName: "shersh",
      sex: 0,
      city: "gomel"
    };
    axios.post("/users", user);
  };
  logout = () => {
    this.setState({ login: false });
  };
  render() {
    const {
      user,
      photos,
      friends,
      getPhotosAction,
      handleLoginAction,
      getFriendsAction
    } = this.props;
    return (
      <div>
        <div>
          {!this.state.login && (
            <GoogleLogin
              clientId="368685883712-akgclk6la1hnqle6tr0khs8hv5fisimm.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogleonSuccess}
              onFailure={this.responseGoogleonFailure}
            />
          )}
          {this.state.login && (
            <GoogleLogout
              clientId="368685883712-akgclk6la1hnqle6tr0khs8hv5fisimm.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.logout}
            />
          )}
          <div>{this.state.title}</div>
          <div>{this.state.text}</div>
          <button onClick={this.postUser}>postUSER</button>
          {/* <pre>
            {
              JSON.stringify(this.props)
            }
          </pre> */}
        </div>

        <div className="app">
          <Photos
            photos={photos.photos}
            year={photos.year}
            isFetching={photos.isFetching}
            getPhotos={getPhotosAction}
          />
          <User
            name={user.name}
            isFetching={user.isFetching}
            error={user.error}
            handleLogin={handleLoginAction}
          />
          _____________________________
          <Friends
            friends={friends.friends}
            isFetching={friends.isFetching}
            getFriends={getFriendsAction}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
