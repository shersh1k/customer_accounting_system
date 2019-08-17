import React from 'react';
import { TextField, Paper } from '@material-ui/core';
import { iOrder } from '../../store/order/types';
import { MaterialUiPickersDate } from '@material-ui/pickers';

interface iProps {
  editedOrder: iOrder;
  isEdit: boolean;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate) => void;
}

export function Description(props: iProps) {
  const { description } = props.editedOrder;
  const { isEdit, handleChange } = props;

  if (isEdit)
    return (
      <Paper style={{ padding: '10px', margin: '10px 0' }}>
        <TextField
          required={true}
          fullWidth={true}
          onChange={event => handleChange('description', event.currentTarget.value)}
          value={description}
          label='Описание'
          type='text'
          multiline
        />
      </Paper>
    );
  else return <Paper style={{ padding: '10px', margin: '10px 0' }}>{description}</Paper>;
}
