import React from 'react';
import { iOrder, iExpense, iNote } from '../../../store/order/types';
import { Card, CardHeader } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { Tabs } from '../../../store/orderLists/types';
import DateSteps from '../../Order/DateSteps';
import { Title } from './Title';
import { FooterActions } from './FooterActions';
import { updateDate } from '../../../store/orderLists/actions';
import { useDispatch } from 'react-redux';

interface iProps {
  order: iOrder;
  showedTab: Tabs | 'LastTen';
}

export function OrderCard(props: iProps) {
  const dispatch = useDispatch();
  const { order, showedTab } = props;
  const handleDateChange = (date: MaterialUiPickersDate, name: keyof iOrder) => {
    const editedOrder: any = Object.assign({}, order);
    if (name === 'dateFinishWork' && !order.dateStartWork) editedOrder.dateStartWork = editedOrder.dateOrder;
    editedOrder[name] = date;
    dispatch(updateDate(editedOrder));
  };

  return (
    <Card style={{ margin: '10px 5px' }}>
      <CardHeader title={<Title order={order} showedTab={showedTab} handleDateChange={handleDateChange} />} />
      <DateSteps order={order} />
      <FooterActions handleDateChange={handleDateChange} showedTab={showedTab} orderId={order.id} />
    </Card>
  );
}
