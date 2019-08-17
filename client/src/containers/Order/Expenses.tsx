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

interface iProps {
  expenses: iExpense[];
  isEdit: boolean;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate | iExpense[] | iNote[]) => void;
}

export function Expenses(props: iProps) {
  const { isEdit, expenses, handleChange } = props;
  const addExpense = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpenses: iExpense[] = expenses.slice();
    newExpenses.push({ description: 'string', cost: 5, spendDate: new Date() });
    handleChange('expenses', newExpenses);
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <span>Расходы. Всего:{expenses.reduce((prev, cur) => prev + cur.cost, 0)}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List>
          {expenses.map((item, index) => (
            <Expense key={item._id || index} {...item} isEdit={isEdit} />
          ))}
        </List>
      </ExpansionPanelDetails>
      {isEdit && (
        <ExpansionPanelActions>
          <Button onClick={e => addExpense(e)} size='small' color='secondary'>
            <Add fontSize='small' />
          </Button>
        </ExpansionPanelActions>
      )}
    </ExpansionPanel>
  );
}
