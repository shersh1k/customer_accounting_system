import React from 'react';
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  ExpansionPanel,
  List
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Expense } from './Expense';
import { AddExpense } from './AddExpense';
import { useSelector } from 'react-redux';
import { State } from '../../store';

export default function Expenses() {
  const { editedOrder, isEdit } = useSelector((state: State) => state.order);
  const { expenses, id } = editedOrder
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
        <AddExpense orderId={id} />
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}
