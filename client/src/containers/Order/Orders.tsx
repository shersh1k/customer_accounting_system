import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import { iOrder } from '../../store/orders/types';
import { getOrders } from '../../store/orders/actions';

interface iProps {
  ordersList: iOrder[];
  getOrders: Function;
}

class Orders extends React.Component<iProps> {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    return (
      <div>
        {this.props.ordersList.map((item, index) => (
          <div key={index}>
            <span style={{ color: "red" }}>{item.title}: </span>
            <span style={{ color: "blue" }}>{item.description} </span>
            <span style={{ color: "brown" }}>||| материалы = {item.priceMaterials} </span>
            <span style={{ color: "green" }}>||| заработок = {item.priceOrder}</span>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (store: State) => ({
  ordersList: store.orders.ordersList
});

const mapDispatchToProps = {
  getOrders: getOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
