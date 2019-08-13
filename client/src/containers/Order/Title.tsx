
import React from "react";
import { Button, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { iOrder } from '../../store/order/types';
import { Steps } from "./Steps";
import { MaterialUiPickersDate } from '@material-ui/pickers';

interface iProps {
    order: iOrder;
    edit: boolean;
    toggleEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
    submitButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (date: MaterialUiPickersDate, name: string) => void;
}

export function Title(props: iProps) {
    const { title, priceOrder } = props.order;
    const { edit, toggleEditMode, submitButton, handleInput, handleDateChange } = props;

    return (
        <div style={{ display: "flex", flexFlow: "column" }}>
            {!edit && <div style={{ padding: "10px 0 30px", display: "flex", justifyContent: "space-around" }} >
                <div style={{ flex: 1 }}>{title}</div>
                <div style={{ color: "green", flex: 1 }}>${priceOrder}</div>
                <Button onClick={toggleEditMode} color="primary"><Edit /></Button>
            </div>}
            {edit && <div style={{ padding: "10px 0 30px", display: "flex", justifyContent: "space-around" }} >
                <TextField value={title} name="title" onChange={handleInput} fullWidth />
                <TextField value={priceOrder} name="priceOrder" onChange={handleInput} fullWidth type="number" />
                <Button onClick={toggleEditMode} color="primary">Отменить</Button>
                <Button onClick={submitButton} color="primary">Сохранить</Button>
            </div>}
            <Steps
                currentOrder={props.order}
                edit={props.edit}
                handleDateChange={handleDateChange}
            />
        </div>
    )
}
