import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddComment from '@material-ui/icons/AddComment';
import { iNote } from '../../store/order/types';
import { addNote } from '../../store/orderLists/actions';
import { useDispatch } from 'react-redux';

interface iProps {
  orderId: string;
}

export function AddNote(props: iProps) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const handleSubmit = () => {
    setOpen(false);
    dispatch(addNote({ order: props.orderId, body: body, title: title }));
  };

  return (
    <div>
      <Button color='primary' title='Добавить заметку' onClick={() => setOpen(true)}>
        <AddComment />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Новый заметка:</DialogTitle>
        <DialogContent>
          <TextField label='Название' type='text' value={title} onChange={e => setTitle(e.target.value)} />
          <TextField label='Описание' type='text' value={body} onChange={e => setBody(e.target.value)} />
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
