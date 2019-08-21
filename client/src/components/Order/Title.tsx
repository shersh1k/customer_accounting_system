import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';
import Done from '@material-ui/icons/Done';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store';
import { handleChange, cancelEditState, updateOrder, setEditState } from '../../store/order/actions';

export default function Title() {
  const dispatch = useDispatch()
  const { editedOrder, isEdit, isPending, error, errorMessage } = useSelector((state: State) => state.order);
  if (!editedOrder) return null
  const { title, priceOrder } = editedOrder;
  const submitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editedOrder) dispatch(updateOrder({ ...editedOrder }))
  };

  if (isEdit)
    return (
      <div>
        <TextField value={title} onChange={e => dispatch(handleChange('title', e.currentTarget.value))} type='text' />
        <TextField value={priceOrder} onChange={e => dispatch(handleChange('priceOrder', e.currentTarget.value))} type='number' />
        <Button onClick={() => dispatch(cancelEditState())} color='secondary'>
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
        <Button onClick={() => dispatch(setEditState())} color='primary'>
          <Edit />
        </Button>
      </div>
    );
}
