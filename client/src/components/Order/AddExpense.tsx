import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { iExpense } from '../../store/order/types';

interface iProps {
  addExpense: (expense: iExpense) => {};
  orderId: string;
}

export function AddExpense(props: iProps) {
  const [open, setOpen] = React.useState(false);
  const [cost, setCost] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (field: string, value: string) => {
    if (field === 'cost') setCost(+value);
    if (field === 'description') setDescription(value);
  };
  const handleSubmit = () => {
    setOpen(false);
    props.addExpense({ order: props.orderId, description: description, cost: cost });
  };

  return (
    <div>
      <Button color='secondary' title='Добавить расход' onClick={handleClickOpen}>
        <AttachMoney />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Новый расход:</DialogTitle>
        <DialogContent>
          <TextField
            label='Описание'
            type='text'
            value={description}
            onChange={e => handleChange('description', e.target.value)}
          />
          <TextField label='Цена' type='number' value={cost} onChange={e => handleChange('cost', e.target.value)} />
          {/* <TextField name='spendDate' margin='dense' label='Дата' type='date' onChange={e => handleChange('title', e.target.value)}  /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Отмена
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
