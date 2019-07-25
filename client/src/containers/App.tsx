import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from 'react-google-login';
import { User } from '../components/User'
import { Page } from '../components/Page'
import { getPhotos } from '../actions/PageActions'
import { handleLogin } from '../actions/UserActions'
import axios from 'axios';
import { IUser } from '../../../server/interfaces/IUser';
// import app from '../style/App.module.scss';

interface iProps {
  simpleAction?: any
  user?: any,
  page?: any,
  getPhotosAction?: any,
  handleLoginAction?: any
}
interface iState {
  text: string;
  title: string;
  login: boolean;
}

const mapStateToProps = (store: any) => {
  return {
    user: store.user, // вытащили из стора (из редьюсера user все в переменную thid.props.user)
    page: store.page,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPhotosAction: (year: number) => dispatch(getPhotos(year)),
    // "приклеили" в this.props.handleLoginAction функцию, которая умеет диспатчить handleLogin
    handleLoginAction: () => dispatch(handleLogin()),
  }
}

class App extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props)
    this.state = {
      title: '',
      text: '',
      login: false
    }
  }

  async componentDidMount() {
    let data = await axios.get('/notes/5c37c32601bc411280c0c778');
    console.log(data)
    this.setState({
      title: data.data.title,
      text: data.data.text
    })
  }

  simpleAction = (event: any) => {
    this.props.simpleAction();
    console.log(this.props)
  }

  responseGoogleonSuccess = (response: any) => {
    this.setState({ login: true })
    console.log(response);
  }
  responseGoogleonFailure = (response: any) => {
    console.log(response);
  }
  postUser = () => {
    let user: IUser = {
      birthDate: new Date(),
      registrationDate: new Date(),
      firstName: 'andrew',
      lastName: 'shersh',
      sex: 0,
      city: 'gomel'
    }
    axios.post('/users', user)
  }
  logout = () => {
    this.setState({ login: false })
  }
  render() {
    const { user, page, getPhotosAction, handleLoginAction } = this.props
    return (
      <div>
        <div>
          {!this.state.login && <GoogleLogin
            clientId="368685883712-akgclk6la1hnqle6tr0khs8hv5fisimm.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogleonSuccess}
            onFailure={this.responseGoogleonFailure}
          />}
          {this.state.login && <GoogleLogout
            clientId="368685883712-akgclk6la1hnqle6tr0khs8hv5fisimm.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          >
          </GoogleLogout>

          }
          <div>
            {this.state.title}
          </div>
          <div>
            {this.state.text}
          </div>
          <button onClick={this.simpleAction}>Test redux action</button>
          <button onClick={this.postUser}>postUSER</button>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
        </div>

        <div className="app">
          <Page
            photos={page.photos}
            year={page.year}
            isFetching={page.isFetching}
            getPhotos={getPhotosAction}
          />
          {/* добавили новые props для User */}
          <User
            name={user.name}
            isFetching={user.isFetching}
            error={user.error}
            handleLogin={handleLoginAction}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
