import React from 'react';
import { Card, CardContent, CardHeader, TextField, Grid } from '@material-ui/core';
import newOrderClasses from "../../style/Order.module.scss";
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { API_PostOrder } from '../../helpers/API/Methods';
import { iOrder } from '../../store/orders/types';

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
    constructor(props: iProps) {
        super(props)
        this.state = {
            order: {},
            isFetching: false,
            error: false
        }
    }

    onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            this.setState({ isFetching: true })
            await API_PostOrder({ ...this.state.order })
            this.setState({ order: {}, isFetching: false })
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

    render() {
        let { title, description, dateOrder, dateStarWork, priceOrder, priceMaterials } = this.state.order;
        return (
            <form onSubmit={this.onSubmitRegister} className={newOrderClasses.main}>
                <Card>
                    <CardHeader
                        className={newOrderClasses.header}
                        title={title || "Новый заказ"}
                        action={<Button size="large" type="submit" variant="contained" color="primary">Зарегистрировать</Button>}
                    />
                    <CardContent className={newOrderClasses.content}>
                        <Grid container spacing={3} justify="space-around" alignContent="space-between">
                            <Grid item xs={8} >
                                <TextField
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
                            <Grid item xs={10}>
                                <TextField
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
                                        fullWidth
                                        minDate={dateOrder || new Date()}
                                        minDateMessage="Дата начала работы не может быть меньше даты принятия заказа"
                                        label="Начат"
                                        name="dateStarWork"
                                        format="d MMMM yyyy"
                                        value={dateStarWork}
                                        onChange={(date) => this.handleDateChange(date, "dateStarWork")}
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
                                    type="number"
                                    margin="dense"
                                    value={priceOrder}
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
                                    value={priceMaterials}
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