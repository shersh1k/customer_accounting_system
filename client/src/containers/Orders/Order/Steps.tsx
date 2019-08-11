
import React from "react";
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { iOrder } from '../../../store/orders/types';

interface iProps {
    order: iOrder;
    edit: boolean;
}

export function Steps(props: iProps) {
    const { dateOrder, dateStartWork, dateDeadline, dateFinishWork, datePay } = props.order;
    const { edit } = props;
    const activeStep = dateStartWork ? dateFinishWork ? datePay ? 3 : 2 : 1 : 0;
    const steps = [
        { title: "Принят", date: dateOrder },
        { title: "Начат", date: dateStartWork },
        { title: dateFinishWork ? "Закончен" : "Дедлайн", date: dateFinishWork || dateDeadline },
        { title: "Оплачен", date: datePay }
    ]
    return (
        <Stepper style={{ padding: 0 }} activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) =>
                <Step key={index} >
                    <StepLabel>{label.title} <br /> {label.date && new Date(label.date).toLocaleDateString()}</StepLabel>
                </Step>
            )}
        </Stepper>
    )
}
