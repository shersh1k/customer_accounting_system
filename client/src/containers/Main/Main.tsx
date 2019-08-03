import React from 'react';
import { postOrder } from '../../helpers/API/Methods';

interface iProps {

}

class Main extends React.Component<iProps> {
  createOrder = () => {
    postOrder({ "title": "How to train your dragon", "description": "Ever wonder how?" })
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Main
