import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import { iOrder, iExpense, iNote } from '../../store/order/types';
import { setList, addExpense, addNote } from '../../store/orderLists/actions';
import { Tabs, Tab } from '@material-ui/core';
import { updateDate } from '../../store/orderLists/actions';
import { Tabs as ShowedTab } from '../../store/orderLists/types';
import { List } from './List';

interface iProps {
  listName: ShowedTab;
  list: iOrder[];
  isPending: boolean;
  updateOrder: Function;
  setList: Function;
  addExpense: (expense: iExpense) => {};
  addNote: (expense: iNote) => {};
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
      <div style={{ flex: 1 }}>
        <Tabs
          value={this.props.listName}
          onChange={this.changeTab}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'>
          <Tab label='Текущие' value='DateDeadline' />
          <Tab label='В очереди' value='DateStartWork' />
          <Tab label='Неоплаченные' value='NotPayed' />
        </Tabs>
        <List list={this.props.list} showedTab={this.props.listName} isPending={this.props.isPending} />
      </div>
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
  updateOrder: updateDate,
  setList: setList,
  addExpense: addExpense,
  addNote: addNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLists);
