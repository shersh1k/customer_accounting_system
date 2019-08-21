import React from 'react';
import { CardContent } from '@material-ui/core';
import DateSteps from './DateSteps';
import Description from './Description';
import Expenses from './Expenses';
import Notes from './Notes';
import { useSelector } from 'react-redux';
import { State } from '../../store';

export default function Content() {
  const { editedOrder, isEdit } = useSelector((state: State) => state.order);
  return (
    <CardContent>
      {editedOrder && <DateSteps order={editedOrder} isEdit={isEdit} />}
      <Description />
      <Expenses />
      <Notes />
    </CardContent>
  );
}
