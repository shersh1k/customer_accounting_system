import React from 'react';
import { Card, CardContent, CardHeader, TextField, Grid } from '@material-ui/core';
import { postOrder } from '../../helpers/API/Methods';
import newOrderClasses from "../../style/Order.module.scss";
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

interface iProps { }
interface iState {
    title?: string;
    description?: string;
    dateOrder?: Date,
    dateStarWork?: Date,
    dateFinishWork?: Date,
    datePay?: Date
    priceOrder?: number,
    priceMaterials?: number
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
        if (title && description)
            postOrder({ ...this.state })
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleDateChange = (date: MaterialUiPickersDate, name: string) => {
        this.setState({ [name]: date });
    }

    render() {
        let { title, dateOrder, dateStarWork, dateFinishWork, datePay } = this.state
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
                        <Grid container spacing={3} justify="space-around" alignContent="space-between">
                            <Grid item xs={8} >
                                <TextField
                                    required
                                    fullWidth
                                    name="title"
                                    type="text"
                                    label="Название заказа"
                                    margin="dense"
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    name="description"
                                    label="Описание"
                                    margin="dense"
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                <Grid item xs={5} >
                                    <DatePicker
                                        required
                                        fullWidth
                                        label="Принят"
                                        name="dateOrder"
                                        value={dateOrder}
                                        onChange={(date) => this.handleDateChange(date, "dateOrder")}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <DatePicker
                                        required
                                        fullWidth
                                        label="Оплачен"
                                        name="datePay"
                                        value={datePay}
                                        onChange={(date) => this.handleDateChange(date, "datePay")}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <DatePicker
                                        fullWidth
                                        label="Начат"
                                        name="dateStarWork"
                                        value={dateStarWork}
                                        onChange={(date) => this.handleDateChange(date, "dateStarWork")}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <DatePicker
                                        fullWidth
                                        label="Закончен"
                                        name="dateFinishWork"
                                        value={dateFinishWork}
                                        onChange={(date) => this.handleDateChange(date, "dateFinishWork")}
                                        margin="dense"
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={5} >
                                <TextField
                                    required
                                    fullWidth
                                    name="priceOrder"
                                    label="Цена"
                                    margin="dense"
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <Grid item xs={5} >
                                <TextField
                                    required
                                    fullWidth
                                    name="priceMaterials"
                                    type="number"
                                    label="Затраты"
                                    margin="dense"
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <div>***TODO: КТО заказал (новая сущность recipient)***</div>
                        </Grid>
                    </CardContent >
                </Card >
            </form >
        )
    }
}

export default NewOrder
