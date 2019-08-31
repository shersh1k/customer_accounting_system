import React from 'react';
import { TextField, Paper } from '@material-ui/core';
import { handleChange } from '../../store/order/actions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';

export default function Description() {
  const dispatch = useDispatch();
  const { editedOrder, isEdit/* , isPending, error, errorMessage */ } = useSelector((state: State) => state.order);
  if (!editedOrder) return null;
  if (isEdit)
    return (
      <Paper style={{ padding: '10px', margin: '10px 0' }}>
        <TextField
          required={true}
          fullWidth={true}
          onChange={event => dispatch(handleChange('description', event.currentTarget.value))}
          value={editedOrder.description}
          label='Описание'
          type='text'
          multiline
        />
      </Paper>
    );
  else return <Paper style={{ padding: '10px', margin: '10px 0' }}>{editedOrder.description}</Paper>;
}
