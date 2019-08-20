import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, TextField, Grid, CircularProgress, Button } from '@material-ui/core';
import { MaterialUiPickersDate, DatePicker } from '@material-ui/pickers';
import { iOrder } from '../../store/order/types';
import { State } from '../../store';
import { postOrder, handleChange, getLastTen } from '../../store/newOrder/actions';
import { List } from './../OrderLists/List';
import { iNewOrder } from '../../store/newOrder/types';

interface iProps {
  newOrder: iNewOrder;
  list: iOrder[];
  getLastTen: () => void;
  postOrder: (order: iNewOrder) => void;
  handleChange: (field: keyof iNewOrder, value: string | MaterialUiPickersDate) => void;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
}

class NewOrder extends React.Component<iProps> {
  componentDidMount() {
    this.props.getLastTen();
  }

  onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.postOrder({ ...this.props.newOrder });
  };

  handleChange(field: keyof iNewOrder, value: string | MaterialUiPickersDate) {
    this.props.handleChange(field, value);
  }

  submitButton() {
    return (
      <div>
        <Button type='submit' variant='contained' color='primary' disabled={this.props.isPending}>
          Зарегистрировать
        </Button>
        {this.props.isPending && <CircularProgress size={24} />}
      </div>
    );
  }

  render() {
    const { title, description, dateOrder, dateDeadline, priceOrder } = this.props.newOrder;
    const commonProps = { disabled: this.props.isPending, required: true, fullWidth: true };
    return (
      <div>
        <form onSubmit={this.onSubmitRegister} autoComplete='off'>
          <Card>
            <CardHeader title={title || 'Новый заказ'} action={this.submitButton()} />
            <CardContent>
              <Grid container spacing={3} justify='space-around' alignContent='space-between'>
                <Grid item xs={6}>
                  <TextField
                    {...commonProps}
                    onChange={event => this.handleChange('title', event.currentTarget.value)}
                    value={title}
                    label='Название заказа'
                    type='text'
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    {...commonProps}
                    onChange={event => this.handleChange('priceOrder', event.currentTarget.value)}
                    value={priceOrder}
                    label='Цена'
                    type='number'
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    {...commonProps}
                    onChange={event => this.handleChange('description', event.currentTarget.value)}
                    value={description}
                    label='Описание'
                    type='text'
                    multiline
                  />
                </Grid>
                <Grid item xs={5}>
                  <DatePicker
                    {...commonProps}
                    autoOk
                    variant='inline'
                    label='Принят'
                    format='d MMMM yyyy'
                    value={dateOrder}
                    onChange={date => this.handleChange('dateOrder', date)}
                    maxDate={new Date()}
                    maxDateMessage='Вы из будущего? :)'
                  />
                </Grid>
                <Grid item xs={5}>
                  <DatePicker
                    {...commonProps}
                    autoOk
                    variant='inline'
                    label='Дедлайн'
                    format='d MMMM yyyy'
                    value={dateDeadline}
                    onChange={date => this.handleChange('dateDeadline', date)}
                    minDate={dateOrder || new Date()}
                    minDateMessage='Дедлайн не может быть раньше даты принятия заказа'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
        {/* <div>           Оставить только недавние
          <List list={this.props.list} showedTab='LastTen' isPending={this.props.isPending} />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (store: State) => ({
  newOrder: store.newOrder.newOrder,
  list: store.newOrder.list,
  isPending: store.newOrder.isPending,
  error: store.newOrder.error,
  errorMessage: store.newOrder.errorMessage
});

const mapDispatchToProps = {
  postOrder: postOrder,
  handleChange: handleChange,
  getLastTen: getLastTen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewOrder);
