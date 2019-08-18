import React from 'react';
import { Card, CardHeader, CardActions } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { iOrder, iExpense, iNote } from '../../store/order/types';
import { connect } from 'react-redux';
import { State } from '../../store';
import {
  getOrder,
  updateOrder,
  setEditState,
  handleChange,
  cancelEditState,
  addNote,
  addExpense
} from '../../store/order/actions';
import { Title } from './Title';
import { Content } from './Content';

interface iProps {
  slug: string;
  order: iOrder | null;
  isEdit: boolean;
  editedOrder: iOrder | null;
  getOrder: (slug: string) => Promise<void>;
  updateOrder: (order: iOrder) => Promise<void>;
  setEditState: () => void;
  cancelEditState: () => void;
  handleChange: (field: keyof iOrder, value: string | MaterialUiPickersDate | iExpense[] | iNote[]) => void;
  addNote: (note: iNote) => {};
  addExpense: (expense: iExpense) => {};
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

class Order extends React.Component<iProps> {
  componentDidMount() {
    this.props.getOrder(this.props.slug);
  }

  toggleEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.setEditState();
  };

  submitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.props.editedOrder) this.props.updateOrder({ ...this.props.editedOrder });
  };

  handleChange = (field: keyof iOrder, value: string | MaterialUiPickersDate | iExpense[] | iNote[]) => {
    this.props.handleChange(field, value);
  };

  render() {
    const { editedOrder, isEdit, setEditState, cancelEditState, addNote, addExpense } = this.props;
    return (
      <Card style={{ width: '90%' }}>
        <CardHeader
          title={
            <Title
              editedOrder={editedOrder}
              isEdit={isEdit}
              setEditState={setEditState}
              cancelEditState={cancelEditState}
              handleChange={this.handleChange}
              submitButton={this.submitButton}
            />
          }
        />
        <Content {...{ editedOrder, isEdit, handleChange, addNote, addExpense }} />
        <CardActions />
      </Card>
    );
  }
}

const mapStateToProps = (store: State) => ({
  slug: store.router.location.pathname.split('/')[2],
  order: store.order.order,
  editedOrder: store.order.editedOrder,
  isEdit: store.order.isEdit,
  isPending: store.order.isPending,
  error: store.order.error,
  errorMessage: store.order.errorMessage
});

const mapDispatchToProps = {
  getOrder: getOrder,
  updateOrder: updateOrder,
  setEditState: setEditState,
  cancelEditState: cancelEditState,
  handleChange: handleChange,
  addNote: addNote,
  addExpense: addExpense
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
