import React from 'react';
import { API_PostOrder } from '../../helpers/API/Methods';
import { iOrder } from '../../store/orders/types';
import FormNewOrder from './FormNewOrder';

interface iProps { }

interface iState {
    isFetching: boolean,
    error: boolean,
    errorMessage?: string
}

export default class NewOrder extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = {
            isFetching: false,
            error: false
        }
    }

    onSubmitRegister = async (order: iOrder) => {
        try {
            this.setState({ isFetching: true })
            await API_PostOrder({ ...order })
            this.setState({ isFetching: false })
        } catch (error) {
            this.setState({
                isFetching: false,
                error: true,
                errorMessage: error
            })
        }
    }

    render() {
        return (
            <FormNewOrder postOrder={this.onSubmitRegister} isFetching={this.state.isFetching} error={this.state.error} />
        )
    }
}