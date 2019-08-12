import React from 'react';
import { Card, CardHeader, CardActions } from '@material-ui/core';
import { MaterialUiPickersDate } from "@material-ui/pickers";
import { iOrder } from '../../../store/order/types';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { getOrder, updateOrder, toggleEditState } from '../../../store/order/actions';
import { Title } from './Title';
import { Content } from './Content';

interface iProps {
    isFetching: boolean;
    error: boolean;
    errorMessage?: string;
    isEdit: boolean;
    currentOrder: iOrder;
    getOrder: (slug: string) => Promise<void>;
    updateOrder: (order: iOrder) => Promise<void>;
    toggleEditState: Function
    slug: string;
}

interface iState {
    order: iOrder;
}

class Order extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = {
            order: {}
        }
    }

    async componentDidMount() {
        await this.props.getOrder(this.props.slug)
        const order = Object.assign({}, this.props.currentOrder)
        this.setState({ order: order })
    }

    submitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.updateOrder({ ...this.state.order });
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

    toggleEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
        const order = Object.assign({}, this.props.currentOrder)
        this.setState({ order: order })
        this.props.toggleEditState(this.props.isEdit);
    }

    render() {
        return (
            <Card style={{ width: "90%" }}>
                <CardHeader title={<Title
                    order={this.state.order}
                    edit={this.props.isEdit}
                    toggleEditMode={this.toggleEditMode}
                    submitButton={this.submitButton}
                    handleInput={this.handleInput}
                    handleDateChange={this.handleDateChange}
                />} />
                <Content {...this.props} />
                <CardActions></CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (store: State) => ({
    slug: store.router.location.pathname.split('/')[2],
    currentOrder: store.order.currentOrder,
    isFetching: store.order.isFetching,
    isEdit: store.order.isEdit,
    error: store.order.error,
    errorMessage: store.order.errorMessage,
});

const mapDispatchToProps = {
    getOrder: getOrder,
    updateOrder: updateOrder,
    toggleEditState: toggleEditState
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)