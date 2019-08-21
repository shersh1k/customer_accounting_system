import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  CircularProgress,
  Button,
  Typography
} from '@material-ui/core';
import { MaterialUiPickersDate, DatePicker } from '@material-ui/pickers';
import { State } from '../../store';
import { postOrder, handleChange, getLastTen } from '../../store/newOrder/actions';
import { List } from './../OrderLists/List';
import { iNewOrder } from '../../store/newOrder/types';

export default function NewOrder() {
  const dispatch = useDispatch();
  const { newOrder, isPending, list } = useSelector((state: State) => state.newOrder);
  useEffect(() => {
    dispatch(getLastTen());
  }, []);

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postOrder({ ...newOrder }));
  };

  const onChange = (field: keyof iNewOrder, value: string | MaterialUiPickersDate) => {
    dispatch(handleChange(field, value));
  };

  const submitButton = () => {
    return (
      <div>
        <Button type='submit' variant='contained' color='primary' disabled={isPending}>
          Зарегистрировать
        </Button>
        {isPending && <CircularProgress size={24} />}
      </div>
    );
  };

  const { title, description, dateOrder, dateDeadline, priceOrder } = newOrder;
  const commonProps = { disabled: isPending, required: true, fullWidth: true };
  return (
    <div>
      <form onSubmit={onSubmitRegister} autoComplete='off' style={{ marginBottom: '50px' }}>
        <CardHeader title={title || 'Новый заказ'} action={submitButton()} />
        <Grid container spacing={3} justify='space-around' alignContent='space-between'>
          <Grid item xs={6}>
            <TextField
              {...commonProps}
              onChange={event => onChange('title', event.currentTarget.value)}
              value={title}
              label='Название заказа'
              type='text'
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              {...commonProps}
              onChange={event => onChange('priceOrder', event.currentTarget.value)}
              value={priceOrder}
              label='Цена'
              type='number'
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              {...commonProps}
              onChange={event => onChange('description', event.currentTarget.value)}
              value={description}
              label='Описание'
              type='text'
              multiline
            />
          </Grid>
          <Grid item xs={5}>
            <DatePicker
              {...commonProps}
              autoOk
              variant='inline'
              label='Принят'
              format='d MMMM yyyy'
              value={dateOrder}
              onChange={date => onChange('dateOrder', date)}
              maxDate={new Date()}
              maxDateMessage='Вы из будущего? :)'
            />
          </Grid>
          <Grid item xs={5}>
            <DatePicker
              {...commonProps}
              autoOk
              variant='inline'
              label='Дедлайн'
              format='d MMMM yyyy'
              value={dateDeadline}
              onChange={date => onChange('dateDeadline', date)}
              minDate={dateOrder || new Date()}
              minDateMessage='Дедлайн не может быть раньше даты принятия заказа'
            />
          </Grid>
        </Grid>
      </form>
      <Typography align='center' variant='h6'>
        Последние добавленные
      </Typography>
      <List list={list} showedTab='LastTen' isPending={isPending} />
    </div>
  );
}
