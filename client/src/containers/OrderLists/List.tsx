import React from 'react';
import { iOrder, iExpense, iNote } from '../../store/order/types';
import { Tabs } from '../../store/orderLists/types';
import { CircularProgress } from '@material-ui/core';
import { OrderCard } from './OrderCard/index';

interface iProps {
  isPending: boolean;
  list: iOrder[];
  showedTab: Tabs | 'LastTen';
  updateOrder?: Function;
  addExpense: (expense: iExpense) => {};
  addNote: (expense: iNote) => {};
}

export function List(props: iProps) {
  const { list, showedTab, updateOrder, addExpense, addNote } = props;
  return (
    <div style={{ overflow: 'auto' }}>
      {props.isPending && <CircularProgress style={{ margin: 10 }} size={30} />}
      {list.map((order, index) => (
        <OrderCard
          key={index}
          order={order}
          showedTab={showedTab}
          updateOrder={updateOrder}
          addExpense={addExpense}
          addNote={addNote}
        />
      ))}
    </div>
  );
}
