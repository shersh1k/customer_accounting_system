import React from 'react';
import { Stepper, Step, StepLabel, CardContent } from '@material-ui/core';
import { iOrder } from '../../store/order/types';
import { MaterialUiPickersDate, DatePicker } from '@material-ui/pickers';

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
  const activeStep = findActiveStep(props.editedOrder);
  const steps = buildSteps(props.editedOrder);
  return (
    <CardContent>
      <Stepper style={{ padding: 0 }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <span>{label.title}</span>
              <br />
              {isEdit && handleChange && (
                <DatePicker
                  autoOk
                  variant='inline'
                  format='d MMMM yyyy'
                  value={label.date}
                  onChange={date => handleChange(label.name, date)}
                />
              )}
              {!isEdit && <span>{label.date && new Date(label.date).toLocaleDateString()}</span>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </CardContent>
  );
}

function findActiveStep(editedOrder: iOrder) {
  const { dateStartWork, dateFinishWork, datePay } = editedOrder;
  if (datePay) return 3;
  if (dateFinishWork) return 2;
  if (dateStartWork) return 1;
  return 0;
}

function buildSteps(editedOrder: iOrder) {
  const { dateOrder, dateStartWork, dateDeadline, dateFinishWork, datePay } = editedOrder;
  return [
    { title: 'Принят', date: dateOrder, name: 'dateOrder' },
    { title: 'В работе', date: dateStartWork, name: 'dateStartWork' },
    {
      title: dateFinishWork ? 'Закончен' : 'Дедлайн',
      date: dateFinishWork || dateDeadline,
      name: dateFinishWork ? 'dateFinishWork' : 'dateDeadline'
    },
    { title: 'Оплачен', date: datePay, name: 'datePay' }
  ] as iStep[];
}
