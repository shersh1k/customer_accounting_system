import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { iOrder } from "../../store/orders/types";
import { getOrdersByDateStartWork, getOrdersByDateFinishWork, getLastTenOrders, getAllOrders } from "../../store/orders/actions";
import { Tabs, Tab, CircularProgress } from "@material-ui/core";
import { Container } from "@material-ui/core";
import OrderCard from "./OrderCard";

interface iProps {
  ordersList: iOrder[];
  isFetching: boolean;
  getOrdersByDateStartWork: Function;
  getOrdersByDateFinishWork: Function;
  getAllOrders: Function;
  getLastTenOrders: Function;
}

interface iState {
  showedTab: iShowedTabs;
}

type iShowedTabs = "DateFinishWork" | "DateStartWork" | "LastTen" | "All"

class Orders extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = { showedTab: "DateFinishWork" };
  }

  componentDidMount() {
    this.props.getOrdersByDateFinishWork();
  }

  handleChange = (event: React.ChangeEvent<{}>, tab: iShowedTabs) => {
    if (tab === "DateFinishWork") {
      this.setState({ showedTab: "DateFinishWork" });
      this.props.getOrdersByDateFinishWork();
    }
    if (tab === "DateStartWork") {
      this.setState({ showedTab: "DateStartWork" });
      this.props.getOrdersByDateStartWork();
    }
    if (tab === "LastTen") {
      this.setState({ showedTab: "LastTen" });
      this.props.getLastTenOrders();
    }
    if (tab === "All") {
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
          <Tab label="Дедлайн" value="DateFinishWork" />
          <Tab label="В очереди" value="DateStartWork" />
          <Tab label="Недавние" value="LastTen" />
          <Tab label="ВСЕ" value="All" />
        </Tabs>
        <div style={{ overflow: "auto", maxHeight: "calc(100vh - 50px)" }}>
          {this.props.isFetching && <CircularProgress style={{ margin: 10 }} size={30} />}
          {this.props.ordersList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} />
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
  getLastTenOrders: getLastTenOrders,
  getAllOrders: getAllOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
