import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import { iOrder } from '../../store/orders/types';
import { getOrdersByDateStartWork, getOrdersByDateFinishWork } from '../../store/orders/actions';
import { Card, CardHeader, CardContent, List, ListItem, Tabs, Tab } from '@material-ui/core';
import { Container } from '@material-ui/core';

interface iProps {
  ordersList: iOrder[];
  getOrdersByDateStartWork: Function;
  getOrdersByDateFinishWork: Function;
}

interface iState {
  showedTab: "OrdersByDateStartWork" | "OrdersByDateFinishWork";
}

class Orders extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = { showedTab: "OrdersByDateStartWork" }
  }

  componentDidMount() {
    if (this.state.showedTab === "OrdersByDateStartWork")
      this.props.getOrdersByDateStartWork()
    else if (this.state.showedTab === "OrdersByDateFinishWork")
      this.props.getOrdersByDateFinishWork()
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: "OrdersByDateStartWork" | "OrdersByDateFinishWork") => {
    if (newValue === "OrdersByDateFinishWork") {
      this.setState({ showedTab: "OrdersByDateFinishWork" })
      this.props.getOrdersByDateFinishWork()
    }
    if (newValue === "OrdersByDateStartWork") {
      this.setState({ showedTab: "OrdersByDateStartWork" })
      this.props.getOrdersByDateStartWork()
    }
  }

  render() {
    return (
      <Container maxWidth="sm" >
        <Tabs
          value={this.state.showedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Начало работы" value="OrdersByDateStartWork" />
          <Tab label="Конец работы" value="OrdersByDateFinishWork" />
        </Tabs>
        <div>
          {this.props.ordersList.map((item, index) => (
            <Card key={index}>
              <CardHeader
                title={
                  <span style={{ color: "red" }}>Название: {item.title}</span>
                }
              />
              <CardContent>
                <List>
                  <ListItem>
                    <span style={{ color: "blue" }}>Описание{item.description}</span>
                  </ListItem>
                  <ListItem>
                    <span style={{ color: "brown" }}>Цена материалов{item.priceMaterials} </span>
                  </ListItem>
                  <ListItem>
                    <span style={{ color: "green" }}>Цена заказа{item.priceOrder}</span>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (store: State) => ({
  ordersList: store.orders.ordersList
});

const mapDispatchToProps = {
  getOrdersByDateStartWork: getOrdersByDateStartWork,
  getOrdersByDateFinishWork: getOrdersByDateFinishWork
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
