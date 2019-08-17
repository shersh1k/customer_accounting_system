import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';
import Done from '@material-ui/icons/Done';
import { iOrder } from '../../store/order/types';
import { MaterialUiPickersDate } from '@material-ui/pickers';

interface iProps {
  editedOrder: iOrder | null;
  isEdit: boolean;
  setEditState: () => void;
  cancelEditState: () => void;
  submitButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate) => void;
}

export function Title(props: iProps) {
  if (!props.editedOrder) return null;
  const { title, priceOrder } = props.editedOrder;
  const { isEdit, setEditState, submitButton, handleChange, cancelEditState } = props;

  if (isEdit)
    return (
      <div>
        <TextField value={title} onChange={e => handleChange('title', e.currentTarget.value)} type='text' />
        <TextField value={priceOrder} onChange={e => handleChange('priceOrder', e.currentTarget.value)} type='number' />
        <Button onClick={cancelEditState} color='secondary'>
          <Cancel />
        </Button>
        <Button onClick={submitButton} color='primary'>
          <Done />
        </Button>
      </div>
    );
  else
    return (
      <div>
        <span style={{ flex: 1 }}>{title}</span>
        <span style={{ color: 'green', flex: 1 }}>${priceOrder}</span>
        <Button onClick={setEditState} color='primary'>
          <Edit />
        </Button>
      </div>
    );
}
