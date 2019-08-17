import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { iOrder } from '../../store/order/types';
import { MaterialUiPickersDate, KeyboardDatePicker } from '@material-ui/pickers';

interface iProps {
  editedOrder: iOrder;
  isEdit?: boolean;
  handleChange?: (field: keyof iOrder, value: string | MaterialUiPickersDate) => void;
}

interface iStep {
  title: string;
  date?: Date;
  name: 'dateOrder' | 'dateStartWork' | 'dateDeadline' | 'dateFinishWork' | 'datePay';
}

export function DateSteps(props: iProps) {
  const { isEdit, handleChange } = props;
  const { dateOrder, dateStartWork, dateDeadline, dateFinishWork, datePay } = props.editedOrder;
  const activeStep = dateStartWork ? (dateFinishWork ? (datePay ? 3 : 2) : 1) : 0;
  const steps: iStep[] = [
    { title: 'Принят', date: dateOrder, name: 'dateOrder' },
    { title: 'Начат', date: dateStartWork, name: 'dateStartWork' },
    {
      title: dateFinishWork ? 'Закончен' : 'Дедлайн',
      date: dateFinishWork || dateDeadline,
      name: dateFinishWork ? 'dateFinishWork' : 'dateDeadline'
    },
    { title: 'Оплачен', date: datePay, name: 'datePay' }
  ];
  if (isEdit && handleChange)
    return (
      <Stepper style={{ padding: 0 }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              {label.title} <br />
              <KeyboardDatePicker
                autoOk
                variant='inline'
                format='dd.MM.yyyy'
                value={label.date}
                InputAdornmentProps={{ position: 'start' }}
                onChange={date => handleChange(label.name, date)}
                minDate={label.date || new Date()}
                minDateMessage='Дедлайн не может быть раньше даты принятия заказа'
              />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  else
    return (
      <Stepper style={{ padding: 0 }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              {label.title} <br /> {label.date && new Date(label.date).toLocaleDateString()}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
}
