import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface iProps {
  maxDate: Date;
  handleDateChange?: Function;
}

export function Queuing(props: iProps) {
  const { maxDate, handleDateChange } = props;
  const tomorrow = new Date().setDate(new Date().getDate() + 1);
  const handleChange = (date: MaterialUiPickersDate) => {
    if (handleDateChange) handleDateChange(date, 'dateStartWork');
  };
  return (
    <DatePicker
      autoOk
      variant='inline'
      label='В очередь с'
      format='d MMMM yyyy'
      value={tomorrow}
      minDate={tomorrow}
      maxDate={maxDate}
      onChange={date => handleChange(date)}
      margin='dense'
    />
  );
}
