import React from 'react';
import { Card, CardHeader, CardActions } from '@material-ui/core';
import { MaterialUiPickersDate } from "@material-ui/pickers";
import { iOrder } from '../../../store/orders/types';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { getOrder } from '../../../store/orders/actions';
import { Title } from './Title';
import { Content } from './Content';
import { API_UpdateOrder } from '../../../helpers/API/Methods';

interface iProps {
    edit: boolean;
    slug: string;
    order: iOrder;
    getOrder: (slug: string) => Promise<void>
}

interface iState {
    edit: boolean;
    isFetching: boolean;
    error: boolean;
    errorMessage: string;
    order: iOrder;
}

class Order extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = {
            edit: this.props.edit,
            isFetching: false,
            error: false,
            errorMessage: '',
            order: {}
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true })
        await this.props.getOrder(this.props.slug)
        const order = Object.assign({}, this.props.order)
        this.setState({ order: order, isFetching: false })
    }

    submitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            this.setState({ isFetching: true })
            const updatedOrder = await API_UpdateOrder({ ...this.state.order })
            this.setState({
                order: updatedOrder.data,
                isFetching: false,
                edit: false
            })
        } catch (error) {
            this.setState({
                isFetching: false,
                error: true,
                errorMessage: error,
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
        /* const order: any = this.state.order;
        order[name] = date
        this.setState({ order: order }); */
    }

    toggleEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
        const order = Object.assign({}, this.props.order)
        this.setState({
            edit: this.state.edit ? false : true,
            order: order,
        })
    }

    render() {
        return (
            <Card style={{ width: "90%" }}>
                <CardHeader title={<Title {...{
                    ...this.state,
                    toggleEditMode: this.toggleEditMode,
                    submitButton: this.submitButton,
                    handleInput: this.handleInput
                }}
                />} />
                <Content {...this.state} />
                <CardActions></CardActions>
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