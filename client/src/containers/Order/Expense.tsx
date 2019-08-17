import React from 'react';
import { iExpense } from '../../store/order/types';
import { ListItem } from '@material-ui/core';

interface iProps extends iExpense {
  isEdit: boolean;
}

export function Expense(props: iProps) {
  const { description, cost, spendDate, isEdit } = props;
  return (
    <ListItem>
      <span>{description} </span>
      <hr />
      <span>{cost} </span>
      <hr />
      <span>{spendDate ? spendDate.toLocaleDateString() : ''}</span>
    </ListItem>
  );
}
