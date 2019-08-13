import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { iOrder } from "../../store/order/types";
import { setList } from "../../store/orderLists/actions";
import { Tabs, Tab, CircularProgress } from "@material-ui/core";
import { Container } from "@material-ui/core";
import OrderCard from "./OrderCard";
import { updateOrder } from '../../store/orderLists/actions';
import { Tabs as ShowedTab } from "../../store/orderLists/types";

interface iProps {
  listName: ShowedTab;
  list: iOrder[];
  isPending: boolean;
  updateOrder: Function;
  setList: Function;
}

class OrderLists extends React.Component<iProps> {

  componentDidMount() {
    this.props.setList(this.props.listName)
    this.setState({ showedTab: this.props.listName });
  }

  handleChange = (event: React.ChangeEvent<{}>, tab: ShowedTab) => {
    this.props.setList(tab)
    this.setState({ showedTab: tab });
  };

  render() {
    return (
      <Container maxWidth="md">
        <Tabs
          value={this.props.listName}
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
          {this.props.isPending && <CircularProgress style={{ margin: 10 }} size={30} />}
          <List list={this.props.list} showedTab={this.props.listName} updateOrder={this.props.updateOrder} />
        </div>
        <div />
      </Container>
    );
  }
}

export function List(props: { list: iOrder[], showedTab: ShowedTab, updateOrder: Function }) {
  const { list, showedTab, updateOrder } = props;
  return (
    <>
      {list.map((order, index) => (
        <OrderCard key={index} order={order} showedTab={showedTab} updateOrder={updateOrder} />
      ))}
    </>
  )
}

const mapStateToProps = (store: State) => ({
  listName: store.orderLists.listName,
  list: store.orderLists.list,
  isPending: store.orderLists.isPending,
  error: store.orderLists.error,
  errorMessage: store.orderLists.errorMessage,
});

const mapDispatchToProps = {
  updateOrder: updateOrder,
  setList: setList
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderLists);
