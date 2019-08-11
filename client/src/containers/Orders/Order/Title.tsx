
import React from "react";
import { Button, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { iOrder } from '../../../store/orders/types';
import { Steps } from "./Steps";

interface iProps {
    order: iOrder;
    edit: boolean;
    toggleEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
    submitButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Title(props: iProps) {
    const { title, priceOrder } = props.order;
    const { edit, toggleEditMode, submitButton, handleInput } = props;

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
            <Steps {...props} />
        </div>
    )
}
