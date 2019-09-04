import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { DayStyles } from '../../styles/CalendarStyles';
import { Paper, Card, CardHeader, CardContent } from '@material-ui/core';

export default function Day() {
  const { days } = useSelector((state: State) => state.calendar);
  const classes = DayStyles();
  if (!days.length) return null;
  const orders = days[0].orders;
  return (
    <Paper className={classes.day}>
      {orders.map((event, index) => (
        <Card key={index} className={classes.order}>
          <CardHeader title={<span>{event.title}</span>} />
          <CardContent className={classes.content}>
            <span>Цена:{event.priceOrder}</span>
            <span>Старт: {event.dateOrder}</span>
            <span>Дедлайн: {event.dateDeadline}</span>
            <span>Оплата: {event.datePay}</span>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
}
