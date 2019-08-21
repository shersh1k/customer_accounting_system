import React from 'react';
import { CardActions, Button as MUIButton } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { iOrder } from '../../../store/order/types';
import { Tabs } from '../../../store/orderLists/types';
import { AddExpense } from '../../Order/AddExpense';
import { AddNote } from '../../Order/AddNote';

interface iProps {
  handleDateChange: (date: MaterialUiPickersDate, name: keyof iOrder) => void;
  showedTab: Tabs | 'LastTen';
  orderId: string;
}

export function FooterActions(props: iProps) {
  const { showedTab, handleDateChange: handler, orderId } = props;
  return (
    <CardActions>
      <AddExpense orderId={orderId} />
      <AddNote orderId={orderId} />
      {showedTab === 'DateDeadline' && <Button date='dateFinishWork' text='Выполнено' handler={handler} />}
      {showedTab === 'DateStartWork' && <Button date='dateStartWork' text='Начать' handler={handler} />}
      {showedTab === 'NotPayed' && <Button date='datePay' text='Оплачено' handler={handler} />}
    </CardActions>
  );
}

interface iPropsButton {
  handler: (date: MaterialUiPickersDate, name: keyof iOrder) => void;
  date: keyof iOrder;
  text: string;
}

function Button(props: iPropsButton) {
  const { text, handler, date } = props;
  return (
    <MUIButton color='primary' onClick={e => handler(new Date(), date)}>
      {text}
      <Check />
    </MUIButton>
  );
}
