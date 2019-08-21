import React from 'react';
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ExpansionPanel,
  ExpansionPanelActions,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Note } from './Note';
import { AddNote } from './AddNote';
import { State } from '../../store';
import { useSelector } from 'react-redux';

export default function Notes() {
  const { editedOrder, isEdit } = useSelector((state: State) => state.order);
  const { notes, id } = editedOrder
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
        <AddNote orderId={id} />
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}
