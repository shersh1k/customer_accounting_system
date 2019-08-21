import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/order/actions';

interface iProps {
  orderId: string;
}

export function AddExpense(props: iProps) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [cost, setCost] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const handleSubmit = () => {
    setOpen(false);
    dispatch(addExpense({ order: props.orderId, description: description, cost: cost }));
  };

  return (
    <div>
      <Button color='secondary' title='Добавить расход' onClick={() => setOpen(true)}>
        <AttachMoney />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Новый расход:</DialogTitle>
        <DialogContent>
          <TextField
            label='Описание'
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField label='Цена' type='number' value={cost} onChange={e => setCost(+e.target.value)} />
          {/* <TextField name='spendDate' margin='dense' label='Дата' type='date' onChange={e => handleChange('title', e.target.value)}  /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='secondary'>
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
