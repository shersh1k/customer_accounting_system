import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Generate } from '../helpers/API/Methods';
import { Autorenew } from '@material-ui/icons';
import { DatePicker, MaterialUiPickersDate } from '@material-ui/pickers';

export interface iGenerateParams {
  fromDate: MaterialUiPickersDate;
  toDate: MaterialUiPickersDate;
  count: number;
}

export function Generator() {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);
  // const [description, setDescription] = React.useState('');
  const [fromDate, setFromDate] = React.useState(new Date(2018, 0, 1) as MaterialUiPickersDate);
  const [toDate, setToDate] = React.useState(new Date(2020, 0, 1) as MaterialUiPickersDate);
  const handleSubmit = () => {
    Generate({ fromDate, toDate, count });
    setOpen(false);
  };

  return (
    <>
      <ListItem button onClick={() => setOpen(true) /* () => Generate() */}>
        <ListItemIcon>
          <Autorenew />
        </ListItemIcon>
        <ListItemText primary='Сгенерировать' />
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Генерация новых записей в БД</DialogTitle>
        <DialogContent>
          {/* <TextField label='Описание' type='text' value={description} onChange={e => setDescription(e.target.value)} /> */}
          <TextField
            label='Количество'
            type='number'
            inputProps={{ min: '0', max: '1000', step: '10' }}
            value={count}
            onChange={e => setCount(+e.target.value)}
          />
          <DatePicker
            autoOk
            variant='inline'
            label='Дата первого заказа:'
            format='d MMMM yyyy'
            value={fromDate}
            onChange={date => setFromDate(date)}
          />
          <DatePicker
            autoOk
            variant='inline'
            label='Генерировать до:'
            format='d MMMM yyyy'
            value={toDate}
            onChange={date => setToDate(date)}
          />
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
    </>
  );
}
