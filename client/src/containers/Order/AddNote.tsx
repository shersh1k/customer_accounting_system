import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddComment from '@material-ui/icons/AddComment';
import { iNote } from '../../store/order/types';

interface iProps {
  addNote: (note: iNote) => {};
  orderId: string;
}

export function AddNote(props: iProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (field: string, value: string) => {
    if (field == 'title') setTitle(value);
    if (field == 'body') setBody(value);
  };
  const handleSubmit = () => {
    setOpen(false);
    props.addNote({ order: props.orderId, body: body, title: title });
  };

  return (
    <div>
      <Button color='primary' title='Добавить заметку' onClick={handleClickOpen}>
        <AddComment />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Новый заметка:</DialogTitle>
        <DialogContent>
          <TextField label='Название' type='text' value={title} onChange={e => handleChange('title', e.target.value)} />
          <TextField label='Описание' type='text' value={body} onChange={e => handleChange('body', e.target.value)} />
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
