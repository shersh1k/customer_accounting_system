import React from 'react';
import { Card, CardContent, CardHeader, TextField, Grid, CircularProgress } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { API_PostOrder } from '../../helpers/API/Methods';
import { iOrder } from '../../store/orders/types';
import newOrderClasses from "../../style/Order.module.scss";
import UIClasses from "../../style/UI.module.scss";

interface iProps {
    postedOrder: Function;
    isFetching: boolean;
}

interface iState {
    order: iOrder;
    isFetching: boolean,
    error: boolean,
    errorMessage?: string
}

export default class NewOrder extends React.Component<iProps, iState> {
    cleanOrder: iOrder = {
        title: '',
        description: '',
        dateOrder: new Date(),
        dateDeadline: this.increaseDate(new Date(), 5),
        priceOrder: 0,
        priceMaterials: 0,
    };

    constructor(props: iProps) {
        super(props)
        this.state = {
            order: { ...this.cleanOrder },
            isFetching: false,
            error: false
        }
    }

    onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            this.setState({ isFetching: true })
            await API_PostOrder({ ...this.state.order })
            this.setState({ order: { ...this.cleanOrder }, isFetching: false })
        } catch (error) {
            this.setState({
                isFetching: false,
                error: true,
                errorMessage: error
            })
        }
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        const order: any = this.state.order;
        order[name] = value
        this.setState({ order: order });
    }

    handleDateChange = (date: MaterialUiPickersDate, name: string) => {
        const order: any = this.state.order;
        order[name] = date
        this.setState({ order: order });
    }

    submitButton() {
        return (
            <div className={UIClasses.fetcingWrapper}>
                <Button type="submit" variant="contained" color="primary" disabled={this.state.isFetching}>Зарегистрировать</Button>
                {this.state.isFetching && <CircularProgress size={24} className={UIClasses.fetching} />}
            </div>
        )
    }

    render() {
        let { title, description, dateOrder, dateDeadline, priceOrder } = this.state.order;
        return (
            <form onSubmit={this.onSubmitRegister} className={newOrderClasses.main} autoComplete="off">
                <Card className={newOrderClasses.main}>
                    <CardHeader
                        className={newOrderClasses.header}
                        title={title || "Новый заказ"}
                        action={this.submitButton()}
                    />
                    <CardContent className={newOrderClasses.content}>
                        <Grid container spacing={3} justify="space-around" alignContent="space-between">
                            <Grid item xs={6} >
                                <TextField
                                    disabled={this.state.isFetching}
                                    required
                                    fullWidth
                                    value={title}
                                    name="title"
                                    type="text"
                                    label="Название заказа"
                                    margin="dense"
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <Grid item xs={2} >
                                <TextField
                                    disabled={this.state.isFetching}
                                    fullWidth
                                    name="priceOrder"
                                    label="Цена"
                                    type="number"
                                    margin="dense"
                                    value={priceOrder}
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    disabled={this.state.isFetching}
                                    required
                                    fullWidth
                                    multiline
                                    value={description}
                                    name="description"
                                    label="Описание"
                                    type="text"
                                    margin="dense"
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                <Grid item xs={5} >
                                    <DatePicker
                                        disabled={this.state.isFetching}
                                        required
                                        fullWidth
                                        label="Принят"
                                        name="dateOrder"
                                        format="d MMMM yyyy"
                                        value={dateOrder}
                                        onChange={(date) => this.handleDateChange(date, "dateOrder")}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <DatePicker
                                        disabled={this.state.isFetching}
                                        required
                                        fullWidth
                                        minDate={dateOrder || new Date()}
                                        minDateMessage="Дедлайн не может быть раньше даты принятия заказа"
                                        label="Дедлайн"
                                        name="dateDeadline"
                                        format="d MMMM yyyy"
                                        value={dateDeadline}
                                        onChange={(date) => this.handleDateChange(date, "dateDeadline")}
                                        margin="dense"
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <div>***TODO: КТО заказал (новая сущность recipient)***</div>
                        </Grid>
                    </CardContent >
                </Card >
            </form >
        )
    }

    private increaseDate(date: Date, number: number) {
        return new Date(date.setDate(date.getDate() + number))
    }
}