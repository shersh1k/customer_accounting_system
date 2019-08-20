import React from 'react';
import { iOrder, iExpense, iNote } from '../../../store/order/types';
import { Card, CardHeader } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { Tabs } from '../../../store/orderLists/types';
import { DateSteps } from '../../Order/DateSteps';
import { Title } from './Title';
import { FooterActions } from './FooterActions';

interface iProps {
  order: iOrder;
  showedTab: Tabs | 'LastTen';
  updateOrder?: Function;
  addExpense: (expense: iExpense) => {};
  addNote: (expense: iNote) => {};
}

export function OrderCard(props: iProps) {
  const { order, showedTab, updateOrder, addExpense, addNote } = props;
  const handleDateChange = (date: MaterialUiPickersDate, name: keyof iOrder) => {
    const editedOrder: any = Object.assign({}, order);
    if (name === 'dateFinishWork' && !order.dateStartWork) editedOrder.dateStartWork = editedOrder.dateOrder;
    editedOrder[name] = date;
    if (updateOrder) updateOrder(editedOrder);
  };

  return (
    <Card style={{ margin: '10px 5px' }}>
      <CardHeader title={<Title order={order} showedTab={showedTab} handleDateChange={handleDateChange} />} />
      <DateSteps editedOrder={order} />
      <FooterActions handleDateChange={handleDateChange} showedTab={showedTab} orderId={order.id} addExpense={addExpense} addNote={addNote} />
    </Card>
  );
}
