import React from 'react';
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ExpansionPanel,
  ExpansionPanelActions,
  Button
} from '@material-ui/core';
import { iNote, iOrder, iExpense } from '../../store/order/types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Note } from './Note';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import Add from '@material-ui/icons/Add';
import { AddNote } from './AddNote';

interface iProps {
  notes: iNote[];
  isEdit: boolean;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate | iExpense[] | iNote[]) => void;
  addNote: (note: iNote) => {};
  orderId: string;
}

export function Notes(props: iProps) {
  const { isEdit, notes, handleChange, addNote, orderId } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Заметки</ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List>
          {notes.map((item, index) => (
            <Note key={item._id || index} {...item} isEdit={isEdit} />
          ))}
        </List>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <AddNote addNote={addNote} orderId={orderId} />
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}
