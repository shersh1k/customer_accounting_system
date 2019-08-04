import React from 'react';
import API, { HTTP } from '../../helpers/API';

interface iProps {

}

interface iState {
  arr: any[];
}

class Main extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props)
    this.state = {
      arr: []
    }
  }

  componentDidMount() {
    API(HTTP.GET, "api/orders/orders", true).then((res) => {
      console.log(res)
      this.setState({ arr: res.data })
    })
  }

  render() {
    return (
      <div>
        {this.state.arr.map((item, index) => (
          <div key={index}>
            <span style={{ color: "red" }}>{item.title}: </span>
            <span style={{ color: "blue" }}>{item.description} ___</span>
            <span style={{ color: "brown" }}>матриалы = {item.priceMaterials}</span> 
            <span style={{ color: "green" }}>заработок = {item.priceOrder}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default Main
