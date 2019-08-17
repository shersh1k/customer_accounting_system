import React from 'react';
import { CardContent } from '@material-ui/core';
import { iOrder, iExpense, iNote } from '../../store/order/types';
import { DateSteps } from './DateSteps';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { Description } from './Description';
import { Expenses } from './Expenses';
import { Notes } from './Notes';

interface iProps {
  editedOrder: iOrder | null;
  isEdit: boolean;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate | iExpense[] | iNote[]) => void;
}

export function Content(props: iProps) {
  if (!props.editedOrder) return null;
  const { editedOrder, isEdit, handleChange } = props;
  return (
    <CardContent>
      <DateSteps editedOrder={editedOrder} isEdit={isEdit} handleChange={handleChange} />
      <Description editedOrder={editedOrder} isEdit={isEdit} handleChange={handleChange} />
      <Expenses isEdit={isEdit} expenses={editedOrder.expenses} handleChange={handleChange} />
      <Notes isEdit={isEdit} notes={editedOrder.notes} handleChange={handleChange} />
    </CardContent>
  );
}
