import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import { iOrder } from '../../store/order/types';
import { setList } from '../../store/orderLists/actions';
import { Tabs, Tab } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { updateOrder } from '../../store/orderLists/actions';
import { Tabs as ShowedTab } from '../../store/orderLists/types';
import { List } from './List';

interface iProps {
  listName: ShowedTab;
  list: iOrder[];
  isPending: boolean;
  updateOrder: Function;
  setList: Function;
}

class OrderLists extends React.Component<iProps> {
  componentDidMount() {
    this.props.setList(this.props.listName);
  }

  changeTab = (event: React.ChangeEvent<{}>, tab: ShowedTab) => {
    this.props.setList(tab);
  };

  render() {
    return (
      <Container maxWidth='md'>
        <Tabs
          value={this.props.listName}
          onChange={this.changeTab}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'>
          <Tab label='Дедлайн' value='DateDeadline' />
          <Tab label='В очереди' value='DateStartWork' />
          <Tab label='Неоплаченные' value='NotPayed' />
        </Tabs>
        <List
          list={this.props.list}
          showedTab={this.props.listName}
          updateOrder={this.props.updateOrder}
          isPending={this.props.isPending}
        />
      </Container>
    );
  }
}

const mapStateToProps = (store: State) => ({
  listName: store.orderLists.listName,
  list: store.orderLists.list,
  isPending: store.orderLists.isPending,
  error: store.orderLists.error,
  errorMessage: store.orderLists.errorMessage
});

const mapDispatchToProps = {
  updateOrder: updateOrder,
  setList: setList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLists);
