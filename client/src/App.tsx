import React from 'react';
import axios from 'axios';
import './App.css';

interface iProps { }
interface iState {
  text: string;
  title: string;
}

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

  render() {
    return (
      <div>
        <div>
          {this.state.title}
        </div>
        <div>
          {this.state.text}
        </div>
      </div>
    );
  }
}

export default App;
