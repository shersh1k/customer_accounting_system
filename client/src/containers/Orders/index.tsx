import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { iOrder } from "../../store/order/types";
import { getOrdersByDateStartWork, getOrdersByDateDeadline, getLastTenOrders, getNotPayedOrders } from "../../store/orderLists/actions";
import { Tabs, Tab, CircularProgress } from "@material-ui/core";
import { Container } from "@material-ui/core";
import OrderCard from "./OrderCard";
import { updateOrder } from '../../store/orderLists/actions';

interface iProps {
  deadlineList: iOrder[];
  startWorkList: iOrder[];
  notPayedList: iOrder[];
  lastTenList: iOrder[];
  isFetching: boolean;
  getOrdersByDateStartWork: Function;
  getOrdersByDateDeadline: Function;
  getLastTenOrders: Function;
  getNotPayedOrders: Function;
  updateOrder: Function;
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
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} updateOrder={this.props.updateOrder} />
          ))}
          {this.state.showedTab === "DateStartWork" && this.props.startWorkList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} updateOrder={this.props.updateOrder} />
          ))}
          {this.state.showedTab === "NotPayed" && this.props.notPayedList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} updateOrder={this.props.updateOrder} />
          ))}
          {this.state.showedTab === "LastTen" && this.props.lastTenList.map((order, index) => (
            <OrderCard key={index} order={order} showedTab={this.state.showedTab} updateOrder={this.props.updateOrder} />
          ))}
        </div>
        <div />
      </Container>
    );
  }
}

const mapStateToProps = (store: State) => ({
  deadlineList: store.orderLists.deadlineList,
  startWorkList: store.orderLists.startWorkList,
  notPayedList: store.orderLists.notPayedList,
  lastTenList: store.orderLists.lastTenList,
  isFetching: store.orderLists.isFetching,
  error: store.orderLists.error,
  errorMessage: store.orderLists.errorMessage
});

const mapDispatchToProps = {
  getOrdersByDateStartWork: getOrdersByDateStartWork,
  getOrdersByDateDeadline: getOrdersByDateDeadline,
  getNotPayedOrders: getNotPayedOrders,
  getLastTenOrders: getLastTenOrders,
  updateOrder: updateOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
