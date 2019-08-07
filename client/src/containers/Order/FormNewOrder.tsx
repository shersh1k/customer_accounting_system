import React from 'react';
import { Card, CardContent, CardHeader, TextField, Grid } from '@material-ui/core';
import newOrderClasses from "../../style/Order.module.scss";
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

interface iProps {
    postOrder: Function;
    isFetching: boolean;
    error: boolean;
}

interface iState {
    _id?: string;
    title?: string;
    slug?: string;
    description?: string;
    priceMaterials?: string;
    priceOrder?: string;
    dateFinishWork?: Date;
    dateOrder?: Date;
    datePay?: Date;
    dateStarWork?: Date;
    recipient?: string;
    createdAt?: Date;
    updatedAt?: Date;
    author?: string;
}

export default class FormNewOrder extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = { title: '', description: '', dateOrder: new Date(), dateStarWork: new Date(), priceOrder: '', priceMaterials: '' }
    }

    onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.postOrder({ ...this.state });
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleDateChange = (date: MaterialUiPickersDate, name: string) => {
        this.setState({ [name]: date });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitRegister} className={newOrderClasses.main} noValidate autoComplete="off">
                <Card>
                    <CardHeader
                        className={newOrderClasses.header}
                        title={this.state.title || "Новый заказ"}
                        action={<Button size="large" type="submit" variant="contained" color="primary">Зарегистрировать</Button>}
                    />
                    <CardContent className={newOrderClasses.content}>
                        <Grid container spacing={3} justify="space-around" alignContent="space-between">
                            <Grid item xs={8} >
                                <TextField
                                    required
                                    fullWidth
                                    value={this.state.title}
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
                                    value={this.state.description}
                                    name="description"
                                    type="text"
                                    label="Описание"
                                    margin="dense"
                                    onChange={this.handleInput}
                                    multiline
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
                                        value={this.state.dateOrder}
                                        onChange={(date) => this.handleDateChange(date, "dateOrder")}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <DatePicker
                                        fullWidth
                                        minDate={this.state.dateOrder || new Date()}
                                        minDateMessage="Дата начала работы не может быть меньше даты принятия заказа"
                                        label="Начат"
                                        name="dateStarWork"
                                        format="d MMMM yyyy"
                                        value={this.state.dateStarWork}
                                        onChange={(date) => this.handleDateChange(date, "dateStarWork")}
                                        margin="dense"
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={5} >
                                <TextField
                                    required
                                    fullWidth
                                    value={this.state.priceOrder}
                                    onChange={this.handleInput}
                                    name="priceOrder"
                                    label="Цена"
                                    type="number"
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={5} >
                                <TextField
                                    required
                                    fullWidth
                                    onChange={this.handleInput}
                                    name="priceMaterials"
                                    type="number"
                                    label="Затраты"
                                    value={this.state.priceMaterials}
                                    margin="dense"
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