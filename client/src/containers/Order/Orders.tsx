import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { iOrder } from "../../store/orders/types";
import { getOrdersByDateStartWork, getOrdersByDateFinishWork, getAllOrders } from "../../store/orders/actions";
import { Card, CardHeader, CardContent, List, ListItem, Tabs, Tab, CircularProgress } from "@material-ui/core";
import { Container } from "@material-ui/core";

interface iProps {
  ordersList: iOrder[];
  isFetching: boolean;
  getOrdersByDateStartWork: Function;
  getOrdersByDateFinishWork: Function;
  getAllOrders: Function;
}

interface iState {
  showedTab: "OrdersByDateStartWork" | "OrdersByDateFinishWork" | "All";
}

class Orders extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = { showedTab: "OrdersByDateStartWork" };
  }

  componentDidMount() {
    this.props.getOrdersByDateStartWork();
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: "OrdersByDateStartWork" | "OrdersByDateFinishWork" | "All"
  ) => {
    if (newValue === "OrdersByDateFinishWork") {
      this.setState({ showedTab: "OrdersByDateFinishWork" });
      this.props.getOrdersByDateFinishWork();
    }
    if (newValue === "OrdersByDateStartWork") {
      this.setState({ showedTab: "OrdersByDateStartWork" });
      this.props.getOrdersByDateStartWork();
    }
    if (newValue === "All") {
      this.setState({ showedTab: "All" });
      this.props.getAllOrders();
    }
  };

  render() {
    return (
      <Container maxWidth="md">
        <Tabs
          value={this.state.showedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="В очереди" value="OrdersByDateStartWork" />
          <Tab label="Подходят к концу срока" value="OrdersByDateFinishWork" />
          <Tab label="ВСЕ" value="All" />
        </Tabs>
        <div style={{ textAlign: "center" }}>
          {this.props.isFetching && <CircularProgress style={{ margin: 10 }} size={30} />}
          {this.props.ordersList.map((item, index) => (
            <Card key={index} style={{}}>
              <CardHeader
                title={
                  <span style={{ color: "darkgreen" }}>
                    {index + 1}. Название: {item.title}
                  </span>
                }
              />
              <CardContent>
                <List>
                  <ListItem>
                    <span style={{ color: "blue" }}>Описание: {item.description}</span>
                  </ListItem>
                  <ListItem>
                    <span style={{ color: "red" }}>Цена материалов: {item.priceMaterials} </span>
                  </ListItem>
                  <ListItem>
                    <span style={{ color: "green" }}>Цена заказа: {item.priceOrder}</span>
                  </ListItem>
                  {(this.state.showedTab === "OrdersByDateStartWork" || this.state.showedTab === "All") && (
                    <ListItem>
                      {item.dateStartWork && (
                        <span style={{ color: "black" }}>
                          Дата начала работы: {new Date(item.dateStartWork).toLocaleString()}
                        </span>
                      )}
                    </ListItem>
                  )}
                  {(this.state.showedTab === "OrdersByDateFinishWork" || this.state.showedTab === "All") && (
                    <ListItem>
                      {item.dateFinishWork && (
                        <span style={{ color: "black" }}>
                          Дата конца работы: {new Date(item.dateFinishWork).toLocaleString()}
                        </span>
                      )}
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          ))}
        </div>
        <div />
      </Container>
    );
  }
}

const mapStateToProps = (store: State) => ({
  ordersList: store.orders.ordersList,
  isFetching: store.orders.isFetching
});

const mapDispatchToProps = {
  getOrdersByDateStartWork: getOrdersByDateStartWork,
  getOrdersByDateFinishWork: getOrdersByDateFinishWork,
  getAllOrders: getAllOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
