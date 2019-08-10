import React from 'react';
import { Card, CardContent, CardHeader, CardActions, TextField, Grid, CircularProgress, Stepper, Step, StepLabel, List, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { API_PostOrder } from '../../helpers/API/Methods';
import { iOrder } from '../../store/orders/types';
import { connect } from 'react-redux';
import { State } from '../../store';
import API, { HTTP } from './../../helpers/API/index';
import { getOrder } from '../../store/orders/actions';
import { AxiosResponse } from 'axios';
import Edit from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface iProps {
    edit: boolean;
    slug: string;
    order: iOrder;
    getOrder: (slug: string) => void
}

interface iState {
    edit: boolean;
    order: iOrder;
}

class Order extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = {
            edit: this.props.edit,
            order: {}
        }
    }

    async componentDidMount() {
        this.props.getOrder(this.props.slug)
    }

    onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* try {
            this.setState({ isFetching: true })
            await API_PostOrder({ ...this.state.order })
            this.setState({ order: { ...this.cleanOrder }, isFetching: false })
        } catch (error) {
            this.setState({
                isFetching: false,
                error: true,
                errorMessage: error
            })
        } */
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        /* const { name, value } = event.currentTarget;
        const order: any = this.state.order;
        order[name] = value
        this.setState({ order: order }); */
    }

    handleDateChange = (date: MaterialUiPickersDate, name: string) => {
        /* const order: any = this.state.order;
        order[name] = date
        this.setState({ order: order }); */
    }

    submitButton() {
        /* return (
            <div className={UIClasses.fetcingWrapper}>
                <Button type="submit" variant="contained" color="primary" disabled={this.state.isFetching}>Зарегистрировать</Button>
                {this.state.isFetching && <CircularProgress size={24} className={UIClasses.fetching} />}
            </div>
        ) */
    }

    Title() {
        const { title, priceOrder, dateOrder, dateStartWork, dateDeadline, dateFinishWork, datePay } = this.props.order
        const activeStep = dateStartWork ? dateFinishWork ? datePay ? 3 : 2 : 1 : 0;
        const steps = [
            { title: "Принят", date: dateOrder },
            { title: "Начат", date: dateStartWork },
            { title: dateFinishWork ? "Закончен" : "Дедлайн", date: dateFinishWork || dateDeadline },
            { title: "Оплачен", date: datePay }
        ]
        return (
            <div style={{ display: "flex", flexFlow: "column" }}>
                <div style={{ padding: "10px 0 30px", display: "flex", justifyContent: "space-around" }} >
                    <div style={{ flex: 1 }}>{title}</div>
                    <div style={{ color: "green", flex: 1 }}>${priceOrder}</div>
                    <Button color="primary"><Edit /></Button>
                </div>
                <Stepper style={{ padding: 0 }} activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) =>
                        <Step key={index} >
                            <StepLabel>{label.title} <br /> {label.date && new Date(label.date).toLocaleDateString()}</StepLabel>
                        </Step>
                    )}
                </Stepper>
            </div>
        )
    }

    render() {
        const { description/* , priceMaterials , comments as notes*/ } = this.props.order
        const priceMaterials = [
            { cost: 5, note: 'asdasdasd', createdAt: new Date(2019, 2, 5) },
            { cost: 2, note: 'rgnnrtb', createdAt: new Date(2019, 2, 5) },
            { cost: 4, note: 'thnthnhn', createdAt: new Date(2019, 2, 5) }
        ]
        const notes = [
            { note: 'asdasdasd', createdAt: new Date(2019, 2, 5) },
            { note: 'rgnnrtb', createdAt: new Date(2019, 2, 5) },
            { note: 'thnthnhn', createdAt: new Date(2019, 2, 5) }
        ]
        return (
            <Card style={{ width: "90%" }}>
                <CardHeader title={this.Title()} />
                <CardContent>
                    <Paper style={{ padding: "10px", margin: "10px 0" }}>
                        {description}
                    </Paper>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Расходы</ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                {priceMaterials.map((item, index) => (
                                    <ListItem key={index}>
                                        <span>{item.note} </span>
                                        <hr />
                                        <span>{item.cost} </span>
                                        <hr />
                                        <span>{item.createdAt.toLocaleDateString()}</span>
                                    </ListItem>
                                ))}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Заметки</ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                {notes.map((item, index) => (
                                    <ListItem key={index}>
                                        <span>{item.createdAt.toLocaleDateString()} </span>
                                        <hr />
                                        <span>{item.note} </span>
                                    </ListItem>
                                ))}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (store: State) => ({
    slug: store.router.location.pathname.split('/')[2],
    order: store.orders.currentOrder
});

const mapDispatchToProps = {
    getOrder: getOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)