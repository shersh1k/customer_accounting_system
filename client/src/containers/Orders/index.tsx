import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { iOrder } from "../../store/orders/types";
import { getOrdersByDateStartWork, getOrdersByDateDeadline, getLastTenOrders, getNotPayedOrders } from "../../store/orders/actions";
import { Tabs, Tab, CircularProgress } from "@material-ui/core";
import { Container } from "@material-ui/core";
import OrderCard from "./OrderCard";

interface iProps {
  deadlineList: iOrder[];
  startWorkList: iOrder[];
  notPayedList: iOrder[];
  lastTenList: iOrder[];
  allOrdersList: iOrder[];
  isFetching: boolean;
  getOrdersByDateStartWork: Function;
  getOrdersByDateDeadline: Function;
  getLastTenOrders: Function;
  getNotPayedOrders: Function;
}

interface iState {
  showedTab: iShowedTabs;
}

export type iShowedTabs = "DateDeadline" | "DateStartWork" | "LastTen" | "NotPayed"

class Orders extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = { showedTab: "DateDeadline" };
  }

  componentDidMount() {
    this.props.getOrdersByDateDeadline();
  }

  handleChange = (event: React.ChangeEvent<{}>, tab: iShowedTabs) => {
    if (tab === "DateDeadline") {
      this.setState({ showedTab: "DateDeadline" });
      this.props.getOrdersByDateDeadline();
    }
    if (tab === "DateStartWork") {
      this.setState({ showedTab: "DateStartWork" });
      this.props.getOrdersByDateStartWork();
    }
    if (tab === "LastTen") {
      this.setState({ showedTab: "LastTen" });
      this.props.getLastTenOrders();
    }
    if (tab === "NotPayed") {
      this.setState({ showedTab: "NotPayed" });
      this.props.getNotPayedOrders();
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
          <Tab label="Дедлайн" value="DateDeadline" />
          <Tab label="В очереди" value="DateStartWork" />
          <Tab label="Неоплаченные" value="NotPayed" />
          <Tab label="Недавние" value="LastTen" />
        </Tabs>
        <div style={{ overflow: "auto", maxHeight: "calc(100vh - 50px)" }}>
          {this.props.isFetching && <CircularProgress style={{ margin: 10 }} size={30} />}
          {this.state.showedTab === "DateDeadline" && this.props.deadlineList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} />
          ))}
          {this.state.showedTab === "DateStartWork" && this.props.startWorkList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} />
          ))}
          {this.state.showedTab === "NotPayed" && this.props.notPayedList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} />
          ))}
          {this.state.showedTab === "LastTen" && this.props.lastTenList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} />
          ))}
        </div>
        <div />
      </Container>
    );
  }
}

const mapStateToProps = (store: State) => ({
  deadlineList: store.orders.deadlineList,
  startWorkList: store.orders.startWorkList,
  notPayedList: store.orders.notPayedList,
  lastTenList: store.orders.lastTenList,
  isFetching: store.orders.isFetching
});

const mapDispatchToProps = {
  getOrdersByDateStartWork: getOrdersByDateStartWork,
  getOrdersByDateDeadline: getOrdersByDateDeadline,
  getNotPayedOrders: getNotPayedOrders,
  getLastTenOrders: getLastTenOrders,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
