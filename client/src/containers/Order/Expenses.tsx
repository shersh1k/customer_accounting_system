import React from 'react';
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  ExpansionPanel,
  Button,
  List
} from '@material-ui/core';
import { iExpense, iOrder, iNote } from '../../store/order/types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Expense } from './Expense';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import Add from '@material-ui/icons/Add';
import { AddExpense } from './AddExpense';

interface iProps {
  expenses: iExpense[];
  isEdit: boolean;
  orderId: string;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate | iExpense[] | iNote[]) => void;
  addExpense: (expense: iExpense) => {};
}

export function Expenses(props: iProps) {
  const { isEdit, expenses, handleChange, addExpense, orderId } = props;
  const sum = expenses.reduce((prev, cur) => prev + cur.cost, 0);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <span>Расходы. Всего:{sum}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List>
          {expenses.map((item, index) => (
            <Expense key={item._id || index} {...item} isEdit={isEdit} />
          ))}
        </List>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <AddExpense addExpense={addExpense} orderId={orderId} />
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}
