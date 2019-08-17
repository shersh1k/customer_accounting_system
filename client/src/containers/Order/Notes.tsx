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
}

export function Notes(props: iProps) {
  const { isEdit, notes, handleChange } = props;
  const addExpense = (e: React.MouseEvent) => {
    const newNotes: iNote[] = notes.slice();
    newNotes.push({ title: 'string', body: 'asd' });
    handleChange('notes', newNotes);
  };
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
        <AddNote />
        <Button onClick={addExpense} size='small' color='secondary'>
          <Add fontSize='small' />
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}
