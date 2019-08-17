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
}

export function FooterActions(props: iProps) {
  const { showedTab, handleDateChange: handler } = props;
  return (
    <CardActions>
      <AddExpense />
      <AddNote />
      {showedTab === 'DateDeadline' && <Button date='dateFinishWork' text='Выполнено' handler={handler} />}
      {showedTab === 'DateStartWork' && <Button date='dateStartWork' text='Начать' handler={handler} />}
      {showedTab === 'NotPayed' && <Button date='datePay' text='Оплачено' handler={handler} />}
    </CardActions>
  );
}

function Button(props: any) {
  return (
    <MUIButton color='primary' onClick={e => props.handler(new Date(), props.date)}>
      {props.text}
      <Check />
    </MUIButton>
  );
}
