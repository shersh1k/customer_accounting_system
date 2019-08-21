import React from 'react';
import { Stepper, Step, StepLabel, CardContent } from '@material-ui/core';
import { iOrder } from '../../store/order/types';
import { DatePicker } from '@material-ui/pickers';
import { handleChange } from '../../store/order/actions';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store';

interface iProps {
  order: iOrder,
  isEdit?: boolean
}

export default function DateSteps(props: iProps) {
  const dispatch = useDispatch()
  const { order, isEdit } = props;
  const { isPending, error, errorMessage } = useSelector((state: State) => state.order);
  const activeStep = findActiveStep(order);
  const steps = buildSteps(order);
  return (
    <CardContent>
      <Stepper style={{ padding: 0 }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <span>{label.title}</span>
              <br />
              {isEdit && (
                <DatePicker
                  autoOk
                  variant='inline'
                  format='d MMMM yyyy'
                  value={label.date}
                  onChange={date => dispatch(handleChange(label.name, date))}
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

function findActiveStep(order: iOrder) {
  const { dateStartWork, dateFinishWork, datePay } = order;
  if (datePay) return 3;
  if (dateFinishWork) return 2;
  if (dateStartWork) return 1;
  return 0;
}

interface iStep {
  title: string;
  date?: Date;
  name: keyof iOrder;//'dateOrder' | 'dateStartWork' | 'dateDeadline' | 'dateFinishWork' | 'datePay';
}

function buildSteps(order: iOrder) {
  const { dateOrder, dateStartWork, dateDeadline, dateFinishWork, datePay } = order;
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
