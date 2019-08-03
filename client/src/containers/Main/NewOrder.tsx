import React from 'react';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { postOrder } from '../../helpers/API/Methods';
import newOrderClasses from "../../style/Order.module.scss";
import { Button } from '@material-ui/core';

interface iProps { }
interface iState {
    title?: string;
    description?: string;
}

class NewOrder extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = {
            title: "Новый заказ"
        }
    }

    onSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { title, description } = this.state;
        debugger
        if (title && description)
            postOrder({ title, description })
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    render() {
        let { title } = this.state
        if (!title) title = "Новый заказ"
        return (
            <form onSubmit={this.onSubmitRegister} className={newOrderClasses.main}>
                <Card>
                    <CardHeader
                        className={newOrderClasses.header}
                        title={title}
                        action={<Button size="large" type="submit" variant="contained" color="primary">Зарегистрировать</Button>}
                    />
                    <CardContent className={newOrderClasses.content}>
                        <TextField
                            required
                            name="title"
                            type="text"
                            label="Название заказа"
                            margin="dense"
                            onChange={this.handleInput}
                        />
                        <TextField
                            required
                            name="description"
                            label="Описание"
                            multiline
                            margin="dense"
                            rowsMax="4"
                            onChange={this.handleInput}
                        />
                    </CardContent>
                </Card>
            </form>
        )
    }
}

export default NewOrder
