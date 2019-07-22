import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { simpleAction } from './action-creators/simpleAction';
import './style/App.scss';

interface iProps {
  simpleAction?: any
}
interface iState {
  text: string;
  title: string;
}

const mapStateToProps = (state: any) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({
  simpleAction: () => dispatch(simpleAction())
})

class App extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props)
    this.state = {
      title: '',
      text: ''
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

  render() {
    return (
      <div>
        <div>
          {this.state.title}
        </div>
        <div>
          {this.state.text}
        </div>
        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
