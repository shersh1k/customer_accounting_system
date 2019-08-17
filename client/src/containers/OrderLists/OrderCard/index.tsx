import React from 'react';
import { iOrder } from '../../../store/order/types';
import { Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core';
import AddComment from '@material-ui/icons/AddComment';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Check from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { Tabs } from '../../../store/orderLists/types';
import { DateSteps } from '../../Order/DateSteps';

interface iProps {
  order: iOrder;
  showedTab: Tabs;
  updateOrder?: Function;
}

interface iState {}

export default class OrderCard extends React.Component<iProps, iState> {
  handleDateChange = (date: MaterialUiPickersDate, name: string) => {
    const order: any = Object.assign({}, this.props.order);
    order[name] = date;
    if (this.props.updateOrder) this.props.updateOrder(order);
  };

  Title() {
    const { order, showedTab } = this.props;
    const { dateStartWork, dateOrder, dateDeadline } = this.props.order;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={`/orders/${this.props.order.slug}`}>{order.title}</Link>
        {showedTab === 'DateDeadline' && (
          <>
            {!dateStartWork && (
              <div>
                Поставить в очередь с{' '}
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <KeyboardDatePicker
                    required
                    fullWidth
                    variant='inline'
                    label='Принят'
                    name='dateStartWork'
                    format='dd.MM.yyyy'
                    value={dateStartWork}
                    minDate={dateOrder}
                    maxDate={dateDeadline}
                    onChange={date => this.handleDateChange(date, 'dateStartWork')}
                    margin='dense'
                  />
                </MuiPickersUtilsProvider>
              </div>
            )}
            <div style={{ color: 'red', fontSize: 20 }}>
              Осталось {this.countDaysToDeadLine(order.dateDeadline)} дней
            </div>
          </>
        )}
        {showedTab === 'DateStartWork' && (
          <div style={{ color: 'green' }}>В плане через {this.countDaysToDeadLine(order.dateStartWork)} дней</div>
        )}
      </div>
    );
  }

  countDaysToDeadLine(deadline?: Date) {
    if (!deadline) return;
    deadline = new Date(deadline);
    let today = new Date();
    let dif = deadline.getTime() - today.getTime();
    return Math.floor(dif / (1000 * 60 * 60 * 24));
  }

  render() {
    const { order } = this.props;
    return (
      <Card style={{ margin: '10px 5px' }}>
        <CardHeader title={this.Title()} />
        <CardContent>
          <DateSteps editedOrder={order} />
        </CardContent>
        <CardActions>
          <Button title='Добавить заметку'>
            <AddComment />
          </Button>
          <Button color='secondary' title='Добавить расход'>
            <AttachMoney />
          </Button>
          <Button color='primary'>
            Выполнено
            <Check />
          </Button>
        </CardActions>
      </Card>
    );
  }
}
